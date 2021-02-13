<template>
  <div>
    <dropdown v-model="value" :options="options"></dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: undefined,
      options: [
          {
            title: 'Option 1',
            value: 1
          },
          {
            title: 'Option 2',
            value: 2
          },
          {
            title: 'Option 3',
            value: 3
          }
        ]
    }
  }
}
</script>