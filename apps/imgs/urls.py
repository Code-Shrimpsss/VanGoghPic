from django.urls import path
from rest_framework.routers import DefaultRouter

from apps.imgs.views import AllType, Images, AllImagesView, userUpdata

# userUpdata

urlpatterns = [
    path('AllType/', AllType.as_view()),
    path('imgs/<id>/', Images.as_view()),
    path('updata/images', userUpdata.as_view()),
]

# # # 创建router实例
# router = DefaultRouter()
# router.register(r'updata/images/', AllImagesView, basename='image')
#
# # 将router生成的路由追加到urlpatterns中
# urlpatterns += router.urls
