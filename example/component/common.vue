<template>
  <div class="common">
    Common component ({{ date }})
    <nav>
      <router-link to="/home">Home</router-link>
      <router-link to="/welcome">Welcome</router-link>
      <router-link to="/import">Import</router-link>
      <a href="https://github.com/kianfang/vue-import#readme">About</a>
    </nav>
  </div>
</template>

<script>
import { getLocaleString } from '../util';

export default {
  data() {
    return {
      date: getLocaleString(),
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

