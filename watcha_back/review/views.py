import os
import json
import bcrypt
import re
import datetime

from django.views import View
from .models      import Review
from users.models import User
from board.models import Board

from users.utils import login_check
from django.http import JsonResponse
from users.utils import login_check


class ReviewView(View):
    @login_check
    def post(self, request):
        data = json.loads(request.body)

        if len(data['content']) == 0:
            return JsonResponse({"message":"DOESNOT_CONTENT"}, status = 400)
        try:
            review = Review.objects.create(
                content  = data['content'],
                nickname = User.objects.get(id = request.user.id).nickname,
                board_id = Board.objects.get(id = data['board_id']).id,
                user_id  = request.user.id,
            )

            review = Review.objects.filter(id = review.id).values()

            return JsonResponse({"message":"SUCCESS" , "data":list(review)},status = 200)
        except TypeError:
            return JsonResponse({"message":"INVALID_TYPE"},status = 400)
        except ValueError:
            return JsonResponse({"message":"VALUE_ERROR"},status = 400)
        except Exception as e:
            return JsonResponse({"message":e},status = 400)

    @login_check
    def put(self, request):
        data = json.loads(request.body)

        if len(data['content']) == 0:
            return JsonResponse({"message":"DOESNOT_CONTENT"}, status = 400)

        try:
            review = Review.objects.get(id      = data["id"],
                                        user_id = request.user.id)

            review.content = data['content']
            review.save()
            return JsonResponse({"message":"PUT_SUCCESS"}, status = 200)

        except Review.DoesNotExist:
            return JsonResponse({"message":"DOESNOT_REVIEW"},status = 400)
        except TypeError:
            return JsonResponse({"message":"INVALID_TYPE"},status = 400)
        except ValueError:
            return JsonResponse({"message":"VALUE_ERROR"},status = 400)
        except Exception as e:
            return JsonResponse({"message":e},status = 400)

    def get(self, request):
        data   = json.loads(request.body)
        review = list(Review.objects.filter(board_id = data['board_id']).values())

        return JsonResponse({"message":review} , status = 200)

    @login_check
    def delete(self, request):
        data = json.loads(request.body)
        try:
            review    = Review.objects.get(id      = data["id"],
                                        user_id = request.user.id)
            review_id = review.id
            review.delete()
            return JsonResponse({"message":"DELETE_SUCCESS" , "data":review_id}, status = 200)

        except Review.DoesNotExist:
            return JsonResponse({"message":"DOESNOT_REVIEW"},status = 400)
        except TypeError:
            return JsonResponse({"message":"INVALID_TYPE"},status = 400)
        except ValueError:
            return JsonResponse({"message":"VALUE_ERROR"},status = 400)
        except Exception as e:
            return JsonResponse({"message":e},status = 400)
