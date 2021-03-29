<template>
  <div>
    <single-picker 
      :required="required"
      :responsive="responsive"
      :color="color"
      v-model="value" 
      :options="options"
      :default-value="defaultValue"
      :label="label"></single-picker>
    <div class="customize-section">
      <p><strong>Customize</strong></p>
      <div class="customize-item">
        <label for="responsive">Responsive</label>
        <input type="checkbox" v-model="responsive" name="responsive" id="responsive">
      </div>
      <div class="customize-item">
        <label for="required">Required</label>
        <input type="checkbox" v-model="required" name="required" id="required">
      </div>
      <div class="customize-item">
        <label for="color_main">Main color</label>
        <input type="color" v-model="color.main" name="color_main" id="color_main">
      </div>
      <div class="customize-item">
        <label for="color_secoundary">Secoundary color</label>
        <input type="color" v-model="color.secoundary" name="color_secoundary" id="color_secoundary">
      </div>
      <div class="customize-item">
        <label for="label">Label</label>
        <input type="text" v-model="label" id="Label">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      required: false,
      responsive: false,
      value: undefined,
      defaultValue: 1,
      color: {
        main: "#076B9C",
        secoundary: "#E6F1F9"
      },   
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
        ],
        label: "Single Picker Demo"
    }
  }
} 
</script>

<style lang="sass" scoped>
  .customize-section

    .customize-item
      margin: 10px 0
</style>