<template>
  <h1>Demo component</h1>
  <p>Hello ({{ user }})</p>
</template>

<script>
export default {
  data() {
    return {
      user: 'kian',
    }
  },
}
</script>

<style>
h1 {
  color: blue;
}
</style>
<style>
p {
  color: green;
}
</style>

