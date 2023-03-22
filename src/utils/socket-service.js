import { Notification } from 'element-ui'

export default class SocketService {
    static instance = null
    static get Instance() {
      if (!this.instance) {
        this.instance = new SocketService()
      }
      return this.instance
    }

    ws = null
    // 存储回调函数
    callBackMapping = {}
    // 标识是否连接成功
    connected = false
    // 记录重试的次数
    sendRetryCount = 0
    // 记录重新连接的次数
    reconnectCount = 0
    connect() {
      if (!window.WebSocket) {
        return console.log('您的浏览器不支持websocket!')
      }
      if (this.connected) {
        return console.log('已链接')
      }
      this.ws = new WebSocket('ws://localhost:8080/WebSocket')
      // 连接服务端成功事件
      this.ws.onopen = () => {
        console.log('连接服务端成功')
        this.connected = true
        this.reconnectCount = 0
      }
      // 连接服务端失败事件
      this.ws.onerror = () => {
        console.log('连接服务端错误')
        this.connected = false
        this.reconnectCount++
        setTimeout(() => {
          this.connect()
        }, this.reconnectCount * 500)
      }
      // 连接服务端关闭事件
      this.ws.onclose = () => {
        this.connected = false
        console.log('连接服务端失败')
      }
      // 从服务端获取数据
      this.ws.onmessage = (msg) => {
        console.log('从服务端获取到的数据' + msg.data)
        const data = JSON.parse(event.data)
        Notification({
          title: data.title,
          message: data.message,
          type: data.type,
          duration: data.duration,
          dangerouslyUseHTMLString: data.dangerouslyUseHTMLString,
          onClick() {
            // getOrder(data.orderId).then((res) => {
            //   this.orderDetail = res.data
            //   this.orderDetail.orderJsonBody = JSON.parse(
            //     this.orderDetail.orderJsonBody
            //   )
            //   this.dialogVisible = true
            //   console.log(this.dialogVisible)
            // })
          }
        })
      }
      // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常
      this.ws.onbeforeunload = () => {
        this.closeWebSocket
      }
    }
    // 回调函数的注册
    registerCallBack(socketType, callBack) {
      this.callBackMapping[socketType] = callBack
    }
    // 取消回调函数
    unRegisterCallBack(socketType) {
      this.callBackMapping[socketType] = null
    }
    send(data) {
      if (this.connected) {
        this.sendRetryCount = 0
        this.ws.send(JSON.stringify(data))
      } else {
        this.sendRetryCount++
        setTimeout(() => {
          this.ws.send(JSON.stringify(data))
        }, this.sendRetryCount * 500)
      }
    }
    closeWebSocket() {
      console.log('关闭WebSocket')
      this.ws.close()
    }
}
