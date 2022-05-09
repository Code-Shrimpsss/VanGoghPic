from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    mobile = models.CharField(max_length=11, unique=True)
    email_active = models.BooleanField(default=False, verbose_name='邮箱验证状态')
    default_address = models.IntegerField(null=True, blank=True, verbose_name='默认地址')
    author_img = models.ImageField(default='group1/M00/00/02/wKixgGJlF96AHdruAAFmeY1_DW0295.jpg', null=True,
                                   upload_to='img/')
    signature = models.CharField(max_length=100, verbose_name='个人签名', null=True)
    hobby = models.CharField(max_length=20, verbose_name='爱好', null=True)

    class Meta:
        db_table = 'tb_user'
        verbose_name = '用户'
        verbose_name_plural = verbose_name
