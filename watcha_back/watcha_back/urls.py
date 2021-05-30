from django.urls             import path , include
from django.conf.urls.static import static
from django.conf             import settings

urlpatterns = [
    # 로그인 / 회원가입
    path('users/', include("users.urls")),
    # scheduler
    path('scheduler', include("scheduler.urls")),
    # board
    path('board', include("board.urls")),
]
urlpatterns += static(settings.MEDIA_URL,
                    document_root=settings.MEDIA_ROOT)