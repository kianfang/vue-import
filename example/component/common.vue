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

