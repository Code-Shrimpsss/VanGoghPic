from django.urls import path
from apps.verifications.views import ImageCodeView, SmsView

urlpatterns = [
    # Judging image verifications code
    path('image_codes/<uuid:uuid>/', ImageCodeView.as_view()),
    # Judging SMS verifications code
    path('sms_codes/<mobile>/', SmsView.as_view()),
]
