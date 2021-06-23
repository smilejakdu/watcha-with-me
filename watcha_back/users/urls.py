from django.urls import path
from users.views import (KakaoSignInView,
                         SignUpView,
                         SignInView,
                         TokenCheckView,
                         UserLoadView 
                         )

urlpatterns = [
    path('kakaologin', KakaoSignInView.as_view()),
    path("signup"    , SignUpView.as_view()),
    path("signin"    , SignInView.as_view()),
    path("token"     , TokenCheckView.as_view()),
    path("userload"  , UserLoadView.as_view()),
]
