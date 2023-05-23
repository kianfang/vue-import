# vue-import

[![NPM Version](https://img.shields.io/npm/v/vue-import.svg)](https://www.npmjs.com/package/vue-import)
[![Licence](https://img.shields.io/npm/l/vue-import.svg)](https://www.npmjs.com/package/vue-import)
[![Minified Size](https://img.shields.io/bundlephobia/min/vue-import)](https://www.npmjs.com/package/vue-import?file=/dist/vue-import.esm-browser.prod.js)
[![Build and Publish](https://github.com/kianfang/vue-import/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/kianfang/vue-import/actions/workflows/npm-publish.yml)

[English](./README.md) | 简体中文

在浏览器环境下导入vue组件，即[SFC](https://vuejs.org/guide/scaling-up/sfc.html) (*.vue) 文件。  
如果你不想维护`package.json`以及应用 `webpack`等打包工具，那么`vue-import`将能助你一臂之力。

## [CDN](https://www.jsdelivr.com)

ESM导入:

```js
import vueImport from 'https://cdn.jsdelivr.net/npm/vue-import/dist/vue-import.esm-browser.js';
```

压缩版:

```js
import vueImport from 'https://cdn.jsdelivr.net/npm/vue-import/dist/vue-import.esm-browser.prod.js';
```

或者

```js
import vueImport from 'https://cdn.jsdelivr.net/npm/vue-import';
```

## 使用说明

### 基础使用

```js
import { createApp } from 'https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.prod.js';
import vueImport from 'https://cdn.jsdelivr.net/npm/vue-import/dist/vue-import.esm-browser.prod.js';

const app = createApp();
app.component('my-component', await vueImport('./some/component.vue'));

app.mount('#app');
```

### 重写组件属性

这里使用`Promise`方式，你也可以使用`async/await`的方式

```js
import { createApp } from 'https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.prod.js';
import vueImport from 'https://cdn.jsdelivr.net/npm/vue-import';

const app = createApp();

vueImport('./some/component.vue', {
  function beforeMount() {
    console.log('beforeMount');
  },
  function mounted() {
    console.log('mounted');
  },
}).then((component) => {
  app.component('my-component', component);

  app.mount('#app');
});
```

## [示例](https://unpkg.com/vue-import/example/index.html)

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
        "vue": "https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.prod.js",
        "vue-import": "https://cdn.jsdelivr.net/npm/vue-import/dist/vue-import.esm-browser.js",
        "vue-router": "https://cdn.jsdelivr.net/npm/vue-router/dist/vue-router.esm-browser.js",
        "@vue/devtools-api": "https://cdn.jsdelivr.net/npm/@vue/devtools-api/lib/esm/index.js"
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
    import { createApp, defineAsyncComponent } from 'vue';
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
        component: defineAsyncComponent(() => vueImport('./component/home.vue')),
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
异步加载Home组件

```html
<template>
  <h1 class="title">{{ title }}</h1>
  <p>
    Home async component with router
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
支持多组 `<style></style>` 嵌入方式，组件卸载时，嵌入的样式也会卸载掉

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
