from django.urls import path , include

urlpatterns = [
    # 로그인 / 회원가입
    path('users/', include("users.urls")),
    # scheduler
    path('scheduler', include("scheduler.urls")),
]
