from django.db import models


# 图片类型
class ImageCategoty(models.Model):
    name = models.CharField(verbose_name="类型名称", max_length=6)

    class Meta:
        db_table = "vgpic_ImageCategoly"
        verbose_name = "图片类型"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


# 图片
class Image(models.Model):
    image_title = models.CharField(default='VanGogh', max_length=8, verbose_name='pic name')
    image_link = models.CharField(default='https://img.afqaq.com/images/2022/04/18/log.gif', max_length=1024,
                                  verbose_name='pic link')
    image_thumbnail = models.CharField(default='https://img.afqaq.com/images/2022/04/18/log.gif', max_length=1024,
                                       verbose_name='pic thumbnail')
    category_id = models.IntegerField(verbose_name='category id')

    class Meta:
        db_table = "vgpic_image"
        verbose_name = "图片"
        verbose_name_plural = verbose_name

    def __str__(self):
        return '%s %s' % (self.sku.name, self.id)
