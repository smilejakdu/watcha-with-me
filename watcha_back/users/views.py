import os
import json
import re
import jwt
import bcrypt
import users.utils
import requests

from django.views            import View
from users.models            import User
from django.http             import JsonResponse , HttpResponse
from watcha_back.my_settings import SECRET
from django.core.validators  import validate_email
from django.core.exceptions  import ValidationError

class KakaoSignInView(View):
    def post(self, request):
        data  = json.loads(request.body)
        email = data.get('email', None)

        try:
            validate_email(email)

            if not User.objects.filter(email = email).exists():
                User.objects.create(
                    email = email
                )

            user      = User.objects.get(email = email)
            key       = SECRET.get('secret')
            algorithm = SECRET.get('algorithm')
            token     = jwt.encode({'user' : user.id},key, algorithm = algorithm).decode('UTF-8')


            return JsonResponse(
                {"token": token, "message": "SIGNIN_SUCCESS", "email" : user.email}, status=200
            )

        except KeyError:
            return JsonResponse({"message": "KEY_ERROR"}, status=400)
        except ValidationError:
            return JsonResponse({"message": "VALIDATE_ERROR"}, status=400)
        except ValueError:
            return JsonResponse({"message": "VALUE_ERROR"}, status=400)

class SignUpView(View):
    def post(self , request):
        data = json.loads(request.body)
        print(data)

        try:
            for d in data:
                if not data[d]:
                    return JsonResponse({"message":f"doesnot_{d}"} , status = 400)
            # 특수 문자 회원가입 금지 , 띄어쓰기 있는거 금지 


            if User.objects.filter(nickname = data['nickname']).exists():
                return JsonResponse({"message" : "EXISTS_NICKNAME"} , status = 400)

            if len(data['nickname']) == 0:
                return JsonResponse({"message":"DOESNOT_NICKNAME"} , status = 400)

            if len(data['password']) < 5:
                return JsonResponse({"message":"SHORT_PASSWORD"} , status = 400)

            User(
                nickname = data['nickname'],
                password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            ).save()

            return JsonResponse({"message" : "SUCCESS_SIGNUP"},status = 200)

        except KeyError:
            return JsonResponse({"message" : "INVALID_KEY"},status = 400)

        except Exception as e:
            return JsonResponse({"message" : e},status = 400)

class SignInView(View):
    def post(self, request):
        data = json.loads(request.body)

        try:

            if User.objects.filter(nickname=data['nickname']).exists():
                user = User.objects.get(nickname=data['nickname'])

                if bcrypt.checkpw(data['password'].encode('utf-8'),
                                  user.password.encode('utf-8')):

                    token = jwt.encode({'nickname': data['nickname']},
                                           SECRET['secret'],
                                           algorithm = SECRET['algorithm']).decode()

                    return JsonResponse({'access': token , 'user':user.nickname}, status=200, content_type="application/json")

                return HttpResponse(status=401)

            return HttpResponse(status=400)

        except KeyError:
            return JsonResponse({"message": "INVALID_KEYS"}, status=400)

        except ValidationError:
            return JsonResponse({"message" : "validation_error"} , status = 400)

        except User.DoesNotExist:
            return JsonResponse({"message": "INVALID_USER"}, status=400)

        except Exception as e:
            return JsonResponse({"message" : e} , status = 400)

# front => token => header 요청
class TokenCheckView(View):
    def get(self , request):
        auth_token   = request.headers.get('Authorization', None)
        payload      = jwt.decode(auth_token,
                                  SECRET['secret'],
                                  algorithms = ALGORITHM)

        user         = User.objects.get(id = payload["id"])

        return JsonResponse({"data" : f"{user.nickname}" } , status = 200)

