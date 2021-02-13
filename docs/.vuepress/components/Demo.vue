<template>
  <div class="demo">
    <component :is="componentName" />
  </div>
</template>

<script>
  export default {
    props: {
      componentName: { type: String, required: true }
    }
  }
</script>

<style scoped>
.demo {
  padding: 10px 0px;
}
</style>