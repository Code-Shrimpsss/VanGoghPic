from django.core.files.storage import Storage

from Van_GoghPic_admin.settings import FDFS_BASE_URL


class FastDFSStorage(Storage):
    def _open(self):
        pass

    def _save(self, name, content, max_length=None):
        pass

    def exists(self, name):
        return False  # 表示文件不存在(可以执行上传)

    def url(self, name):
        # 返回图片的完整路径
        return FDFS_BASE_URL + name
