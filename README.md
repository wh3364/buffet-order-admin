# 不饿了自助点餐微信小程序

### 项目介绍

​	本系统采用前后端分离架构，前端主要使用Vue、Uni-App、Echarts等技术，后端使用SpringBoot、MyBatis、Redis、RabbitMQ、Minio等技术，以保证系统的高效性。

​       为了保证系统的安全性，采用JWT（JSON Web Token）对用户进行权限验证，采用SpringSecurity进行安全性的维护。

- 后端主要技术：springboot，mybatis，redis，rabbitmq
  地址：
  - Gitee： [BuffetOrderSpringboot(gitee.com)](https://gitee.com/fchgit/buffet-order-springboot)
  - GitHub：[BuffetOrderSpringboot(github.com)](https://github.com/wh3364/buffet-order-springboot)
- 微信小程序：uniapp
  地址：
  - Gitee：[BuffetOrderUniApp(gitee.com)](https://gitee.com/fchgit/buffet-order-uni-app)
  - GitHub：[BuffetOrderUniApp(github.com)](https://github.com/wh3364/buffet-order-uni-app)
- 管理员端：vue
  地址：
  - Gitee：[BuffetOrderAdmin(gitee.com)](https://gitee.com/fchgit/buffet-order-admin)
  - GitHub：[BuffetOrderAdmin(github.com)](https://github.com/wh3364/buffet-order-admin)

#### 效果图: 

##### 微信小程序:

<div align=center>
    <img src="https://gitee.com/fchgit/buffet-order-springboot/raw/master/%E5%9B%BE/%E6%95%88%E6%9E%9C%E5%9B%BE/wx-1.png" width="300"/>    <img src="https://gitee.com/fchgit/buffet-order-springboot/raw/master/%E5%9B%BE/%E6%95%88%E6%9E%9C%E5%9B%BE/wx-2.png" width="300"/>
</div>

<div align=center>
    <img src="https://gitee.com/fchgit/buffet-order-springboot/raw/master/%E5%9B%BE/%E6%95%88%E6%9E%9C%E5%9B%BE/wx-3.png" width="300"/>    <img src="https://gitee.com/fchgit/buffet-order-springboot/raw/master/%E5%9B%BE/%E6%95%88%E6%9E%9C%E5%9B%BE/wx-4.png" width="300"/>
</div>

<div align=center>
    <img src="https://gitee.com/fchgit/buffet-order-springboot/raw/master/%E5%9B%BE/%E6%95%88%E6%9E%9C%E5%9B%BE/wx-5.png" width="300"/>    <img src="https://gitee.com/fchgit/buffet-order-springboot/raw/master/%E5%9B%BE/%E6%95%88%E6%9E%9C%E5%9B%BE/wx-6.png" width="300"/>
</div>

##### 管理员端:

<div align=center>
    <img src="https://gitee.com/fchgit/buffet-order-springboot/raw/master/%E5%9B%BE/%E6%95%88%E6%9E%9C%E5%9B%BE/admin-1.png" width="600"/>
</div>

<div align=center>
    <img src="https://gitee.com/fchgit/buffet-order-springboot/raw/master/%E5%9B%BE/%E6%95%88%E6%9E%9C%E5%9B%BE/admin-2.png" width="600"/>
</div>

<div align=center>
    <img src="https://gitee.com/fchgit/buffet-order-springboot/raw/master/%E5%9B%BE/%E6%95%88%E6%9E%9C%E5%9B%BE/admin-3.png" width="600"/>
</div>

### 项目部署

1. 下载[Node.js 中文网 (nodejs.cn)](http://nodejs.cn/)并安装
2. 在项目根目录下(与src文件同级目录)打开cmd命令行
3. 在命令行输入`npm install`等待依赖下载
4. 下载完毕后输入`npm run dev`等待项目启动, 启动默认端口为9528(可在[vue.config.js](https://gitee.com/fchgit/buffet-order-admin/blob/master/vue.config.js)中修改)

### 特性/功能

- 待补充

### 项目结构

``` 
.
│  App.vue
│  main.js
│  permission.js
│  settings.js
│  
├─api
│      mealCate.js
│      mealFood.js
│      orderList.js
│      user.js
│      
├─assets
│  └─404_images
│          404.png
│          404_cloud.png
│          
├─components
│  ├─Breadcrumb
│  │      index.vue
│  │      
│  ├─Hamburger
│  │      index.vue
│  │      
│  ├─OrderCreateTiem
│  │      index.vue
│  │      
│  ├─OrderDialog
│  │      index.vue
│  │      
│  ├─OrderFinishCreateTiem
│  │      index.vue
│  │      
│  ├─OrderPage
│  │      index.vue
│  │      
│  └─SvgIcon
│          index.vue
│          
├─icons
│  │  index.js
│  │  svgo.yml
│  │  
│  └─svg
│           ...
│          
├─layout
│  │  index.vue
│  │  
│  ├─components
│  │  │  AppMain.vue
│  │  │  index.js
│  │  │  Navbar.vue
│  │  │  
│  │  └─Sidebar
│  │          FixiOSBug.js
│  │          index.vue
│  │          Item.vue
│  │          Link.vue
│  │          Logo.vue
│  │          SidebarItem.vue
│  │          
│  └─mixin
│          ResizeHandler.js
│          
├─router
│      index.js
│      
├─store
│  │  getters.js
│  │  index.js
│  │  
│  └─modules
│          app.js
│          orderTime.js
│          permission.js
│          settings.js
│          user.js
│          
├─styles
│      element-ui.scss
│      index.scss
│      mixin.scss
│      sidebar.scss
│      transition.scss
│      variables.scss
│      
├─utils
│      auth.js
│      get-page-title.js
│      index.js
│      request.js
│      socket-service.js
│      validate.js
│      
└─views
    │  404.vue
    │  
    ├─dashboard
    │      index.vue
    │      
    ├─finishOrder
    │  ├─table
    │  │      index.vue
    │  │      
    │  └─table1
    │          index.vue
    │          
    ├─login
    │      index.vue
    │      
    ├─meal
    │  ├─cate
    │  │  │  index.vue
    │  │  │  
    │  │  └─cateQuery
    │  │          cateUpdateDialog.vue
    │  │          index.vue
    │  │          
    │  └─food
    │      │  index.vue
    │      │  
    │      ├─foodAdd
    │      │      index.vue
    │      │      
    │      ├─foodDetail
    │      │      index.vue
    │      │      
    │      └─foodQuery
    │              foodDialog.vue
    │              index.vue
    │              
    └─unfinishOrder
        ├─table
        │      index.vue
        │      
        └─table1
                index.vue
```

### 注意事项
- 暂无
