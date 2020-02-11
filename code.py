import time
import hashlib
import hmac
from urllib.parse import urlparse
# 签名是 HMAC_SHA256(secret, verb + path + expires + data)，十六进制编码。
# verb 必须是大写的，url 是相对的，expires 必须是 unix 时间戳（以秒为单位）
# 并且数据（如果存在的话）必须是 JSON 格式，并且键值之间没有空格。
def generate_signature(secret, verb, url, expires, data):
    """Generate a request signature compatible with cloud."""
    # 解析该 url 来移除基础地址而得到 path
    parsedURL = urlparse(url)
    path = parsedURL.path
    if parsedURL.query:
        path = path + '?' + parsedURL.query

    if isinstance(data, (bytes, bytearray)):
        data = data.decode('utf8')

    print("Computing HMAC: %s" % verb + path + str(expires) + data)
    message = verb + path + str(expires) + data

    signature = hmac.new(bytes(secret, 'utf8'), bytes(message, 'utf8'), digestmod=hashlib.sha256).hexdigest()
    return signature

expires = 1518064236
# 或者你可以像以下这样生成:
# expires = int(round(time.time()) + 5)
# GET请求将参数json化，然后urlencode, 放在url参数后面(?filter=xxxxxxx), data为空字符串
# POST请求将参数json化成字符串(字符串不能有空格)，放在data参数的位置
print(generate_signature('chNOOS4KvNXR_Xq4k4c9qsfoKWvnDecLATCRlcBwyKDYnWgO', 'GET', '/api/v1/instrument?filter=%7B%22orderId%22%3A%2211548326910655928%22%7D1518064237', expires, ''))
print(generate_signature('chNOOS4KvNXR_Xq4k4c9qsfoKWvnDecLATCRlcBwyKDYnWgO', 'POST', '/api/v1/instrument', expires, '{"symbol":"XBTM15","price":219.0,"clOrdID":"mm_bitmex_1a/oemUeQ4CAJZgP3fjHsA","orderQty":98}'))
