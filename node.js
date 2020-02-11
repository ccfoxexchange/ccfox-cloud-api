//accessKey： c4e516d4-8f42-4c48-bbbe-8d74ad62d45c2
//secretKey： d4f74ddd-6875-48b9-827c-49473b80f24d2
verb = 'GET'
//Note url-encoding on querystring - this is '/api/v1/instrument?filter={"orderId":"11548326910655928"}'

//Be sure to HMAC exactly what is sent on the wire

path = '/api/v1/broker/queryAsset?filter=%7b%22applId%22%3a5%2c%22queryUserId%22%3a%22129%22%2c%22currencyId%22%3a1%7d'
expires = 1518064237
data = ''

HEX(HMAC_SHA256(apiSecret, 'GET/api/v1/order?filter=%7B%22orderId%22%3A%2211548326910655928%22%7D1518064237'))

// Result is:'f8c9f640e1c9a068e27eac13e38fb900766d6953862d598bb483266dfa96017d'
signature = HEX(HMAC_SHA256(secretKey, verb + path + str(expires) + data))

/***

例：创建订单(POST)

*/
verb = 'POST'
path = '/api/v1/order'
expires = 1518064238

data = '{"symbol":"XBTM15","price":219.0,"clOrdID":"oemUeQ4CAJZgP3fjHsA","orderQty":98}'

HEX(HMAC_SHA256(apiSecret, 'POST/api/v1/order1518064238{"symbol":"XBTM15","price":219.0,"clOrdID":"mm_bitmex_1a/oemUeQ4CAJZgP3fjHsA","orderQty":98}'))

// Result is: '1749cd2ccae4aa49048ae09f0b95110cee706e0944e6a14ad0b3a8cb45bd336b'

signature = HEX(HMAC_SHA256(apiSecret, verb + path + str(expires) + data))

/***

### 签名失败

* 检查 API Key 是否有效，是否复制正确，是否有绑定 IP 白名单
* 检查时间戳是否是 UTC 当前时间戳，校验一分钟以内合法
* 检查参数是否按(verb + path + nonce + data)排序
* 检查编码utf-8

### 示例代码

* node.js
*/
var request = require("request");
var crypto = require("crypto");

var accessKey = "c4e516d4-8f42-4c48-bbbe-8d74ad62d45c";
var secretKey = "d4f74ddd-6875-48b9-827c-49473b80f24d";

var verb = "GET";
var path = "/api/v1/broker/queryAsset?filter=%7b%22applId%22%3a5%2c%22queryUserId%22%3a%22129%22%2c%22currencyId%22%3a1%7d"; //值为URLEcode编码
var expires = 1548311559;
var data = "";

var postBody = JSON.stringify(data);
var signature = crypto
  .createHmac("sha256", secretKey)
  .update(verb + path + expires + data)
  .digest("hex");

var headers = {
  "content-type": "application/json",
  Accept: "application/json",
  apiExpires: expires,
  apikey: accessKey,
  signature: signature
};

const requestOptions = {
  headers: headers,
  url: "host" + path,
  method: verb,
  body: postBody
};

request(requestOptions, function(error, response, body) {
  if (error) {
    console.log(error);
  }
  console.log(body);
});
