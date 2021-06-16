import os
import json
import bcrypt
import re

from datetime     import datetime
from django.views import View
from users.models import User
from users.utils  import login_check
from .models      import Scheduler
from django.http  import JsonResponse
from users.utils  import login_check
from collections  import deque


class SchedulerView(View):
    @login_check
    def post(self , request):
        data     = json.loads(request.body)
        nickname = User.objects.get(id=request.user.id).nickname

        try:
            scheduler = Scheduler.objects.create(
                genre   = data['genre'],
                title   = data['title'],
                date    = data['date'],
                user_id = User.objects.get(id = request.user.id).id 
            )

            scheduler = Scheduler.objects.filter(id = scheduler.id).values()

            return JsonResponse({"message":"SUCCESS",
                                 "data" : list(scheduler)},status = 200)

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
            "id"        : scheduler['id'],
            "genre"     : scheduler['genre'],
            "title"     : scheduler['title'],
            "date"      : scheduler['date'],
            "nickname"  : User.objects.get(id=scheduler['user_id']).nickname
        }for scheduler in schedulers]

        return JsonResponse({"data"      : list(scheduler_data) ,
                             "year"      : datetime.now().year ,
                             "thismonth" : datetime.now().month } , status = 200)

    @login_check
    def put(self , request):
        data      = json.loads(request.body)
        scheduler = Scheduler.objects.get(user_id = request.user.id ,
                                          id      = data["id"])

        try:
            scheduler.genre = data["genre"]
            scheduler.title = data["title"]
            scheduler.date  = data["date"]
            scheduler.save()

            data = {
                "id"    : data["id"],
                "genre" : data["genre"],
                "title" : data["title"],
                "date"  : data["date"],
            }

            return JsonResponse({"message": "UPDATE_SUCCESS",
                                 "data"   : data},status = 200)

        except KeyError:
            return JsonResponse({"message": "KEY_ERROR"},status = 400)
        except ValueError:
            return JsonResponse({"message": "KEY_ERROR"}, status = 400)
        except Exception as e:
            return JsonResponse({"message": e},status = 400)

    @login_check
    def delete(self , request):
        data   = json.loads(request.body)

        try:

            scheduler    = Scheduler.objects.get(user_id = request.user.id ,
                                                 id      = data["id"])
            scheduler_id = scheduler.id
            scheduler.delete()

            return JsonResponse({"message": "DELETE_SUCCESS",
                                 "data"   : scheduler_id},status = 200)
        except KeyError:
            return JsonResponse({"message": "KEY_ERROR"},status = 400)
        except ValueError:
            return JsonResponse({"message": "KEY_ERROR"}, status = 400)
        except Exception as e:
            return JsonResponse({"message": e},status = 400)
        return

