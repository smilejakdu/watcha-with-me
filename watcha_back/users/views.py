import os
import json
import re
import jwt
import users.utils
import requests

from django.views            import View
from users.models            import User
from django.http             import JsonResponse
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
