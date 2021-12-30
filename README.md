# heros-cli
自用前端开发脚手架
## 安装
```
npm install heros-cli -g
```
## 创建项目
```
heros create xxx
```
## PC
### 技术栈

```
| 依赖库 | 版本号 | 用途            |
|  ----  | ----  |---------------|
| node | 14.x | web打包工具       |
| webpack | 5.x | web打包工具       |
| vue  | 3.2+ | 前端基于mvvm核心开发库 |
| element-plus  | 1.2.0-beta.3 | ui库           |
| typescript  | 4.x | 编译开发语言        |
| less  | 4.x | 预编译css语言      |
| vuex  | 4.x  | 状态管理          |
| vue-router  | 4.x  | 路由管理          |
| axios  | 0.24  | 接口请求组件        |
| npm | 7.x | 依赖管理          |
| yarn | 1.22+ | 依赖管理（与npm二选一） |
```
### 项目结构

```
├─src
│   ├─api               -- api访问
│   ├─assets            -- 静态资源
│   │  ├─font           -- 公用字体
│   │  ├─ico            -- html标签图标
│   │  ├─icon           -- 公用iconflont
│   │  ├─images         -- 公用图片根目录
│   │  ├─my_plugin      -- 自定义插件
│   ├─components        -- 公用组件
│   ├─utils             -- 工具
│   │      ├─directive  -- 公用指令库
│   │      ├─tools      -- 公用工具类
│   │      ├─validator  -- 公用校验规则
│   │      └─variable   -- 公用变量
│   ├─hooks             -- 公用业务处理方法
│   ├─less              -- 公用less文件
│   ├─model             -- 公用类型管理
│   ├─router            -- 路由文件夹
│   │  └─index.ts       -- 入口
│   ├─store             -- 消息状态管理注入
│   │  └─index.ts       -- 入口
│   └─views             -- web页面
│     ├─Main.vue        -- 主页面
│     └─Login.vue       -- 登录页面
└─static                -- 静态资源根目录
    ├─lib               -- 第三方js库
```

## 移动端H5
### 技术栈
```
| 组件名称         | 版本号  | 用途               |
| ---------------- | ------- | ------------------ |
| node             | 14.x  | web 打包工具       |
| @vue/cli-service | 4.x   | vue 脚手架打包工具 |
| vue              | 3.x   | 前端基于 MVVN 的   |
| typescript       | 4.x   | 编译开发语言       |
| sass             | 1.x   | css 预编译语言     |
| vuex             | 4.x   | 消息状态管理       |
| vue-router       | 4.x   | 路由管理           |
| axios            | 0.24  | 接口请求组件       |
| swiper           | 6.x   | 轮播组件           |
```
### 项目结构

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

