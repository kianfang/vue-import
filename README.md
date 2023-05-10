# vue-import

## CDN

ESM导入:

```js
import vueImport from 'https://unpkg.com/vue-import/dist/vue-import.esm-browser.js';
```

压缩版:

```js
import vueImport from 'https://unpkg.com/vue-import/dist/vue-import.esm-browser.prod.js';
```

## 示例

- `index.html`  

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>vue-import</title>
  <script type="importmap">
    {
      "imports": {
        "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js",
        "vue-import": "https://unpkg.com/vue-import/dist/vue-import.esm-browser.js",
        "vue-router": "https://unpkg.com/vue-router/dist/vue-router.esm-browser.js",
        "@vue/devtools-api": "https://unpkg.com/@vue/devtools-api/lib/esm/index.js"
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
    import { createRouter, createWebHashHistory } from 'vue-router';
    import vueImport from 'vue-import';

    const routes = [
      { path: '/', redirect: '/welcome' },
      // 路由组件导入
      { 
        path: '/welcome',
        component: await vueImport('./component/welcome.vue'),
      },
      { 
        path: '/home',
        component: await vueImport('./component/home.vue'),
      },
    ];

    const router = createRouter({
      history: createWebHashHistory(),
      routes,
    });

    const app = createApp();
    // 自定义组件导入
    app.component('my-component', await vueImport('./component/common.vue'))

    app.use(router);
    app.mount('#app');
  </script>
</body>
</html>
```

- `component/common.vue`  
支持 `<script></script>` 默认导出模块的加载

```html
<template>
  <div class="common">
    Common component ({{ date }})
    <nav>
      <router-link to="/home">Home</router-link>
      <router-link to="/welcome">Welcome</router-link>
      <a href="https://github.com/kianfang/vue-import#readme">About</a>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date().toLocaleString(),
    }
  },
}
</script>

<style>
.common {
  color: blue;
}
</style>
<style>
nav {
  display: flex;
  gap: 0 10px;
}
</style>


```

- `component/home.vue`  

```html
<template>
  <h1 class="title">{{ title }}</h1>
  <p>
    Welcome component with router
  </p>
</template>

<script>
export default {
  data() {
    return {
      title: 'Home',
    }
  },
}
</script>

<style>
.title {
  color: blue;
}
</style>
```

- `component/welcome.vue`  
支持多个 `<style></style>` 嵌入方式，组件卸载时，嵌入的样式也会卸载掉

```html
<template>
  <h1 class="title">Welcome</h1>
  <p>
    Welcome component with router
  </p>
</template>

<script>
export default {}
</script>

<style>
.title {
  color: green;
}
</style>
<style>
  p {
    color: gray;
  }
</style>
```
