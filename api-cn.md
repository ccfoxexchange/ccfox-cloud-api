- [目录Table of Contents](#目录table-of-contents)
- [合约云B端对接文档](#合约云b端对接文档)
    - [技术对接](#技术对接)
    - [对接示意图](#对接示意图)
    - [对接交易页面前端](#对接交易页面前端)
        - [对接需注入的 Cookie (注意cookie域)](#对接需注入的-cookie-注意cookie域)
        - [pc,h5对接步骤](#pch5对接步骤)
        - [android,ios通过webview嵌入合约云](#androidios通过webview嵌入合约云)
    - [API接口](#api接口)
    - [签名](#签名)
        - [说明](#说明)
        - [申请创建 API Key](#申请创建-api-key)
        - [签名步骤](#签名步骤)
            - [签名demo](#签名demo)
    - [公共接口](#公共接口)
        - [基本信息](#基本信息)
        - [请求参数](#请求参数)
        - [返回数据](#返回数据)
    - [获取用户信息](#获取用户信息)
    - [子账号注册](#子账号注册)
        - [基本信息](#基本信息-1)
        - [请求参数](#请求参数-1)
        - [返回数据](#返回数据-1)
    - [子账号登录](#子账号登录)
        - [基本信息](#基本信息-2)
        - [请求参数](#请求参数-2)
        - [返回数据](#返回数据-2)
    - [查询子账户期货历史委托](#查询子账户期货历史委托)
        - [基本信息](#基本信息-3)
        - [请求参数](#请求参数-3)
        - [Query：](#query)
        - [返回数据](#返回数据-3)
    - [查询子账户期货历史成交](#查询子账户期货历史成交)
        - [基本信息](#基本信息-4)
        - [请求参数](#请求参数-4)
        - [Query：](#query-1)
        - [返回数据](#返回数据-4)
    - [查询转账状态](#查询转账状态)
        - [基本信息](#基本信息-5)
        - [请求参数](#请求参数-5)
        - [返回数据](#返回数据-5)
    - [资产查询](#资产查询)
        - [基本信息](#基本信息-6)
        - [请求参数](#请求参数-6)
        - [返回数据](#返回数据-6)
    - [转账](#转账)
        - [基本信息](#基本信息-7)
        - [请求参数](#请求参数-7)
        - [返回数据](#返回数据-7)
    - [查询子用户手续费](#查询子用户手续费)
        - [基本信息](#基本信息-8)
        - [请求参数](#请求参数-8)
        - [返回数据](#返回数据-8)
    - [查询子用户盈亏](#查询子用户盈亏)
        - [基本信息](#基本信息-9)
        - [请求参数](#请求参数-9)
        - [返回数据](#返回数据-9)
    - [查询子用户成交金额](#查询子用户成交金额)
        - [基本信息](#基本信息-10)
        - [请求参数](#请求参数-10)
        - [返回数据](#返回数据-10)
    - [查询子用户合约资产快照](#查询子用户合约资产快照)
        - [基本信息](#基本信息-11)
        - [请求参数](#请求参数-11)
        - [返回数据](#返回数据-11)
    - [B端mq对接](#b端mq对接)
    - [部署安排](#部署安排)
        - [pc页面的部署](#pc页面的部署)
        - [内嵌在app里的h5的部署](#内嵌在app里的h5的部署)
        - [**特别注意 api和websocket的代理**](#特别注意-api和websocket的代理)
    - [Q&A](#qa)

<!-- /TOC -->
  - [查询子账户期货历史委托](https://github.com/ccfoxexchange/ccfox-cloud-api/blob/master/api-cn.md#toc25)
  - [查询子账户期货历史成交](https://github.com/ccfoxexchange/ccfox-cloud-api/blob/master/api-cn.md#toc30)
  - [查询转账状态](https://github.com/ccfoxexchange/ccfox-cloud-api/blob/master/api-cn.md#toc35)
  - [资产查询](https://github.com/ccfoxexchange/ccfox-cloud-api/blob/master/api-cn.md#toc39)
  - [转账](https://github.com/ccfoxexchange/ccfox-cloud-api/blob/master/api-cn.md#toc43)
  - [查询子用户手续费](https://github.com/ccfoxexchange/ccfox-cloud-api/blob/master/api-cn.md#toc47)
  - [查询子用户盈亏](https://github.com/ccfoxexchange/ccfox-cloud-api/blob/master/api-cn.md#toc51)
  - [查询子用户成交金额](https://github.com/ccfoxexchange/ccfox-cloud-api/blob/master/api-cn.md#toc55)
- Q&A



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

## 技术对接

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

## 对接示意图

![对接示意图](http://assets.processon.com/chart_image/5c1c5704e4b0b71ee503e019.png?_=1581323179918)

## 对接交易页面前端

### 对接需注入的 Cookie (注意cookie域)

- 用户token:     _authorization
- 当前语言:       _lang (zh_CN,en_US,zh_TW,.....)
- 法币币种:      _currency (CNY,USD,EUR,JPY,GBP,KRW,......)

### pc,h5对接步骤

1. 在进入合约云页面之前先用对接好的接口拿到合约云系统的token,
2. 拿到上一步的token及使用合适的语言和法币币种共3个参数，注入到合约云域名下（例：对接方域名www.cloud.com,则需要注入域为.cloud.com），然后在跳转交易页前将token代入url(http://futures.cloud.com) 
3. 国际化默认使用中文，可通过cookie注入参数切换语言，locale可选值包含中文，英文，中文繁体，依次为zh_CN， en_US， zh_TW
4. 法币规则同步骤3

### android,ios通过webview嵌入合约云

> 对于ios,ws的url要和主域名一致（ex:主域名ccfox.com,那么ws的url应该为xxx.ccfox.com）

> 合约云生产页面 https://mcloud.ccfox.com

1. 先在APP登录好，得到token
2. 把所需的cookie注入到webview
3. 使用jsBridge交互，交互细节如下，需要原生端和网页端调试约定事件
    - login  (登陆)
    - h5_href 需要跳转的二级页面（ex:从交易页面到历史委托），参数：h5路径(ex:/records)，在上层打开一个新的webView
    - h5_back 从二级页面返回交易页面，关闭上层webView(ex:从行情详情页面返回交        易页面),参数(null || string),有参数需要将参数通过 backToTrade 事件发送给h5
    - transfer (划转)
    - 每次进入h5（首次进入或者从原生其他地方返回再进入，ex:划转完，回来交易页),向h5发送 backToH5  事件，用来拉取数据

    **步骤3具体功能事件列表**

    | 按钮                     | 事件名   | 参数                                                         |
    | ------------------------ | -------- | ------------------------------------------------------------ |
    | 资产划转                 | transfer | undefined                                                    |
    | 资金记录                 | h5_href  | 需要将参数拼接在baseUrl后面打开新的 webView，以下 h5_href 同理，/contract/capitalRecord?contractId=1000000 |
    | 爆仓记录                 | h5_href  | /contract/burstHistory?contractId=1000000                    |
    | 合约资料                 | h5_href  | /contract/deliveryHistory?contractId=1000000                 |
    | 保证金账户               | h5_href  | /contract/bondAccount?contractId=1000000                     |
    | 盈亏历史                 | h5_href  | /contract/PnLHistory?contractId=1000000                      |
    | 选择合约                 | h5_href  | /contract/headerList                                         |
    | 行情页面kline            | h5_href  | /quotes/details?id=1000000                                   |
    | 登录                     | login    | undefined                                                    |
    | 二级页面返回按钮         | h5_back  | underfined                                                   |
    | 行情页面底部买入卖出按钮 | h5_back  | 需要将参数通过 backToTrade 事件发送给h5                      |
    | 每次进入h5               | backToH5 | 需要向h5发送事件 backToH5                                    |

## API接口

- 测试环境地址 https://apitest.ccfox.com/
- 生产环境地址 https://api.ccfox.com/

## 签名

### 说明
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

### 申请创建 API Key

通过crm系统获取B端 API Key

API Key 包括以下两部分

* `Access Key` API 访问密钥
* `Secret Key` 签名认证加密所使用的密钥

### 签名步骤

规范要计算签名的请求 因为使用 SHA256 进行签名计算时，使用不同内容计算得到的结果会完全不同。所以在进行签名计算前，请先对请求进行规范化处理。（GET和POST请求不同）
例：资产查询(GET)
`GET https://xxx.io/api/v1/broker/queryAsset?filter={applId：应用ID（默认为2）  queryUserId：用户ID  currencyId：币种ID}`

#### 签名demo

1. [node.js](https://github.com/ccfoxexchange/ccfox-cloud-api/blob/master/node.js)
2. [python](https://github.com/ccfoxexchange/ccfox-cloud-api/blob/master/code.py)
3. [java](https://github.com/ccfoxexchange/ccfox_api/tree/master/java/)

## 公共接口

币种接口： https://apitest.ccfox.com/future/queryCommonInfo

### 基本信息

**Path：** /future/queryCommonInfo

**Method：** GET

### 请求参数

### 返回数据

| 名称                     | 类型      | 是否必须 | 默认值 | 备注                                                     | 其他信息          |
| ------------------------ | --------- | -------- | ------ | -------------------------------------------------------- | ----------------- |
| currencyList             | object [] | 非必须   |        | 币种list                                                 | item 类型: object |
| ├─ currencyId            | number    | 必须     |        | 币种id                                                   |                   |
| ├─ symbol                | string    | 必须     |        | 币种名称                                                 |                   |
| ├─ displayPrecision      | number    | 必须     |        | 页面显示位数                                             |                   |
| contractList             | object [] | 非必须   |        | 期货合约list                                             | item 类型: object |
| ├─ varietyId             | number    | 必须     |        | 品种ID                                                   |                   |
| ├─ applId                | number    | 必须     |        | 1:现货，2：期货                                          |                   |
| ├─ symbol                | string    | 必须     |        | 品种名称                                                 |                   |
| ├─ priceTick             | number    | 必须     |        | 最小报价单位                                             |                   |
| ├─ lotSize               | number    | 必须     |        | 最小交易单位                                             |                   |
| ├─ takerFeeRatio         | number    | 必须     |        | Taker手续费率                                            |                   |
| ├─ makerFeeRatio         | number    | 必须     |        | Maker手续费率                                            |                   |
| ├─ limitMaxLevel         | number    | 必须     |        | 限价委托最大成交档位                                     |                   |
| ├─ marketMaxLevel        | number    | 必须     |        | 市价委托最大成交档位                                     |                   |
| ├─ maxNumOrders          | number    | 必须     |        | 用户最大挂单笔数                                         |                   |
| ├─ priceLimitRate        | number    | 必须     |        | 涨跌停率                                                 |                   |
| ├─ commodityId           | number    | 必须     |        | 商品币种ID                                               |                   |
| ├─ currencyId            | number    | 必须     |        | 货币币种ID                                               |                   |
| ├─ contractType          | number    | 必须     |        | 合约类型，1定期，2永续                                   |                   |
| ├─ deliveryType          | number    | 必须     |        | 交割类型，1现金交割，2实物交割                           |                   |
| ├─ deliveryPeriod        | number    | 必须     |        | 交割周期，1日2周3月                                      |                   |
| ├─ contractSide          | number    | 必须     |        | 合约方向，1正向，2反向                                   |                   |
| ├─ contractUnit          | number    | 必须     |        | 合约单位                                                 |                   |
| ├─ posiLimit             | number    | 必须     |        | 持仓限额                                                 |                   |
| ├─ orderLimit            | number    | 必须     |        | 委托限额                                                 |                   |
| ├─ impactMarginNotional  | number    | 必须     |        | 保证金影响额                                             |                   |
| ├─ fairBasisInterval     | number    | 必须     |        | 结算价基差计算间隔，单位秒                               |                   |
| ├─ clearPriceInterval    | number    | 必须     |        | 结算价计算间隔，单位秒                                   |                   |
| ├─ deliveryPriceInterval | number    | 必须     |        | 交割价计算间隔                                           |                   |
| ├─ minMaintainRate       | number    | 必须     |        | 最小维持保证金率                                         |                   |
| ├─ createTime            | number    | 必须     |        | 创建时间                                                 |                   |
| ├─ enabled               | number    | 必须     |        | 是否启用                                                 |                   |
| ├─ contract_status       | number    | 必须     |        | 1集合竞价，2连续交易，3交易暂停，4已摘牌，5未上市'       |                   |
| ├─ futureContractList    | object [] | 必须     |        |                                                          | item 类型: object |
| ├─ contractId            | number    | 必须     |        | 合约Id                                                   |                   |
| ├─ applId                | number    | 必须     |        | 应用标识                                                 |                   |
| ├─ symbol                | string    | 必须     |        | 合约名称                                                 |                   |
| ├─ priceTick             | number    | 必须     |        | 最小报价单位                                             |                   |
| ├─ lotSize               | number    | 必须     |        | 最小交易量单位                                           |                   |
| ├─ takerFeeRatio         | number    | 必须     |        | Taker手续费率                                            |                   |
| ├─ makerFeeRatio         | number    | 必须     |        | Maker手续费率                                            |                   |
| ├─ limitMaxLevel         | number    | 必须     |        | 限价委托最大成交档位                                     |                   |
| ├─ marketMaxLevel        | number    | 必须     |        | 市价委托最大成交档位                                     |                   |
| ├─ maxNumOrders          | number    | 必须     |        | 用户最大挂单笔数                                         |                   |
| ├─ priceLimitRate        | number    | 必须     |        | 涨跌停率                                                 |                   |
| ├─ commodityId           | number    | 必须     |        | 商品币种ID                                               |                   |
| ├─ currencyId            | number    | 必须     |        | 货币币种ID                                               |                   |
| ├─ contractStatus        | number    | 必须     |        | 交易对状态:1集合竞价,2连续交易,3交易暂停,4已摘牌,5未上市 |                   |
| ├─ listPrice             | number    | 必须     |        | 挂牌价格                                                 |                   |
| ├─ listTime              | number    | 必须     |        | 上市时间                                                 |                   |
| ├─ createTime            | number    | 必须     |        | 创建时间                                                 |                   |
| ├─ contractType          | number    | 必须     |        | 合约类型，1定期，2永续                                   |                   |
| ├─ deliveryType          | number    | 必须     |        | 交割类型，1现金交割，2实物交割                           |                   |
| ├─ deliveryPeriod        | number    | 必须     |        | 交割周期，0永续1日2周3月                                 |                   |
| ├─ contractSide          | number    | 必须     |        | 合约方向，1正向，2反向                                   |                   |
| ├─ contractUnit          | number    | 必须     |        | 合约单位                                                 |                   |
| ├─ lastTradeTime         | number    | 必须     |        | 最后交易时间                                             |                   |
| ├─ deliveryTime          | number    | 必须     |        | 最后交割时间                                             |                   |
| ├─ posiLimit             | number    | 必须     |        | 持仓限额                                                 |                   |
| ├─ orderLimit            | number    | 必须     |        | 委托限额                                                 |                   |
| ├─ impactMarginNotional  | number    | 必须     |        | 保证金影响额                                             |                   |
| ├─ minMaintainRate       | number    | 必须     |        | 最小维持保证金率                                         |                   |
| ├─ fairBasisInterval     | number    | 必须     |        | 结算价基差计算间隔                                       |                   |
| ├─ clearPriceInterval    | number    | 必须     |        | 结算价计算间隔                                           |                   |
| ├─ deliveryPriceInterval | number    | 必须     |        | 交割价计算间隔                                           |                   |
| ├─ varietyId             | number    | 必须     |        | 品种ID，标的ID                                           |                   |



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
| ├─ expires_in    | string | 必须     |        | 有效时间：毫秒为单位            |          |
| ├─ scope         | string | 必须     |        |                                |          |
| ├─ userId        | number | 必须     |        |    用户id                       |          |

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


## 查询子用户手续费



### 基本信息

**Path：** /api/v1/broker/queryDayFees

**Method：** GET

**接口描述：**

### 请求参数

**Headers**

**Query**

| 参数名称 | 是否必须 | 示例                                            | 备注                                                         |
| -------- | -------- | ----------------------------------------------- | ------------------------------------------------------------ |
| filter   | 是       | filter=%7B%22currencyId%22%3A7%2C%22statDate%22%3A%2220200109%22%7D | 值为URLEcode编码， 编码后用大写，如：%3a 需要转换成 %3A,解码值为：{"currencyId":7,"statDate":"20200109"},参数如下所示：currencyId(必传   货币ID),statDate(必传   查询日期，如：20200109),pageNum(非必 当前页，默认：1),pageSize(非必  页条数，默认：1000，大于1000时取1000)|

### 返回数据

| 名称             | 类型   | 是否必须 | 默认值 | 备注                                                         | 其他信息 |
| ---------------- | ------ | -------- | ------ | ------------------------------------------------------------ | -------- |
| code             | number | 必须     |        |                                                              |          |
| msg              | string | 必须     |        |                                                              |          |
| data             | object | 必须     |        |                                                              |          |
| ├─pageNum       | number | 必须     |        | 当前页                                                     |          |
| ├─pageSize | number | 必须     |        | 页条数|          |
| ├─total | number | 必须     |        | 总记录条数|          |
| ├─pages | number | 必须     |        | 页数|          |
| ├─list | object | 必须     |        | 数据|          |
| ├──userId | number | 必须     |        | 用户ID|          |
| ├──totalFee | number | 必须   |        | 累计手续费|          |


## 查询子用户盈亏



### 基本信息

**Path：** /api/v1/broker/queryDayProfits

**Method：** GET

**接口描述：**

### 请求参数

**Headers**

**Query**

| 参数名称 | 是否必须 | 示例                                            | 备注                                                         |
| -------- | -------- | ----------------------------------------------- | ------------------------------------------------------------ |
| filter   | 是       | filter=%7B%22currencyId%22%3A7%2C%22statDate%22%3A%2220200109%22%7D | 值为URLEcode编码， 编码后用大写，如：%3a 需要转换成 %3A,解码值为：{"currencyId":7,"statDate":"20200109"},参数如下所示：currencyId(必传   货币ID),statDate(必传   查询日期，如：20200109),pageNum(非必 当前页，默认：1),pageSize(非必  页条数，默认：1000，大于1000时取1000)|

### 返回数据

| 名称             | 类型   | 是否必须 | 默认值 | 备注                                                         | 其他信息 |
| ---------------- | ------ | -------- | ------ | ------------------------------------------------------------ | -------- |
| code             | number | 必须     |        |                                                              |          |
| msg              | string | 必须     |        |                                                              |          |
| data             | object | 必须     |        |                                                              |          |
| ├─pageNum       | number | 必须     |        | 当前页                                                     |          |
| ├─pageSize | number | 必须     |        | 页条数|          |
| ├─total | number | 必须     |        | 总记录条数|          |
| ├─pages | number | 必须     |        | 页数|          |
| ├─list | object | 必须     |        | 数据|          |
| ├──userId | number | 必须     |        | 用户ID|          |
| ├──totalProfit | number | 必须   |        | 用户当前总盈亏|          |


## 查询子用户成交金额



### 基本信息

**Path：** /api/v1/broker/queryDayMatchAmts

**Method：** GET

**接口描述：**

### 请求参数

**Headers**

**Query**

| 参数名称 | 是否必须 | 示例                                            | 备注                                                         |
| -------- | -------- | ----------------------------------------------- | ------------------------------------------------------------ |
| filter   | 是       | filter=%7B%22currencyId%22%3A7%2C%22statDate%22%3A%2220200109%22%7D | 值为URLEcode编码， 编码后用大写，如：%3a 需要转换成 %3A,解码值为：{"currencyId":7,"statDate":"20200109"},参数如下所示：currencyId(必传   货币ID),statDate(必传   查询日期，如：20200109),pageNum(非必 当前页，默认：1),pageSize(非必  页条数，默认：1000，大于1000时取1000)|

### 返回数据

| 名称             | 类型   | 是否必须 | 默认值 | 备注                                                         | 其他信息 |
| ---------------- | ------ | -------- | ------ | ------------------------------------------------------------ | -------- |
| code             | number | 必须     |        |                                                              |          |
| msg              | string | 必须     |        |                                                              |          |
| data             | object | 必须     |        |                                                              |          |
| ├─pageNum       | number | 必须     |        | 当前页                                                     |          |
| ├─pageSize | number | 必须     |        | 页条数|          |
| ├─total | number | 必须     |        | 总记录条数|          |
| ├─pages | number | 必须     |        | 页数|          |
| ├─list | object | 必须     |        | 数据|          |
| ├──userId | number | 必须     |        | 用户ID|          |
| ├──matchAmt | number | 必须   |        | 用户当前总成交额|          |


## 查询子用户合约资产快照



### 基本信息

**Path：** /api/v1/broker/queryAssetSnapshots

**Method：** GET

**接口描述：**

### 请求参数

**Headers**

**Query**

| 参数名称 | 是否必须 | 示例                                            | 备注                                                         |
| -------- | -------- | ----------------------------------------------- | ------------------------------------------------------------ |
| filter   | 是       | filter=%7b%22currencyId%22%3a1%7d | 值为URLEcode编码， 编码后用大写，如：%3a 需要转换成 %3A,解码值为：{"currencyId":1},参数如下所示：currencyId(非必传   货币ID),pageNum(非必 当前页，默认：1),pageSize(非必  页条数，默认：1000，大于1000时取1000)|

### 返回数据

| 名称             | 类型   | 是否必须 | 默认值 | 备注                                                         | 其他信息 |
| ---------------- | ------ | -------- | ------ | ------------------------------------------------------------ | -------- |
| code             | number | 必须     |        |                                                              |          |
| msg              | string | 必须     |        |                                                              |          |
| data             | object | 必须     |        |                                                              |          |
| ├─pageNum       | number | 必须     |        | 当前页                                                     |          |
| ├─pageSize | number | 必须     |        | 页条数|          |
| ├─total | number | 必须     |        | 总记录条数|          |
| ├─pages | number | 必须     |        | 页数|          |
| ├─list | object | 必须     |        | 数据|          |
| ├──userId | number | 必须     |        | 用户ID|          |
| ├──currencyId | number | 必须   |        | 货币ID|          |
| ├──totalMoney | number | 必须   |        | 总资产|          |
| ├──orderFrozenMoney | number | 必须   |        | 委托冻结资产|          |
| ├──closeProfitLoss | number | 必须   |        | 已实现盈亏|          |
| ├──startDate | number | 必须   |        | 开始时间，最近更新日期时间，每天23：45：00更新|          |
| ├──endDate | number | 必须   |        | 结束日期，9999-12-13|          |


​	      
## B端mq对接

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
      contract_id  合约ID, 0:全仓，>0:特定合约
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
  
    - [RocketMQ参考url](https://help.aliyun.com/product/29530.html?spm=a2c4g.11186623.6.540.6ff139c69dmBkV)
    - [java对接demo](https://github.com/ccfoxexchange/rocket-consumer-client)
    - [通知模板参考](https://github.com/ccfoxexchange/ccfox-cloud-api/blob/master/%E9%80%9A%E7%9F%A5%E6%A8%A1%E6%9D%BF.xlsx)
  




## 部署安排

部署在您的服务器上。
在服务器上需要安装docker(13以上) 

```

# 安装docker
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine

sudo yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2

sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo

sudo yum install docker-ce docker-ce-cli containerd.io

sudo systemctl start docker

sudo docker run hello-world

```

### pc页面的部署

* 使用您的一级域名下的二级域名, 例如 futures.xxx.com
* 拉取准备好的前端web页面的docker镜像
* 在服务器上配置nginx反向代理，指向服务器 8081端口
* 我们强烈推荐使用云服务上的slb来做nginx代理的方法，并通过后端2节点部署实现高可用

```
# 部署脚本示例，生产部署时候镜像要根据您的更换

docker pull registry.ap-southeast-1.aliyuncs.com/ccfox/hoo-web-pro:blue

docker run -itd -p 8081:80 --name apppro registry.ap-southeast-1.aliyuncs.com/ccfox/hoo-web-pro:blue

```

### 内嵌在app里的h5的部署
* 使用您的一级域名下的二级域名， 比如 mfutures.xxx.com . 
* 在服务器上配置nginx反向代理，指向服务器 8082端口
* 我们强烈推荐使用云服务上的slb来做nginx代理的方法，并通过后端2节点部署实现高可用

```
# 部署脚本示例，生产部署时候镜像要根据您的更换

docker pull registry.ap-southeast-1.aliyuncs.com/ccfox/ccfox-cloud-hoo-pro:blue

docker run -itd -p 8082:80 --name apppro registry.ap-southeast-1.aliyuncs.com/ccfox/ccfox-cloud-hoo-pro:blue

```

### **特别注意 api和websocket的代理**
* 我们提供的合约云前端代码，对api进行了前端代理，也就是说：所有restful的api请求，都会经过前端的nginx代理一层
* 为了防止出现跨域问题，请对 websocket的连接代理，保证您的 h5/pc 项目，连接的websocket的域名，和h5/pc，属于同一个 一级域名。 配置websocket的nginx配置如这[nginx.conf](/nginx-demo-ws.conf)：
    > 配置nginx转发时，请修改转发机器的本地hosts，将futurews.ccfox.com 解析到ccfox的源站接入点上。源站接入点ip和白名单，请找ccfox的网络管理员进行配置。

* ios的webview容器wkwebview，会有很严重的跨域问题，所以上面两步必须做。
* 另外，请确认前端代码中有如下[配置](/js_config_ws.png)（如果没有请添加）：
    ```
    options: {
      jsonp: false,
      transports: ['websocket']
    }
    ```

## Q&A

    1.  Q: 转账接口的api是否有白名单可以限制?
        A: 生产都要加白名单的，调试期见放开，上线的时候加白名单

    2.  Q: 前端都使用的是合约云页面，例如web首次调用xxx接口获取好用户的accesstoken给到前端，保存下来，后续过期问题，包括保证app的token也不过期，对xxx来说这里如何对接
        A: 一旦过期，需要跳到XXX登录页面重新登录，然后再回到交易页面

    3.  Q: mcloud.ccfox.com能否单独运行在浏览器中
        A: 这个项目必须配合 app 使用，单独浏览器事件没有落地的地方，所以没有反馈；点击功能按钮后 js 会发事件出去  app接住做处理 再交互下一步

    4.  母账户能否交易
        出于方便对账的考虑，合约云的母账户 是不能用于交易的，我们会禁止交易权限。
    
    5.  Q: 是否支持接入点卡。点卡抵扣手续费的比例是否支持自定义设置
        A: 对接方的点卡/平台币抵扣，可以自行开发，我们提供手续费数据，对接方可以按照先收后反的方式处理。
    
    6.  Q：对接方的邀请返佣体系如何处理。
        A：整个的邀请返佣模块，都可以由对接方按照自己需求自行开发，我们提供每个用户的数据接口。
        
    7.  Q：如何修改模拟币种
        A：在前端项目的.env,.env.test里面配置 VUE_APP_MOCK_SYMBOL=<币种Symbol>

