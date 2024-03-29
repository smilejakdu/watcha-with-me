import os
import json
import bcrypt
import re

from datetime import datetime
from django.views import View
from users.models import User
from review.models import Review
from users.utils import login_check
from .models import Board, BoardImg
from django.http import JsonResponse
from users.utils import login_check


class BoardView(View):
    @login_check
    def post(self, request):
        data = json.loads(request.body)
        now = datetime.now()
        try:
            board = Board.objects.create(
                title=data['title'],
                content=data['content'],
                nickname=User.objects.get(id=request.user.id).nickname,
                user_id=request.user.id,
            )

            board = Board.objects.filter(id=board.id).values()

            return JsonResponse({"message": "SUCCESS_POST",
                                 "data": list(board)}, status=200)
        except TypeError:
            return JsonResponse({"message": "INVALID_TYPE"}, status=400)

        except ValueError:
            return JsonResponse({"message": "VALUE_ERROR"}, status=400)

        except Exception as e:
            return JsonResponse({"message": e}, status=400)

    @login_check
    def put(self, request):
        data = json.loads(request.body)

        try:
            board = Board.objects.get(id=data['id'],
                                      user_id=request.user.id)

            board.title = data['title'],
            board.content = data['content']
            board.save()

            return JsonResponse({"message": "SUCCESS_PUT"}, status=200)
        except TypeError:
            return JsonResponse({"message": "INVALID_TYPE"}, status=400)

        except ValueError:
            return JsonResponse({"message": "VALUE_ERROR"}, status=400)

        except Exception as e:
            return JsonResponse({"message": e}, status=400)

    def get(self, request):

        try:
            boards = Board.objects.prefetch_related('review_set').all().order_by('-created_at')

            board_data = [{
                'id': board.id,
                'title': board.title,
                'content': board.content,
                'nickname': board.nickname,
                'created_at': board.created_at.strftime('%Y-%m-%d'),
                'reviews': list(board.review_set.all().values().order_by('-created_at')),
                'review_count': board.review_set.all().count(),
            } for board in boards]

            return JsonResponse({"data": list(board_data)}, status=200)

        except Exception as e:
            return JsonResponse({"message": e}, status=400)

    @login_check
    def delete(self, request):
        data = json.loads(request.body)

        try:
            board = Board.objects.get(user_id=request.user.id,
                                      id=data['id'])
            board_id = board.id
            board.delete()

            return JsonResponse({"message": "SUCCESS_DELETE",
                                 "data": board_id}, status=200)

        except TypeError:
            return JsonResponse({"message": "INVALID_TYPE"}, status=400)

        except ValueError:
            return JsonResponse({"message": "VALUE_ERROR"}, status=400)

        except Exception as e:
            return JsonResponse({"message": e}, status=400)


class DetailBoardView(View):
    def get(self, request, board_id):
        try:
            board = Board.objects.prefetch_related("review_set").get(id=board_id)

            board_data = {
                'id': board.id,
                'title': board.title,
                'content': board.content,
                'nickname': board.nickname,
                'reviews': list(board.review_set.all().values().order_by('-created_at'))
            }

            return JsonResponse({"data": board_data}, status=200)

        except TypeError:
            return JsonResponse({"message": "INVALID_TYPE"}, status=400)

        except ValueError:
            return JsonResponse({"message": "VALUE_ERROR"}, status=400)

        except Exception as e:
            return JsonResponse({"message": e}, status=400)


class SearchView(View):
    def get(self, request):

        search = request.GET.get("query", None)
        print(search)

        try:
            if len(search) > 0:
                title_data = (Board.objects.filter(title__icontains=search).values())

                return JsonResponse({"data": list(title_data)}, status=200)

        except TypeError:
            return JsonResponse({"message": "INVALID_TYPE"}, status=400)

        except Exception as e:
            return JsonResponse({"message": e}, status=400)
