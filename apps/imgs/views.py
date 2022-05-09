from django.http import JsonResponse
from django.views import View
from requests import Response
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.viewsets import ModelViewSet

from apps.imgs.serializers import TypeSerializer, ImageSerializer
from apps.imgs.models import ImageCategoty, Image


class AllType(GenericAPIView):
    queryset = ImageCategoty.objects.all()
    serializer_class = TypeSerializer

    def get(self, request):
        instance = self.get_queryset().values()
        lists = []
        for i in instance:
            lists.append(i)
        # print(lists)
        return JsonResponse({"code": 200, "errmsg": 'OK', 'lists': lists})


class Images(View):
    def get(self, request, id):
        try:
            imgUrl = Image.objects.filter(category_id=id)
            imgList = []
            for i in imgUrl.values():
                imgList.append(i)
            # print(imgList)
        except Exception as e:
            print(e)
            return JsonResponse({"code": 400, "errmsg": 'The type is Error'})

        return JsonResponse({"code": 200, "errmsg": 'OK', 'imgList': imgList})


class AllImagesView(ModelViewSet):
    # 查询集
    queryset = Image.objects.all()
    # 序列化器
    serializer_class = ImageSerializer

    def update(self, request, *args, **kwargs):
        # - 1 接收参数 校验
        print(request.data)
        image = request.FILES.get('file')
        print(image)
        # - 2 把图片上传到fastdfs里 返回一个图片地址
        from fdfs_client.client import Fdfs_client
        # 创建FastDFS连接对象
        client = Fdfs_client('utils/fastdfs/client.conf')
        # 上传
        result = client.upload_by_buffer(image.read())
        print(type(client))
        if result.get("Status") != 'Upload successed.':
            return Response(status=status.HTTP_400_BAD_REQUEST)
        print(222)
        # 取出在fastdfs里的地址  把这个地址 保存到数据库
        file_id = result.get("Remote file_id")
        print("file_id", file_id)

        # 3 把图片的地址和sku_id一切用模型类SKUImage保存到数据库
        # Image.objects.create(sku_id=sku_id, image=file_id)
        # Image.objects.update()

        # # - 4 返回响应
        # return Response(status=status.HTTP_201_CREATED)
        return JsonResponse({'code': 200, 'errmsg': 'OK'})


class userUpdata(View):
    def post(self, request, *args, **kwargs):
        # # - 1 接收参数 校验
        # image = request.FILES.get('file')
        # # - 2 把图片上传到fastdfs里 返回一个图片地址
        # from fdfs_client.client import Fdfs_client
        # # 创建FastDFS连接对象
        # client = Fdfs_client('utils/fastdfs/client.conf')
        # # 上传
        # result = client.upload_by_buffer(image.read())
        # if result.get("Status") != 'Upload successed.':
        #     return Response(status=status.HTTP_400_BAD_REQUEST)
        # # 取出在fastdfs里的地址  把这个地址 保存到数据库
        # file_id = result.get("Remote file_id")
        # print("file_id", file_id)

        # 3 把图片的地址和sku_id一切用模型类SKUImage保存到数据库
        # Image.objects.create(sku_id=sku_id, image=file_id)
        # Image.objects.update()

        # # - 4 返回响应
        # return JsonResponse({'code': 200, 'errmsg': 'OK', 'authorImg': file_id})
        return JsonResponse({'code': 200, 'errmsg': 'OK'})


