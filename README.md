# vue-import

## CDN

源码导入:
```js
import vueImport from 'https://unpkg.com/vue-import/dist/vue-import.esm-browser.js';
```

压缩版：
```js
import vueImport from 'https://unpkg.com/vue-import/dist/vue-import.esm-browser.min.js';
```

## 示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>登录</title>
  <link rel="stylesheet" href="./index.css" />
  <script type="importmap">
    {
      "imports": {
        "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js",
        "vue-import": "https://unpkg.com/vue-import/dist/vue-import.esm-browser.js",
        "vue-router": "https://unpkg.com/vue-router/dist/vue-router.esm-browser.js",
        "@vue/devtools-api": "https://unpkg.com/@vue/devtools-api@6.4.5/lib/esm/index.js"
      }
    }
  </script>
</head>

<body>
  <div id="app" v-cloak>
    <my-component></my-component>
    <router-view></router-view>
  </div>
  <script type="module">
    import { createApp } from 'vue';
    import vueImport from 'vue-import';
    import { createRouter, createWebHashHistory } from 'vue-router';

    const routes = [
      { path: '/', redirect: '/welcome' },
      // 路由组件导入
      { 
        path: '/welcome',
        component: await vueImport('./welcome.vue'),
      }
    ];

    const router = createRouter({
      history: createWebHashHistory(),
      routes,
    });

    const app = createApp();
    // 自定义组件导入
    app.component('my-component', await vueImport('./common.vue'))

    app.use(router);
    app.mount('#app');
  </script>
</body>
</html>
```
