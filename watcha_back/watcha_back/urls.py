from django.urls             import path , include
from django.conf.urls.static import static
from django.conf             import settings

urlpatterns = [
    path('users/'    , include("users.urls")),
    path('scheduler' , include("scheduler.urls")),
    path('board/'     , include("board.urls")),
    path('review'    , include("review.urls")),
]
urlpatterns += static(settings.MEDIA_URL,
                    document_root=settings.MEDIA_ROOT)
