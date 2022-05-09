import json

from ronglian_sms_sdk import SmsSDK


class SmsUtil:
    __instance = None

    def __new__(cls, *args, **kwargs):
        if not cls.__instance:
            cls.__instance = super().__new__(cls, *args, **kwargs)
            cls.smsSdk = SmsSDK(accId='8aaf07087dc23905017dcb553c9002cb',
                                accToken='9f0717b195c941d28b882bd914a1c5fd',
                                appId='8aaf07087dc23905017dcb553d8b02d2')

        return cls.__instance

    def send_message(self, mobile='18023237681', tid='1', code='1234'):

        sendback = self.smsSdk.sendMessage(tid=tid, mobile=mobile, datas=(code, 5))
        # 把返回值转为字典
        sendback = json.loads(sendback)
        # "statusCode": "000000"
        if sendback.get("statusCode") == "000000":
            print("发送成功")
        else:
            print("发送失败")
