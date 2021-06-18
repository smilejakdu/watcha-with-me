from django.urls import path
from .views      import (SchedulerView ,
                         AnalysisView ,
                         PolarChartView)

urlpatterns = [
    path(''           , SchedulerView.as_view()),
    path('analysis'   , AnalysisView.as_view()),
    path('polar'      , PolarChartView.as_view()),
]
