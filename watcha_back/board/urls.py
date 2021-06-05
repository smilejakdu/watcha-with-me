from django.urls import path
from .views      import BoardView,DetailBoardView,SearchView

urlpatterns = [
    path(''               , BoardView.as_view()),
    path('<int:board_id>' , DetailBoardView.as_view()),
    path('search'         , SearchView.as_view()),
]
