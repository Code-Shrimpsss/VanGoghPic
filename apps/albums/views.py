import json

from django.http import JsonResponse
from django.views import View
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin
# from rest_framework.viewsets import ViewSet, ModelViewSet


from apps.albums.models import Albums, UserAlbum
from apps.albums.serializers import AlbumSerializer
from apps.users.models import User
from apps.users.serializers import UserSerializer


class AlbumsView(ListModelMixin, GenericAPIView):
    queryset = Albums.objects.all()
    serializer_class = AlbumSerializer

    def get(self, request):
        return self.list(request)


class SignAlbumView(View):
    def post(self, request, user_id):
        list = {}
        try:
            albumDate = Albums.objects.filter(id=user_id).values()
            albumCreator = albumDate[0]['creator_id']
            for (i, v) in albumDate[0].items():
                list[i] = v
            try:
                user = User.objects.get(id=albumCreator)
                s = UserSerializer(user).data
                for (i, v) in s.items():
                    list[i] = v
            except Exception as e:
                print(e)
                return JsonResponse({"code": 400})
        except Exception as e:
            print(e)
            return JsonResponse({"code": 400})
        return JsonResponse({"code": 200, 'datalist': list})


class AlbumData(View):
    def get(self, request):
        list = []
        albumDate = Albums.objects.all().values()
        for item in albumDate:
            albumCreator = item['creator_id']
            print(albumCreator)
            user = User.objects.get(id=albumCreator)
            s = UserSerializer(user).data
            print(s)
            for (i, v) in s.items():
                item[i] = v
            list.append(item)
        return JsonResponse({"code": 200, 'errmsg': 'Good Job', 'datalist': list})


class createAlbums(View):
    def post(self, request, *args, **kwargs):
        datas = json.loads(request.body);
        user = User.objects.get(username=datas["username"]);
        # {'name': '', 'region': '', 'resource': '公开画册', 'desc': '', 'imgList': [{'uid': 1652102306770}]}
        # 1. 判断是否符合规范
        # if datas["imgList"] is None:
        #     return JsonResponse({'code': 400, "errmsg": '图片上传不符合规范'})
        # if 0 == len(datas["imgList"]) < 7:
        #     return JsonResponse({'code': 400, "errmsg": '最少上传6张图片！'})
        if (datas["title"] and datas["region"] and datas["resource"] and datas["desc"]) == "":
            return JsonResponse({'code': 400, "errmsg": '画册信息填写不完整！'})

        try:
            als = Albums.objects.create(title=datas["title"],
                                        album_type=datas["region"],
                                        ispublic=datas["resource"],
                                        expostitory=datas["desc"],
                                        )
        except Exception as e:
            return JsonResponse({'code': 400, "errmsg": e})
        # print(als)
        print(datas)

        return JsonResponse({'code': 200, "errmsg": 'test'})
