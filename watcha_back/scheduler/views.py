import os
import json
import bcrypt
import re

from django.views import View
from users.models import User
from users.utils import login_check
from .models import Scheduler
from django.http import JsonResponse
from users.utils import login_check
from collections import deque
import datetime


class SchedulerView(View):
    @login_check
    def post(self , request):
        data     = json.loads(request.body)
        nickname = User.objects.get(id=request.user.id).nickname

        try:
            Scheduler(
                genre       = data['genre'],
                movie_title = data['movie_title'],
                date        = data['date'],
                user_id     = User.objects.get(id = request.user.id).id
            ).save()

            return JsonResponse({"message":"SUCCESS"},status = 200)

        except TypeError:
            return JsonResponse({"message":"INVALID_TYPE"},status = 400)
        except ValueError:
            return JsonResponse({"message":"VALUE_ERROR"},status = 400)
        except Exception as e:
            return JsonResponse({"message":e},status = 400)

    def get(self , request):
        schedulers = (Scheduler.
                     objects.
                     all().values())

        scheduler_data = [{
            "id"          : scheduler['id'],
            "genre"       : scheduler['genre'],
            "movie_title" : scheduler['movie_title'],
            "date"        : scheduler['date'],
            "nickname"    : User.objects.get(id=scheduler['user_id']).nickname
        }for scheduler in schedulers]

        return JsonResponse({"data" : list(scheduler_data)} , status = 200)

    @login_check
    def put(self , request):
        data      = json.loads(request.body)
        scheduler = Scheduler.objects.get(user_id = request.user.id ,
                                          id      = data["id"])

        try:
            scheduler.genre       = data["genre"]
            scheduler.movie_title = data["movie_title"]
            scheduler.date        = data["date"]
            scheduler.save()

            return JsonResponse({"message": "UPDATE_SUCCESS"},status = 200)

        except KeyError:
            return JsonResponse({"message": "KEY_ERROR"},status = 400)
        except ValueError:
            return JsonResponse({"message": "KEY_ERROR"}, status = 400)
        except Exception as e:
            return JsonResponse({"message": e},status = 400)

    @login_check
    def delete(self , request):
        data      = json.loads(request.body)
        try:

            scheduler = Scheduler.objects.get(user_id = request.user.id ,
                                              id      = data["id"])
            scheduler.delete()
            return JsonResponse({"message": "DELETE_SUCCESS"},status = 200)
        except KeyError:
            return JsonResponse({"message": "KEY_ERROR"},status = 400)
        except ValueError:
            return JsonResponse({"message": "KEY_ERROR"}, status = 400)
        except Exception as e:
            return JsonResponse({"message": e},status = 400)
        return

