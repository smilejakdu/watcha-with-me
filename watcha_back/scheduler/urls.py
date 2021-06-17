from django.urls import path
from .views import SchedulerView , AnalysisView

urlpatterns = [
    path(''         , SchedulerView.as_view()),
    path('analysis' , AnalysisView.as_view()),
]
