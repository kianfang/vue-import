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

