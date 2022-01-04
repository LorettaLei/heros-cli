# community-h5

### 一、技术栈

| 组件名称         | 版本号  | 用途               |
| ---------------- | ------- | ------------------ |
| node             | 14.5.4  | web 打包工具       |
| @vue/cli-service | 4.5.0   | vue 脚手架打包工具 |
| vue              | 3.0.0   | 前端基于 MVVN 的   |
| typescript       | 4.1.5   | 编译开发语言       |
| sass             | 1.26.5  | css 预编译语言     |
| vuex             | 4.0.0-0 | 消息状态管理       |
| vue-router       | 4.0.0-0 | 路由管理           |
| axios            | 0.21.4  | 接口请求组件       |

### 二、前端模块结构和说明

```
├─src
│   ├─api               -- 接口目录
│   ├─assets            -- 静态资源
│   ├─components        -- 公用组件
│   ├─model             -- 数据模型层，封装数据的接口类型
│   ├─router            -- 路由文件夹
│   │  └─index.ts       -- 入口
│   ├─store             -- 消息状态管理注入
│   │  └─index.ts       -- 入口
│   ├─style             -- 公用样式文件
│   │  ├─module         -- 公用样式库
│   │  ├─index.scss     -- 入口
│   │  └─reset.scss     -- 样式初始化
│   ├─utils             -- 工具
│   │  ├─axios.ts       -- 请求拦截器封装
│   │  ├─hybrid.ts      -- 混合开发联调API
│   │  ├─index.ts       -- 工具入口
│   │  ├─requests.ts    -- 请求函数封装
│   │  ├─vconsole.ts    -- 前端控制台工具
│   │  └─tool.ts        -- 公用工具类
│   └─views             -- web页面
│       └─Goods.vue     -- 商品详情页
└─public                -- 静态资源
    └─img               -- 静态图片
        └─icons         -- 网站图标
```

## 三、项目运行方式

```
1. 项目依赖安装
yarn install
npm install
```

2. 启动开发环境

```
yarn serve
npm run serve
```

3. 打包-测试环境

```
yarn build-dev
npm run build-dev
```

4. 打包-生产环境

```
yarn build-prod
npm run build-prod
```

### 四、代码提交

代码提交会自动执行提交检查，如检查不通过可执行如下命令查看报错位置

```
yarn lint
npm run lint
```

### 五、环境地址

- 接口文档
  http://47.74.235.101:29007/swagger-ui.html#/
- git 地址
  http://10.0.10.25/frontend/community-h5
- 测试环境地址
  http://47.74.235.101:8022/community/

## 关注点

- 结构设计
- 基础样式设置
- 通用基础组件准备
- 数据类型设置
- 通用 tools 工具函数准备
- 防二次点击
- 判空/兜底处理
- 缓存利用
- 图片压缩
- 打包优化

## App 混合开发 API

用户昵称、个性标签、用户性别跟 token 一样，一起从 sendPageSetting 传过来
app 内部页面跳转方法:

```
├─src/utils/hybrid.ts
    ├─hybridHandler(fun:string, data?: AnyData)
    |   └─fun:
    |       ├─getRequestData：商品详情页重新拉取数据之后同步给app原生
    |       |     ├─gameId：游戏id
    |       |     ├─id：商品id
    |       |     ├─isDiscount：是否打折
    |       |     ├─isOnSell：是否在售中
    |       |     ├─isSellOut：是否售空
    |       |     ├─isUserLimit：是否限购
    |       |     ├─name：商品名称
    |       |     ├─offShelveTime：下架时间
    |       |     ├─price：商品价格
    |       |     ├─saleTime：开售时间
    |       |     ├─saleTimeStr：开售时间字符串
    |       |     ├─userCount：用户已购买数量
    |       |     └─userLimit：每人限购数量
    |       ├─jumpTolLoginPage：跳转登录
    |       ├─jumpToPostDetail：跳转帖子详情
    |       |     └─postId：帖子id
    |       └─appShareData：初始化app原生分享信息
    |             ├─title：分享标题
    |             ├─desc：分享描述
    |             ├─imgUrl：分享小图标
    |             └─link：分享链接
    └─hybridJump(page: string, data?: { key: value })
        ├─page:
        |   ├─home 摸鱼社首页: { bottomPosition: 0}
        |   ├─game 某个游戏主页: { gamePosition: gameId, bottomPosition: 0 }
        |   ├─topic 某个话题主页: { topicId: topicId }
        |   ├─forum 某个特定版区: { forumPosition: forumId, bottomPosition: 0 }
        |   ├─experience 经验页面:
        |   ├─gold 金币页面:
        |   ├─medal 勋章页面:
        |   ├─role 绑定角色页面:
        |   └─mine 我的页面: { bottomPosition: 3 }
        |   └─web h5跳转: { url: '', title: '', needToken: 1/0 }
        └─data
            ├─bottomPosition appTabbar的序号，从0开始
            ├─gamePosition 具体游戏序号，从0开始，bottomPosition需要传0
            ├─topicId 具体话题id的话题主页
            └─forumPosition 具体版区序号，从0开始，bottomPosition需要传0
```
