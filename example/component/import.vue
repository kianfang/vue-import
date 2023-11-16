<template>
  <div class="import">
    <h1 class="title">Import</h1>
    <p>
      <code>import.meta.url</code>: <b>{{ url }}</b>
    </p>
    <p>
      <code>import.meta.resolve('./file')</code>: <b>{{ resolveFile }}</b>
    </p>
    <p>
      <code>import.meta.resolve('vue-import')</code>: <b>{{ module }}</b>
    </p>
    <p>
      <code>await import('../util').getYear()</code>: <b>{{ importYear }}</b>
    </p>
  </div>
</template>

<script>
const util = await import('../util');

export default {
  data() {
    return {
      url: import.meta.url,
      resolveFile: import.meta.resolve('./file'),
      module: import.meta.resolve('vue-import'),
      importYear: util.getYear(),
    }
  },
}
</script>

<style>
.title {
  color: orange;
}

.import code {
  color: gray;
}

</style>
