from rest_framework.serializers import ModelSerializer

from apps.imgs.models import ImageCategoty, Image


class TypeSerializer(ModelSerializer):
    class Meta:
        model = ImageCategoty
        fields = '__all__'


class ImageSerializer(ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'
