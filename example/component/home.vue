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

