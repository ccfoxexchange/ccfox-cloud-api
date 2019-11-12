只需一周，拥有专属于您的合约交易功能

您只需要对接少量接口，即可快速接入，仅需1周！ 

欢迎联系我们：


微信：13066998399  （加好友请注明 b端合作）
邮箱：sonic@ccfox.com

## 对接建议

> 请在我们测试环境：https://webtest.ccfox.com/ 注册一个账户，并提供username, 我们会把该账户配置成为券商账户，并虚冲资产，供你们调试

1. 先用h5或pc在浏览器调试，具体参考[github文档](https://github.com/ccfoxexchange/ccfox-cloud-api/blob/master/api-cn.md)
2. h5和pc各自的登录页面跳转和划转页面是你们这边的地址，比如https://www.dobiexchange.com/login
3. 如果h5需要内嵌app,可以沟通具体注入的js来达到通信跳转页面(以下代码为示例，不可用)

- Andorid webview 与html交互

  ```javascript
  function testClick() {
         //发送消息给java代码
         var data = '发送消息给java代码全局接收';
         //第一个参数要发送的数据 第二个参数js在被回调后具体执行方法，responseData为java层回传数据
         window.WebViewJavascriptBridge.send(
             data
             , function(responseData) {
                bridgeLog('来自Java的回传数据： ' +responseData);
             }
         );
     }
  ```

- ios webview与html交互

  ```javascript
  
  function jsSendMessage() {
      window.webkit.messageHandlers.jsFunc.postMessage("js发送消息给Swift");
  }
  ```

- React Native 与html交互

  ```javascript
  window.ReactNativeWebView.postMessage('backToMine');
  ```

  


