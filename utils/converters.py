class UsernameConverter:
    """自定义路由转换器去匹配用户名"""
    regex = '[a-zA-Z0-9_-]{6,10}'

    def to_python(self, value):
        return str(value)


class UUIDConverter:
    """自定义路由转换器去匹配手机号"""
    # 定义UUID的正则表达式
    regex = '[\w-]+'

    def to_python(self, value):
        # to_python：将匹配结果传递到视图内部时使用
        return str(value)


class MobileConverter:
    """自定义路由转换器去匹配手机号"""
    # 定义匹配手机号的正则表达式
    regex = '1[3-9]\d{9}'

    def to_python(self, value):
        return str(value)
