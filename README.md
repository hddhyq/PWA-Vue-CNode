# vue-cnode-pwa

使用vue全家桶 + vuetify 的pwa化的。

[项目线上地址](https://brokenbones.xyz)

[PWA简介](https://lavas.baidu.com/pwa/architecture/the-app-shell-model)

## 项目目录
```sh
.
├── api      # 网站所调取CNode的api      
│   └── index.js
├── App.vue　# 主文件入口
├── base　　　# 基础组件
│   ├── Loading　# 加载组件
│   │   ├── loading.gif
│   │   └── Loading.vue
│   ├── LoginDialog.vue  # 登录验证弹窗组件
│   ├── MessageList.vue  # 个人消息的列表子组件
│   ├── NavDrawer.vue    # 侧边导航栏的内容子组件
│   ├── ReplyList.vue    # 主题组件的回复功能子组件
│   ├── TopicText.vue    # 主题列表的方块主题文字的子组件
│   └── UserInfoList.vue # 个人中心的消息列表子组件
├── common # 公共
│   ├── fonts # 字体文件，主要是MaterialIcons谷歌图标的字体文件
│   │   ├── MaterialIcons-Regular.ttf
│   │   ├── MaterialIcons-Regular.woff
│   │   └── MaterialIcons-Regular.woff2
│   ├── image # 公共图像，包括图像背景和lazyload的懒加载图片
│   │   ├── backImg.jpg
│   │   └── default.jpg
│   ├── js 　　# 一些js文件
│   │   ├── cache.js
│   │   ├── mixin.js
│   │   └── utils.js
│   └── stylus # 一些样式文件
│       ├── github-markdown.css # 主题详情的markdown样式
│       ├── icon.styl
│       ├── index.styl
│       └── reset.styl
├── components # 页面组件
│   ├── About.vue        # 关于界面组件
│   ├── ListView.vue     # 主题列表界面组件
│   ├── Login.vue        # 登录界面组件
│   ├── MyMessage.vue    # 我的消息界面组件
│   ├── NewTopic.vue     # 新建主题界面组件
│   ├── TopicDetail.vue  # 主题详情界面
│   └── UserInfo.vue     # 用户个人界面
├── main.js # 主js
├── router  # 路由配置
│   └── index.js
└── store   # vuex配置
    ├── actions.js
    ├── getters.js
    ├── index.js
    ├── mutations.js
    ├── mutation-types.js
    └── state.js
```
具体开发过程中遇到的难题及总结，请看[blogs](https://hddhyq.github.io/2018/02/21/Vue-Cnode-Pwa-%E8%BF%87%E7%A8%8B%E4%B8%AD%E7%9A%84%E5%B0%8F%E5%9D%91/)。

safari由于vuetify存在样式上的一些bug。推荐安卓机上的浏览器chrome或自带浏览器运行。

本地运行
```sh
npm install
npm run dev
```