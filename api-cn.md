* [合约云B端对接文档](https://github.com/ccfoxexchange/cloud-api/blob/master/api-cn.md#合约云b端对接文档)
		* [只需一周，拥有专属于您的合约交易功能](https://github.com/ccfoxexchange/cloud-api/blob/master/api-cn.md#只需一周拥有专属于您的合约交易功能)
		* [技术对接](https://github.com/ccfoxexchange/cloud-api/blob/master/api-cn.md#技术对接)
			* [对接交易页面前端](https://github.com/ccfoxexchange/cloud-api/blob/master/api-cn.md#对接交易页面前端)
			* [API接口](https://github.com/ccfoxexchange/cloud-api/blob/master/api-cn.md#api接口)
			* [签名说明](https://github.com/ccfoxexchange/cloud-api/blob/master/api-cn.md#签名说明)
				* [申请创建 API Key](https://github.com/ccfoxexchange/cloud-api/blob/master/api-cn.md#申请创建-api-key)
				* [签名步骤](https://github.com/ccfoxexchange/cloud-api/blob/master/api-cn.md#签名步骤)
				* [签名失败](https://github.com/ccfoxexchange/cloud-api/blob/master/api-cn.md#签名失败)
				* [示例代码](https://github.com/ccfoxexchange/cloud-api/blob/master/api-cn.md#示例代码)
		
	* [公共接口](https://github.com/ccfoxexchange/cloud-api/blob/master/api-cn.md#公共接口)
	
	* [获取用户信息](https://github.com/ccfoxexchange/cloud-api/blob/master/api-cn.md#获取用户信息)
	
	* [子账号注册](https://github.com/ccfoxexchange/cloud-api/blob/master/api-cn.md#子账号注册)
		
	* [子账号登录](https://github.com/ccfoxexchange/cloud-api/blob/master/api-cn.md#子账号登录)
		
	* [查询子账户期货历史委托](https://github.com/ccfoxexchange/cloud-api/blob/master/api-cn.md#查询子账户期货历史委托)
		
	* [查询子账户期货历史成交](https://github.com/ccfoxexchange/cloud-api/blob/master/api-cn.md#查询子账户期货历史成交)
		
	* [查询转账状态](https://github.com/ccfoxexchange/cloud-api/blob/master/api-cn.md#查询转账状态)
		
	* [资产查询](https://github.com/ccfoxexchange/cloud-api/blob/master/api-cn.md#资产查询)
		
	* [转账](https://github.com/ccfoxexchange/cloud-api/blob/master/api-cn.md#转账)

[B端mq对接](https://github.com/ccfoxexchange/cloud-api/blob/master/api-cn.md#b端mq对接)


# 合约云B端对接文档
如果您符合以下其中一种或多种条件，您可以B端对接端方式接入合约云，快速部署属于您的衍生品合约交易系统。

* 数字资产钱包
* 币币交易所
* 集成了USDT/ETH/BTC钱包的项目

通过接入合约云，您将获得：

* 高比例后端手续费分成，您的流量变现最佳手段
* 极致合约交易体验， 兼容 okex + bitmex 方案
* 优化风控极致，客活率up up up!
* 前期培训+持续运营支持，保障您的成功！


### 只需一周，拥有专属于您的合约交易功能

您只需要对接少量接口，即可快速接入，仅需1周！ 

欢迎联系我们：

* 微信：13066998399  （加好友请注明 b端合作）
* 邮箱：sonic@ccfox.com

-----------------------------------------------------------------------------------------

![aa](http://assets.processon.com/chart_image/5c1c5704e4b0b71ee503e019.png?_=1562828594434)

### 技术对接

合约云B端对接十分简单，仅需您完成以下几步即可。

1. 在 **您的系统** 中每个用户准备单独的合约交易账户，并 准备一个资金划转功能
    * 用户的资金可以在 普通账户 和 合约交易账户 之间互相划转。
2. 在**您的系统**准备一个为用户开通合约交易的确认功能，并：
    * 让用户勾同意选我们准备好的 合约用户协议
    * 用户提交开通确认后，通过 [子账户注册](#####子账号注册)接口为该用户在 **我们的系统** 注册账户，该账户是 **您B端母账户** 下的子账户。
3. 在 **您的系统** 中准备资金划转功能
    * 用户的资金可以在 普通账户 和 合约交易账户 之间互相划转
    * 当用户在 **您的系统** 中，由普通账户向 **合约交易账户** 转入资金时，您通过调用我们系统的[转账接口](#####转账)，将B端母账户的资金转入到 **用户的子账户**中。
    * 区块链转账时间比较长，为了提升用户体验，我们建议您在母账户中预存部分资金。
    * 您需要定期平衡 **您的网站中的资金** 和 **您在我们这边的B端母账户资金** ， 您可能会需要用到 [资产查询接口](#####资产查询) 查询 您的B端母账户或者您旗下的子账户的资产情况
4. 将我们准备好的 **交易页面前端**嵌入到您的网站中
    * 用户进入**交易页面前端**时，调用 [登陆接口](#####子账号登录)为用户在 我们的系统 登陆
5. 用户的有关消息（强平/强减）将通过mq推送，需要您根据[B端mq对接](#####B端mq对接)自行对接去给您的用户发送消。


![对接示意图](http://assets.processon.com/chart_image/5d216009e4b0f42d0679e75a.png)

#### 对接交易页面前端

1. 先在APP登录好，得到token，
2. 然后在跳转交易页前将token代入url(http://mcloudtest.ccfox.com/?token=cf6b5c94-4041-466f-8df5-0ddb4c6b6ce7) 
3. 国际化默认使用中文，可通过请求中添加参数切换语言，(http://mcloudtest.ccfox.com/?token=xxx&locale=en_US) locale可选值包含中文，英文，中文繁体，依次为zh_CN， en_US， zh_TW

所有接口都需要在header里添加apiKey，apiExpires，signature三个参数

* 交易页面前端demo如下：
  * h5
    * 测试环境 http://mcloudtest.ccfox.com 
    * 生产 请联系我们
  * web
    * 测试环境 http://webcloudtest.ccfox.com
    * 生产 请联系我们

#### API接口

- 测试环境地址 https://apitest.ccfox.com/
- 生产环境地址 https://api.ccfox.com/

#### 签名说明

API 请求在通过 internet 传输的过程中极有可能被篡改，为了确保请求未被更改，除公共接口（基础信息，行情数据）外的私有接口均必须使用您的 API Key 做签名认证，以校验参数或参数值在传输途中是否发生了更改。

一个合法的请求由以下几部分组成：

* 方法请求地址：即访问服务器地址 xxx，比如xxx/api/v1/broker/queryAsset。
* API 访问密钥（AccessKeyId）：您申请的 API Key 中的 Access Key。
* 时间戳（Timestamp）：您发出请求的时间戳。如：1548311559。在查询请求中包含此值有助于防止第三方截取您的请求。校验一分钟以内合法
* 签名：签名计算得出的值，用于确保签名有效和未被篡改。

``` js
// 请求头包含
var headers = {
  'content-type' : 'application/json',
  'apiExpires': expires, //UNIX时间戳以秒为单位。 校验一分钟以内合法
  'apiKey': apiKey, // API 访问密钥（apiKey）
  'signature': signature // 签名
};

```

##### 申请创建 API Key

通过crm系统获取B端 API Key

API Key 包括以下两部分

* `Access Key` API 访问密钥
* `Secret Key` 签名认证加密所使用的密钥

##### 签名步骤

规范要计算签名的请求 因为使用 SHA256 进行签名计算时，使用不同内容计算得到的结果会完全不同。所以在进行签名计算前，请先对请求进行规范化处理。（GET和POST请求不同）
例：资产查询(GET)

`GET https://xxx.io/api/v1/broker/queryAsset?filter={applId：应用ID（默认为2）  queryUserId：用户ID  currencyId：币种ID}`

```js
//accessKey： c4e516d4-8f42-4c48-bbbe-8d74ad62d45c2
//secretKey： d4f74ddd-6875-48b9-827c-49473b80f24d2
verb = 'GET'
//Note url-encoding on querystring - this is '/api/v1/instrument?filter={"orderId":"11548326910655928"}'

//Be sure to HMAC exactly what is sent on the wire

path = '/api/v1/broker/queryAsset?filter=%7b%22applId%22%3a5%2c%22queryUserId%22%3a%22129%22%2c%22currencyId%22%3a1%7d'
expires = 1518064237
data = ''

HEX(HMAC_SHA256(apiSecret, 'GET/api/v1/order?filter=%7B%22orderId%22%3A%2211548326910655928%22%7D1518064237'))

Result is:'f8c9f640e1c9a068e27eac13e38fb900766d6953862d598bb483266dfa96017d'
signature = HEX(HMAC_SHA256(secretKey, verb + path + str(expires) + data))

```

例：创建订单(POST)

```js
verb = 'POST'
path = '/api/v1/order'
expires = 1518064238

data = '{"symbol":"XBTM15","price":219.0,"clOrdID":"oemUeQ4CAJZgP3fjHsA","orderQty":98}'

HEX(HMAC_SHA256(apiSecret, 'POST/api/v1/order1518064238{"symbol":"XBTM15","price":219.0,"clOrdID":"mm_bitmex_1a/oemUeQ4CAJZgP3fjHsA","orderQty":98}'))

Result is: '1749cd2ccae4aa49048ae09f0b95110cee706e0944e6a14ad0b3a8cb45bd336b'

signature = HEX(HMAC_SHA256(apiSecret, verb + path + str(expires) + data))

```

##### 签名失败

* 检查 API Key 是否有效，是否复制正确，是否有绑定 IP 白名单
* 检查时间戳是否是 UTC 当前时间戳，校验一分钟以内合法
* 检查参数是否按(verb + path + nonce + data)排序
* 检查编码utf-8

##### 示例代码

* node.js

``` javascript
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
```

- python

```python
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
```
## 公共接口

币种接口： https://apitest.ccfox.com/future/queryCommonInfo

## 获取用户信息

获取用户相关信息无需签名，只需要带上用户oauth2 的身份令牌即可，和访问合约云页面一样的处理

查询用户接口 https://apitest.ccfox.com/users/userInfo?access_token=XXX  //xxx 为登录返回的access_token


## 子账号注册

### 基本信息

**Path：** /api/v1/broker/registerSon

**Method：** POST

**接口描述：**

校验：
    签名校验，apikey 权限校验，用户组是否属于券商校验，子账号重复提交注册校验，是否已注册校验，注册上线阈值校验

### 请求参数

**Headers**

| 参数名称     | 参数值                                                       | 是否必须 | 示例                                                         | 备注                                                         |
| ------------ | ------------------------------------------------------------ | -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Content-Type | application/json                                             | 是       |                                                              |                                                              |
| signature    | 1dec55ac42478858d322cf841f22522bb47752bbd5d330adbe84db9cf5854733 | 是       | 1dec55ac42478858d322cf841f22522bb47752bbd5d330adbe84db9cf5854733 | 签名，生成方式：sha256对请求body参数加密（对外生成示例文档询问技术人员索要） |
| apiKey       | 61ba5fc3-2384-472e-8712-e5f83b358815                         | 是       | 61ba5fc3-2384-472e-8712-e5f83b358815                         | API访问密钥：每个券商对应接口的标识（券商申请的apiKey）      |
| apiExpires   | 1561708654079                                                | 是       | 1561708654079                                                | API此次访问过期时间（时间戳：毫秒）                          |
| UNIQUE       | XXXX                                                         | 是       |                                                              | uuid, 每次申请都需不一样的值,用于防重复提交                  |

**Body**

| 名称        | 类型   | 是否必须 | 默认值 | 备注                         | 其他信息 |
| ----------- | ------ | -------- | ------ | ---------------------------- | -------- |
| groupId     | number | 必须     |        | 分组ID                       |          |
| areaCode    | string | 非必须   |        | 区号   示例：+86             |          |
| sonUserName | string | 必须     |        | 账号名称（限定15位纯数字）   |          |
| sonPassword | string | 必须     |        | 密码：MD5加密32位小写        |          |
| phone       | string | 非必须   |        | 手机号：传了手机号区号必须传 |          |
| email       | string | 非必须   |        | 邮箱                         |          |

### 返回数据

| 名称 | 类型   | 是否必须 | 默认值 | 备注                           | 其他信息 |
| ---- | ------ | -------- | ------ | ------------------------------ | -------- |
| code | number | 必须     |        | 返回code（0：成功  非0：失败） |          |
| msg  | string | 必须     |        | 返回消息                       |          |
| data | null   | 必须     |        |                                |          |

## 子账号登录



### 基本信息

**Path：** /api/v1/broker/loginSon

**Method：** POST

**接口描述：**

### 请求参数

**Headers**

**Body**

| 名称        | 类型   | 是否必须 | 默认值 | 备注                      | 其他信息 |
| ----------- | ------ | -------- | ------ | ------------------------- | -------- |
| sonUserName | string | 必须     |        | 账号名称                  |          |
| sonPassword | string | 必须     |        | 账号密码：MD5加密32位小写 |          |

### 返回数据

| 名称             | 类型   | 是否必须 | 默认值 | 备注                           | 其他信息 |
| ---------------- | ------ | -------- | ------ | ------------------------------ | -------- |
| code             | number | 必须     |        | 返回code（0：成功  非0：失败） |          |
| msg              | string | 必须     |        | 返回消息                       |          |
| data             | object | 必须     |        |                                |          |
| ├─ access_token  | string | 必须     |        | token                          |          |
| ├─ token_type    | string | 必须     |        | token类型                      |          |
| ├─ refresh_token | string | 必须     |        | 刷新token                      |          |
| ├─ expires_in    | string | 必须     |        | 有效时间：毫秒为单位           |          |
| ├─ scope         | string | 必须     |        |                                |          |

## 查询子账户期货历史委托



### 基本信息

**Path：** /api/v1/broker/queryHisOrder

**Method：** GET

**接口描述：**

### 请求参数
### Query：

| 参数名称 | 是否必须 | 示例                      | 备注                                                         |
| :------- | :------- | :------------------------ | :----------------------------------------------------------- |
| filter   | 是       | %7B%22userId%22%3A+275%7D | 注意：     请求参数filter=%7B%22userId%22%3A+275%7D，值为URLEcode编码， 编码后 用大写 比如 %3a 需要 转换成 %3A     解码值为：{"userId":275}     其中             userId（int）：用户ID，                                            必须             contractId（int）：交易对ID，                                  非必须             side（int）：上下页数,                                               非必须             startDate（long）：开始时间戳,                                非必须             endDate（long）：结束时间戳,                                 非必须             pageNum（int）：当前页数,                                      非必须             pageSize（int）：页显示数量,                                    非必须 |




### 返回数据

| 名称                | 类型      | 是否必须 | 默认值 | 备注                                                         | 其他信息          |
| ------------------- | --------- | -------- | ------ | ------------------------------------------------------------ | ----------------- |
| code                | number    | 非必须   |        |                                                              |                   |
| msg                 | string    | 非必须   |        |                                                              |                   |
| data                | object [] | 非必须   |        |                                                              | item 类型: object |
| ├─ applId           | number    | 必须     |        | 2：期货                                                      |                   |
| ├─ timestamp        | number    | 必须     |        | 委托时间                                                     |                   |
| ├─ userId           | number    | 必须     |        | 用户ID                                                       |                   |
| ├─ contractId       | number    | 必须     |        | 交易对ID                                                     |                   |
| ├─ uuid             | string    | 必须     |        | 委托编号                                                     |                   |
| ├─ side             | number    | 必须     |        | 买卖方向，1买，-1卖                                          |                   |
| ├─ price            | string    | 必须     |        | 委托价格                                                     |                   |
| ├─ quantity         | string    | 必须     |        | 委托数量                                                     |                   |
| ├─ orderType        | number    | 必须     |        | 订单委托类型，1（限价），3（市价）                           |                   |
| ├─ orderSubType     | number    | 必须     |        | 委托子类型 0（默认值），1（被动委托），2（最近价触发条件委托），3（指数触发条件委托），4（标记价触发条件委托） |                   |
| ├─ timeInForce      | number    | 必须     |        | 订单有效时期类型：1（取消前有效），2（立即成交剩余撤销，未启用），3（全部成交否则撤销，未启用），4（五档成交剩余撤销，未启用），5（五档成交剩余转限价，未启用） |                   |
| ├─ minimalQuantity  | string    | 必须     |        | 最小成交量                                                   |                   |
| ├─ stopPrice        | string    | 必须     |        | 止损止盈价                                                   |                   |
| ├─ stopCondition    | number    | 必须     |        | 止损止盈标志 1（止盈，未启用），2（止损，未启用），3（只减仓，未启用） |                   |
| ├─ orderStatus      | number    | 必须     |        | 委托状态 0:未申报,1:正在申报,2:已申报未成交,3:部分成交,4:全部成交,5:部分撤单, 6:全部撤单7:撤单中,8:失效,11:缓存高于条件的委托,12:缓存低于条件的委托 |                   |
| ├─ makerFeeRatio    | string    | 必须     |        | maker 手续费率                                               |                   |
| ├─ takerFeeRatio    | string    | 必须     |        | taker 手续费率                                               |                   |
| ├─ clOrderId        | string    | 必须     |        | 客户订单编号                                                 |                   |
| ├─ filledCurrency   | string    | 必须     |        | 成交金额                                                     |                   |
| ├─ filledQuantity   | string    | 必须     |        | 成交数量                                                     |                   |
| ├─ canceledQuantity | string    | 必须     |        | 撤单数量                                                     |                   |
| ├─ matchTime        | number    | 必须     |        | 成交时间                                                     |                   |
| ├─ positionEffect   | number    | 必须     |        | 开平标志，1开仓2平仓                                         |                   |
| ├─ marginType       | number    | 必须     |        | 保证金类型，1全仓，2逐仓                                     |                   |
| ├─ marginRate       | string    | 必须     |        | 保证金率（倒数即为杠杠倍数）                                 |                   |
| ├─ fcOrderId        | string    | 必须     |        | 强平委托号，非空时为强平委托                                 |                   |
| ├─ deltaPrice       | string    | 必须     |        | 标记价与委托价之差                                           |                   |
| ├─ frozenPrice      | string    | 必须     |        | 资金计算价格                                                 |                   |

## 查询子账户期货历史成交



### 基本信息

**Path：** /api/v1/broker/queryHisMatch

**Method：** GET

**接口描述：**

### 请求参数

**Headers**

### Query：

| 参数名称 | 是否必须 | 示例                      | 备注                                                         |
| :------- | :------- | :------------------------ | :----------------------------------------------------------- |
| filter   | 是       | %7B%22userId%22%3A+275%7D | 注意：     请求参数filter=%7B%22userId%22%3A+275%7D，值为URLEcode编码， 编码后 用大写 比如 %3a 需要 转换成 %3A     解码值为：{"userId":275}     其中             userId（int）：用户ID，                                            必须             contractId（int）：交易对ID，                                  非必须             side（int）：上下页数,                                               非必须             startDate（long）：开始时间戳,                                非必须             endDate（long）：结束时间戳,                                 非必须             pageNum（int）：当前页数,                                      非必须             pageSize（int）：页显示数量,                                    非必须 |




### 返回数据

| 名称                 | 类型      | 是否必须 | 默认值 | 备注                                                         | 其他信息          |
| -------------------- | --------- | -------- | ------ | ------------------------------------------------------------ | ----------------- |
| code                 | number    | 非必须   |        |                                                              |                   |
| msg                  | string    | 非必须   |        |                                                              |                   |
| data                 | object [] | 非必须   |        |                                                              | item 类型: object |
| ├─ applId            | number    | 必须     |        | 2：期货                                                      |                   |
| ├─ matchTime         | number    | 必须     |        | 成交时间                                                     |                   |
| ├─ contractId        | number    | 必须     |        | 交易对ID                                                     |                   |
| ├─ execId            | string    | 必须     |        | 成交号                                                       |                   |
| ├─ bidUserId         | number    | 必须     |        | 买方用户ID                                                   |                   |
| ├─ askUserId         | number    | 必须     |        | 卖方用户ID                                                   |                   |
| ├─ bidOrderId        | string    | 必须     |        | 买方委托号                                                   |                   |
| ├─ askOrderId        | string    | 必须     |        | 卖方委托号                                                   |                   |
| ├─ matchPrice        | string    | 必须     |        | 成交价                                                       |                   |
| ├─ matchQty          | string    | 必须     |        | 成交数量                                                     |                   |
| ├─ matchAmt          | string    | 必须     |        | 成交金额                                                     |                   |
| ├─ bidFee            | string    | 必须     |        | 买方手续费                                                   |                   |
| ├─ askFee            | string    | 必须     |        | 卖方手续费                                                   |                   |
| ├─ takerSide         | number    | 必须     |        | 订单成交方向 1买，-1卖                                       |                   |
| ├─ updateTime        | number    | 必须     |        | 最近更新时间                                                 |                   |
| ├─ bidPositionEffect | number    | 必须     |        | 买方开平标志：1开仓2平仓                                     |                   |
| ├─ askPositionEffect | number    | 必须     |        | 卖方开平标志：1开仓2平仓                                     |                   |
| ├─ bidMarginType     | number    | 必须     |        | 买方保证金类型：1全仓，2逐仓                                 |                   |
| ├─ askMarginType     | number    | 必须     |        | 卖方保证金类型：1全仓，2逐仓                                 |                   |
| ├─ bidInitRate       | string    | 必须     |        | 买方初始保证金率                                             |                   |
| ├─ askInitRate       | string    | 必须     |        | 卖方初始保证金率                                             |                   |
| ├─ bidMatchType      | number    | 必须     |        | 买方成交类型：0普通成交1强平成交2强减成交（破产方）3强减成交（盈利方） |                   |
| ├─ askMatchType      | number    | 必须     |        | 卖方成交类型：0普通成交1强平成交2强减成交（破产方）3强减成交（盈利方） |                   |

## 查询转账状态



### 基本信息

**Path：** /api/v1/broker/queryTransferStatus

**Method：** GET

**接口描述：**

### 请求参数

**Headers**

**Query**

| 参数名称 | 是否必须 | 示例                                            | 备注                                                         |
| -------- | -------- | ----------------------------------------------- | ------------------------------------------------------------ |
| filter   | 是       | {"clientId":"31eb1f4b37204cc19bb1177cc5833cb3"} | 注意： 请求参数filter={"clientId":"31eb1f4b37204cc19bb1177cc5833cb3"}，值为URLEcode编码， 编码后 用大写 比如 : 需要 转换成 : 解码值为：{"clientId":"31eb1f4b37204cc19bb1177cc5833cb3"} 其中 clientId（String）：接口请求方转账单号， 必须 |

### 返回数据

| 名称             | 类型   | 是否必须 | 默认值 | 备注                                                         | 其他信息 |
| ---------------- | ------ | -------- | ------ | ------------------------------------------------------------ | -------- |
| code             | number | 必须     |        |                                                              |          |
| msg              | string | 必须     |        |                                                              |          |
| data             | object | 必须     |        |                                                              |          |
| ├─clientId       | string | 必须     |        | 转账单号                                                     |          |
| ├─transferStatus | number | 必须     |        | 转账状态：10000, "转账成功",     10001, "转账失败",     10002, "转账中",     10003, "审核中",     10004, "审核失败"; |          |

## 资产查询



### 基本信息

**Path：** /api/v1/broker/queryAsset

**Method：** GET

**接口描述：**

### 请求参数

| 参数名称 | 是否必须 | 示例                                            | 备注                                                         |
| -------- | -------- | ----------------------------------------------- | ------------------------------------------------------------ |
| filter   | 是       | {"applId":5,"queryUserId":"129","currencyId":1} | 注意： 请求参数filter={"applId":5,"queryUserId":"129","currencyId":1}，值为URLEcode编码， 编码后 用大写 比如 : 需要 转换成 : 解码值为：{"applId":5,"queryUserId":"129","currencyId":1} 其中 applId（int）：5：我的钱包，2：期货钱包， 必须 queryUserId（int）：用户ID, 查询此用户ID的余额， 必须 currencyId（int）：货币ID 非必须 |

### 返回数据

| 名称                | 类型      | 是否必须 | 默认值 | 备注           | 其他信息          |
| ------------------- | --------- | -------- | ------ | -------------- | ----------------- |
| code                | number    | 非必须   |        |                |                   |
| msg                 | string    | 非必须   |        |                |                   |
| data                | object [] | 非必须   |        |                | item 类型: object |
| ├─ currencyId       | number    | 必须     |        | 币种ID         |                   |
| ├─ available        | number    | 必须     |        | 可用金额       |                   |
| ├─ totalBalance     | string    | 必须     |        | 总资产         |                   |
| ├─ frozenForTrade   | string    | 必须     |        | 冻结资产       |                   |
| ├─ initMargin       | string    | 必须     |        | 已占用保证金   |                   |
| ├─ frozenInitMargin | string    | 必须     |        | 委托冻结保证金 |                   |
| ├─ closeProfitLoss  | string    | 必须     |        | 已实现盈亏     |                   |

## 转账



### 基本信息

**Path：** /api/v1/broker/transfer

**Method：** POST

**接口描述：**

校验：
    签名校验，apikey 权限校验，数量校验，有效货币校验，有效应用ID校验（applID），转入转出用户属于券商校验，钱包余额与转账金额校验（只校验：5我的钱包）

### 请求参数

**Headers**

**Body**

| 名称       | 类型   | 是否必须 | 默认值 | 备注                                                         | 其他信息 |
| ---------- | ------ | -------- | ------ | ------------------------------------------------------------ | -------- |
| fromUserId | number | 必须     |        | 来源用户ID                                                   |          |
| fromApplId | number | 必须     |        | 来源应用：默认传2                                            |          |
| toUserId   | string | 必须     |        | 接收用户ID                                                   |          |
| toApplId   | number | 必须     |        | 接收应用：默认传2                                            |          |
| currencyId | number | 必须     |        | 币种ID                                                       |          |
| quantity   | string | 必须     |        | 转账数量：限制小数点后六位                                   |          |
| clientId   | string | 非必须   |        | 转账单号：UUID生成唯一标识，32位数字和字母组成（请求不传服务端会自动生成） |          |

### 返回数据

| 名称 | 类型   | 是否必须 | 默认值 | 备注                           | 其他信息 |
| ---- | ------ | -------- | ------ | ------------------------------ | -------- |
| code | number | 必须     |        | 返回code（0：成功  非0：失败） |          |
| msg  | string | 必须     |        | 返回消息                       |          |
| data | object | 必须     |        | 转账单号（用于查询转账状态clientId值） |          |

	      
##### B端mq对接

- B端MQ对接
    - 说明
    <br>消息队列MQ主要存放B端子账号进行期货交易时产生的通知类消息。B端在接入时，MQ对应的配置需与交易所对接。</br>
   - 通知类消息说明
   <br>消息格式：</br>
   
    ``` json
  {"message_type":6001,"id":154804153000,"account_id":24,"contract_id":100,"side":1,"margin_rate":"50000000000000000","trigger_type":1}
      message_type 消息类型，6001：通知类消息
      id           消息ID
      account_id   子用户ID
      contract_id  合约ID
      side         买卖方向，1：买，-1：卖
      margin_rate  保证金率，值扩大了10^18次方，B端在使用时需缩小
      trigger_type 类型，1：告警，2：强平，3：强减, 4: 强减对手方
    ```
   - MQ配置说明
   <br>以下是MQ消费配置展示列,如果需要，联系我们</br>
   
   ``` java
    # 消费组ID
    group-id: **********
    # 访问公钥匙
    access-key: **********
    # 访问私钥匙
    secret-key: **********
    # 访问url地址
    namesrv-addr: **********
    # 访问模式
    messageModel: CLUSTERING
    # 消息主题
    topic: **********
    # 消息标签
    tags:**********
   ```
   
    - RocketMQ参考url
   
    https://help.aliyun.com/product/29530.html?spm=a2c4g.11186623.6.540.6ff139c69dmBkV
   
    - java对接demo
    https://github.com/ccfoxexchange/rocket-consumer-client
   
