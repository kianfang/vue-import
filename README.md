# vue-import

[![NPM Version](https://img.shields.io/npm/v/vue-import.svg)](https://www.npmjs.com/package/vue-import)
[![Licence](https://img.shields.io/npm/l/vue-import.svg)](https://www.npmjs.com/package/vue-import)
[![Minified Size](https://img.shields.io/bundlephobia/min/vue-import)](https://www.npmjs.com/package/vue-import?file=/dist/vue-import.esm-browser.prod.js)
[![Build and Publish](https://github.com/kianfang/vue-import/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/kianfang/vue-import/actions/workflows/npm-publish.yml)

English | [简体中文](./README-zh_CN.md)

Import Vue components in a browser environment, i.e. [SFC](https://vuejs.org/guide/scaling-up/sfc.html) (*.vue) file.
If you don't want to maintain `package.json` and apply packaging tools such as `webpack`, then `vue-import` will help you.

## [CDN](https://www.jsdelivr.com)

ESM import:

```js
import vueImport from 'https://cdn.jsdelivr.net/npm/vue-import/dist/vue-import.esm-browser.js';
```

Minified:

```js
import vueImport from 'https://cdn.jsdelivr.net/npm/vue-import/dist/vue-import.esm-browser.prod.js';
```

OR

```js
import vueImport from 'https://cdn.jsdelivr.net/npm/vue-import';
```

## Instructions

### Basic Usage

```js
import { createApp } from 'https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.prod.js';
import vueImport from 'https://cdn.jsdelivr.net/npm/vue-import/dist/vue-import.esm-browser.prod.js';

const app = createApp();
app.component('my-component', await vueImport('./some/component.vue'));

app.mount('#app');
```

### Override Component Props

The `Promise` method is used, and you can also use the `async/await` method.

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

## [Examples](https://unpkg.com/vue-import/example/index.html)

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
      // route component import
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
    // custom component import
    app.component('my-component', await vueImport('./component/common.vue'))

    app.use(router);
    app.mount('#app');
  </script>
</body>
</html>
```

- `component/common.vue`  
Support loading of `<script></script>` default export module

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
Load the Home component asynchronously

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
Support multiple groups of `<style></style>` embedding methods，when the component is uninstalled, the embedded styles will also be uninstalled.

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
