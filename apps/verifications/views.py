import json
import random

from django.http import HttpResponse, JsonResponse
from django.views import View
from django_redis import get_redis_connection
from redis import Redis
from libs.captcha.captcha import captcha
from utils.smsutils import SmsUtil
from celery_tasks.sms.tasks import send_sms_code

class ImageCodeView(View):
    def get(self, request, uuid):
        text, image = captcha.generate_captcha()
        print(text)
        redis = get_redis_connection('code')
        redis.setex(uuid, 300, text)
        print(redis)
        return HttpResponse(image, content_type='image/jpeg')


class SmsView(View):
    def get(self, request, mobile):
        json_bytes = request.body  # 从请求体中获取原始的JSON数据，bytes类型的
        print(json_bytes)
        print(request.GET.get('image_code_id'))
        # - 2 校验手机号格式是否正确
        if not mobile:
            return JsonResponse({'code': 400, "errmsg": "手机号为空"})
        # - 3 校验图片验证码是否正确
        # 用户发过来的图片验证码image_code
        image_code: str = request.GET.get('image_code')
        print('image_code', image_code)
        image_code_uuid = request.GET.get('image_code_id')
        try:
            # 获取保存都在redis里的图片验证码
            redis: Redis = get_redis_connection('code')
            print('111redis', redis)
            image_code_redis = redis.get(image_code_uuid)
            if not image_code_redis:
                return JsonResponse({'code': 400, "errmsg": "验证码过期"})

            image_code_redis = image_code_redis.decode()
            print('image_code', image_code)
            print('image_code_redis', image_code_redis)

            if image_code.lower() != image_code_redis.lower():
                return JsonResponse({'code': 500, "errmsg": "图片验证码错了"})
        except Exception as e:
            print(e)
            return JsonResponse({'code': 400, "errmsg": "网络异常"})

        # - 4 给这个手机号发送短信  第三方
        print("发送短信给", mobile)

        # - 1 先 根据key: flag_手机号 ，获取值
        flag_send = redis.get('flag_%s' % mobile)

        # - 2 如果值存在 ，返回错误响应  过于频繁发送
        if flag_send:
            return JsonResponse({'code': 300, "errmsg": "短信已经发送，请稍后再试"})

        # - 3 如果不存在 就可以继续发送短信验证码
        sms_code = '%06d' % random.randint(0, 999999)
        print('sms_code=', sms_code)

        # 同步发短信
        SmsUtil().send_message(mobile=mobile, code=sms_code)

        # 异步发短信
        print('发短信111')
        send_sms_code.delay(mobile=mobile, code=sms_code)
        print('发短信222')

        # - 1创建redis的管道 pipline 对象
        pl = redis.pipeline()
        # - 2 把redis的操作请求 添加到管道
        pl.setex('smscode_%s' % mobile, 60 * 3, sms_code)
        pl.setex('flag_%s' % mobile, 120, 1)
        # - 3 执行所有操作
        pl.execute()

        # - 4 发送完保存有效期 60秒
        redis.setex('flag_%s' % mobile, 120, 1)

        # - 5 返回响应
        return JsonResponse({'code': 200, "errmsg": "ok"})
