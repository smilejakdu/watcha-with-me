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
        data = json.loads(request.body)
        user_email = User.objects.get(id=request.user.id).email
        user_email = user_email[:user_email.index('@')]
        try:
            Scheduler(
                start_date = data['start_date'],
                end_date   = data['end_date'],
                text       = f"-{user_email}-\n{data['text']}",
                user_id    = User.objects.get(id = request.user.id).id
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
            "id"         : scheduler['id'],
            "start_date" : scheduler['start_date'],
            "end_date"   : scheduler['end_date'],
            "text"       : scheduler['text'],
            "eamil"      : User.objects.get(id=scheduler['user_id']).email
        }for scheduler in schedulers]

        return JsonResponse({"data" : list(scheduler_data)} , status = 200)

    @login_check
    def put(self , request):
        data      = json.loads(request.body)
        scheduler = Scheduler.objects.get(user_id = request.user.id ,
                                          id      = data["id"])

        regex = '-[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}-$'

        for text in data["text"].split():
            if re.search(regex, text):
                continue
            print(text)
        
        try:
            scheduler.start_date = data["start_date"]
            scheduler.end_date   = data["end_date"]
            scheduler.text       = data["text"]
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
        scheduler = Scheduler.objects.get(user_id = request.user.id ,
                                          id      = data["id"])
        try:
            scheduler.delete()
            return JsonResponse({"message": "DELETE_SUCCESS"},status = 200)
        except KeyError:
            return JsonResponse({"message": "KEY_ERROR"},status = 400)
        except ValueError:
            return JsonResponse({"message": "KEY_ERROR"}, status = 400)
        except Exception as e:
            return JsonResponse({"message": e},status = 400)
        return

