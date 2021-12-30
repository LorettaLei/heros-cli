### 一、技术栈

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

### 二、前端模块结构和说明

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

### 三、项目运行方式

```
1. 项目依赖安装
npm install

2. 启动开发环境
npm run dev

3. 打包-测试环境
npm run build-dev
// source-map

4. 打包-生产环境
npm run build-prod
// 禁用console/debugger
```

### 四、代码提交
代码提交会自动执行提交检查，如检查不通过可执行如下命令查看报错位置
```
npm run eslint:fix
```

### 五、环境地址
+ 接口文档
+ git地址
+ 测试环境地址

### 风格备选
https://panjiachen.github.io/vue-element-admin/
http://blog.51weblove.com/344.html
