<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
      </div>
      <app-main />
    </div>
    <OrderDialog
      :dialog-visible="dialogVisible"
      :order-detail="orderDetail"
      @close="closeDialog"
      @doRefresh="doRefreshAndClose"
    />
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import OrderDialog from '@/components/OrderDialog'
// import { getOrder } from '@/api/orderList'
export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    OrderDialog
  },
  mixins: [ResizeMixin],
  data() {
    return {
      // 标识是否连接成功
      connected: false,
      // 记录重试的次数
      sendRetryCount: 0,
      // 记录重新连接的次数
      reconnectCount: 0,
      dialogVisible: false,
      orderDetail: {}
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  mounted() {
    this.createWebsocket()
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    createWebsocket() {
      if (this.connected === true) {
        return
      }
      this.websocket = new WebSocket(
        `ws://localhost:8080/BuffetOrder/WebSocket`
      )
      // 连接发生错误的回调方法
      this.websocket.onerror = this.websocketOnerror
      // 连接成功建立的回调方法
      this.websocket.onopen = this.websocketOnopen
      // 接收到消息的回调方法
      this.websocket.onmessage = this.websocketOnmessage
      // 连接关闭的回调方法
      this.websocket.onclose = this.websocketOnclose
      // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      this.websocket.onbeforeunload = this.websocketOnbeforeunload
    },
    // 连接发生错误的回调方法
    websocketOnerror() {
      console.log('连接发生错误的回调方法')
    },
    // 连接成功建立的回调方法
    websocketOnopen() {
      console.log('连接服务端成功')
      this.connected = true
      this.reconnectCount = 0
    },
    // 接收到消息的回调方法
    websocketOnmessage(event) {
      const data = JSON.parse(event.data)
      console.log(data)
      this.$notify({
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
    },
    // 连接关闭的回调方法
    websocketOnclose() {
      console.log('连接服务端失败')
      this.connected = false
      this.reconnectCount++
      setTimeout(() => {
        this.createWebsocket()
      }, this.reconnectCount * 500)
    },
    // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常
    websocketOnbeforeunload() {
      this.closeWebSocket()
    },
    // 关闭WebSocket连接
    closeWebSocket() {
      this.websocket.close()
    },
    doRefreshAndClose() {
      this.closeDialog()
    },
    closeDialog() {
      this.orderDetail = {}
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
