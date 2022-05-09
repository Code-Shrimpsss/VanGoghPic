from django.urls import path

from apps.users.views import UsernameCountView, MobileCountView, RegisterView, AllCounts, LoginView, UserAlbums, myUser, \
    ReviseUser
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    # 判断用户名是否重复
    path('allcounts/', AllCounts.as_view()),
    path('usernames/<username:username>/count/', UsernameCountView.as_view()),
    # 判断是否重复
    path('mobiles/<mobile:mobile>/count/', MobileCountView.as_view()),
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('alluser/<id>/', UserAlbums.as_view()),
    path('authorizations/', obtain_jwt_token),
    path('myuser/<username:username>/', myUser.as_view()),
    path('revise/', ReviseUser.as_view())
]
