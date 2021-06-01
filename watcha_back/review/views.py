import os
import json
import bcrypt
import re
import datetime

from django.views  import View
from .models       import Review
from users.models  import User
from review.models import Review

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
            Review(
                content  = data['content'],
                email    = User.objects.get(id = request.user.id).email.split('@')[0],
                board_id = Board.objects.get(id=data['board_id'],user_id=data['user_id']).id,
                user_id  = request.user.id,
            ).save()
            return JsonResponse({"message":"SUCCESS"},status = 200)
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
            review = Review.objects.get(id      = data["id"],
                                        user_id = request.user.id)
            review.delete()
            return JsonResponse({"message":"DELETE_SUCCESS"}, status = 200)

        except Review.DoesNotExist:
            return JsonResponse({"message":"DOESNOT_REVIEW"},status = 400)
        except TypeError:
            return JsonResponse({"message":"INVALID_TYPE"},status = 400)
        except ValueError:
            return JsonResponse({"message":"VALUE_ERROR"},status = 400)
        except Exception as e:
            return JsonResponse({"message":e},status = 400)
