from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse


# 用来验证是否登录的混合类
class LoginRequiredJSONMixin(LoginRequiredMixin):
    def handle_no_permission(self):
        return JsonResponse({"code": 400, 'errmsg': "未登录"})
