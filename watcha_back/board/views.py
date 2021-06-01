import os
import json
import bcrypt
import re
import datetime

from django.views  import View
from users.models  import User
from review.models import Review
from users.utils   import login_check
from .models       import Board , BoardImg
from django.http   import JsonResponse
from users.utils   import login_check

class BoardView(View):
    @login_check
    def post(self , request):
        data = json.loads(request.body)
        print("data :",data)
        user_email = User.objects.get(id=request.user.id).email
        user_email = user_email[:user_email.index('@')]

        try:
            Board(
                title   = data['title'],
                content = data['content'],
                email   = user_email,
                user_id = request.user.id
            ).save()

            return JsonResponse({"message" : "SUCCESS_POST"} , status = 200)
        except TypeError:
            return JsonResponse({"message":"INVALID_TYPE"},status = 400)

        except ValueError:
            return JsonResponse({"message":"VALUE_ERROR"},status = 400)

        except Exception as e:
            return JsonResponse({"message":e},status = 400)
    @login_check
    def put(self,request):
        data = json.loads(request.body)

        try:
            board = Board.objects.get(id      = data['id'] ,
                                      user_id = request.user.id)

            board.title   = data['title'],
            board.content = data['content']
            board.save()

            return JsonResponse({"message" : "SUCCESS_PUT"} , status = 200)
        except TypeError:
            return JsonResponse({"message":"INVALID_TYPE"},status = 400)

        except ValueError:
            return JsonResponse({"message":"VALUE_ERROR"},status = 400)

        except Exception as e:
            return JsonResponse({"message":e},status = 400)

    def get(self , request):
#        data = json.loads(request.body)
        try:
            boards = (Board.
                     objects.
                     all().values())

            return JsonResponse({"data" : list(boards)} , status = 200)

        except Exception as e:
            return JsonResponse({"message":e},status = 400)

    @login_check
    def delete(self, request):
        data  = json.loads(request.body)
        try:
            board = Board.objects.get(user_id = request.user.id ,
                                      id      = data['id'])
            board.delete()
            return JsonResponse({"message" : "SUCCESS_DELETE"} , status = 200)

        except TypeError:
            return JsonResponse({"message":"INVALID_TYPE"},status = 400)

        except ValueError:
            return JsonResponse({"message":"VALUE_ERROR"},status = 400)

        except Exception as e:
            return JsonResponse({"message":e},status = 400)

class DetailBoardView(View):
    def get(self, request ,board_id):
        try:
            board = Board.objects.prefetch_related("review_set").get(id=board_id)

            board_data = {
                'id'      : board.id,
                'title'   : board.title,
                'content' : board.content,
                'email'   : board.email,
                'reviews' : list(board.review_set.all().values())
            }

            return JsonResponse({ "data" : board_data },status = 200)

        except TypeError:
            return JsonResponse({"message":"INVALID_TYPE"},status = 400)

        except ValueError:
            return JsonResponse({"message":"VALUE_ERROR"},status = 400)

        except Exception as e:
            return JsonResponse({"message":e},status = 400)