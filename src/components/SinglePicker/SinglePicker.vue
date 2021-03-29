<template>
  <div
    aria-haspopup="listbox"
    :aria-labelledby="'title' + _uid"
    :id="'sel' + _uid"
    class="single-picker"
    :class="{ responsive: responsive }"
    :style="cssProps"
  >
    <div
      @click="toggleContent()"
      class="toggler"
      :class="{
        active: showContent,
        selected: selected.value !== undefined
      }"
    >
      <div :id="'title' + _uid" class="title">
        {{ selected.value !== undefined ? selected.title : label }}
      </div>
      <div
        v-if="selected.value && !required"
        @click.stop="clear()"
        class="cross"
      >
        <svg
          width="9"
          height="9"
          viewBox="0 0 9 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 8L8 1"
            stroke="#979290"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M8 8L1 1"
            stroke="#979290"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <div v-else class="chevron" :class="{ up: showContent }">
        <svg
          width="13"
          height="8"
          viewBox="0 0 13 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L6.5 6.5L12 1"
            stroke="#979290"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
    <transition name="slide-fade">
      <div
        role="listbox"
        v-show="showContent"
        :ref="'selCont'"
        :id="'sel-cont' + _uid"
        class="content"
        :class="{ right: overflowRight }"
      >
        <div class="label">{{ label }}</div>
        <div
          role="option"
          @click="select(option)"
          v-for="option in options"
          :key="option.value"
          class="option"
          :class="{ selected: value == option.value }"
        >
          <em v-if="option.icon" class="icon" :class="option.icon"></em>
          <div class="title">{{ option.title }}</div>
          <div class="right">
            <div class="radio-outter">
              <div class="radio-inner"></div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "single-picker",
  props: {
    defaultValue: {
      required: false
    },
    required: {
      required: false,
      default: false,
      type: Boolean
    },
    responsive: {
      required: false,
      default: false,
      type: Boolean
    },
    value: {
      required: true
    },
    options: {
      required: true,
      type: Array
    },
    label: {
      type: String,
      required: true
    },
    color: {
      required: false,
      type: Object,
      default: () => {
        return {
          main: "#076B9C",
          secoundary: "#e6f1f9"
        };
      },
      validator: val => {
        return val.main && val.secoundary;
      }
    }
  },
  watch: {
    value(val) {
      this.selectByValue(val);
    }
  },
  mounted() {
    if (this.value) {
      this.selectByValue(this.value);
    } else {
      if (this.required) {
        this.selectByValue(this.defaultVal);
      } else {
        this.select({ value: undefined });
      }
    }
  },
  updated() {
    if (
      document.getElementById("sel" + this._uid) &&
      this.offsetTop != document.getElementById("sel" + this._uid).offsetTop
    ) {
      this.offsetTop = document.getElementById("sel" + this._uid).offsetTop;
    }
  },
  data() {
    return {
      showContent: false,
      selected: {},
      width: 0,
      offsetTop: -1
    };
  },
  computed: {
    isElVisible() {
      return this.offsetTop;
    },
    cssProps() {
      return {
        "--single-picker-main-color": this.color.main,
        "--single-picker-sec-color": this.color.secoundary
      };
    },
    defaultVal() {
      return this.defaultValue || this.options[0].value;
    },
    overflowRight() {
      return document.getElementById("#sel" + this._uid)
        ? document.getElementById("#sel" + this._uid).getBoundingClientRect()
            .right > window.innerWidth
        : undefined;
    }
  },
  methods: {
    toggleContent() {
      if (this.showContent) {
        this.hide();
      } else {
        this.show();
      }
    },
    hide() {
      this.showContent = false;
      document.removeEventListener("click", this.listener, false);
    },
    show() {
      this.showContent = true;
      this.$refs.selCont.focus();
      document.addEventListener("click", this.listener, false);
    },
    select(val) {
      this.selected = val;
      this.hide();
      this.$emit("input", val.value);
    },
    listener(e) {
      if (!e.target.closest("#sel" + this._uid)) {
        this.hide();
      }
    },
    clear() {
      if (this.required) {
        this.selectByValue(this.defaultVal);
      } else {
        this.select({ value: undefined });
      }
    },
    selectByValue(val) {
      for (let option in this.options) {
        if (this.options[option].value == val) {
          this.select(this.options[option]);
        }
      }
    }
  }
};
</script>

<style lang="sass" scoped>
$main-color: var(--single-picker-main-color)
$sec-color: var(--single-picker-sec-color)

.single-picker
  display: inline-block
  position: relative
  max-width: 100%

  &.responsive
    width: 100%

    .toggler .title
      width: 100%

  .toggler
    display: flex
    background-color: white
    padding: 10px 20px
    border: 2px solid rgba(204, 203, 200, 0.5)
    border-radius: 5px
    font-size: 16px
    transition: border-color .3s ease-in-out
    max-width: 100%

    &:hover
      cursor: pointer
      border-color: rgba(204, 203, 200, 1)

    &.active
      border-color: rgba(204, 203, 200, 1)

    &.selected
      border-color: $main-color

      .title
        color: $main-color

      .chevron
        svg
          path
            stroke: $main-color

    .icon
      margin-rigth: 10px

    .title
      display: inline-block
      font-weight: bold
      color: #979290
      max-width: 100%
      text-overflow: ellipsis
      white-space: nowrap
      overflow-x: hidden

    .chevron
      margin-left: 10px
      float: right
      transition: 0.2s ease-in-out

      svg
        vertical-align: baseline

      &.up
        transform: rotate(-180deg)

    .cross
      margin-left: 10px
      float: right

      svg
        vertical-align: baseline

        path
          stroke: $main-color



  .content
    position: absolute
    margin-top: 10px
    background: white
    box-shadow: 0px 0px 30px rgba(129, 127, 126, 0.16)
    border-radius: 5px
    white-space: nowrap
    z-index: 1
    min-width: 200px
    max-width: 400px

    &.right
      right: 0

    &.invisible
      visibility: hidden

    .label
      padding: 5px 20px
      font-size: 14px
      font-weight: bold
      color: #979290
      width: calc(100% - 40px)
      max-width: calc(100% - 40px)
      overflow: hidden
      text-overflow: ellipsis

    .option
      display: flex
      padding: 10px 20px
      font-size: 16px
      font-weight: bold
      color: #312F2E

      &:first-child
        border-radius: 5px 5px 0 0

      &:last-child
        border-radius: 0 0 5px 5px

      &:hover
        background-color:  $sec-color
        cursor: pointer

      &.selected
        background-color: $sec-color
        color: $main-color

        .right
          .radio-outter
            border-color: $main-color

          .radio-inner
            background-color: $main-color

      .title
        width: 100%
        max-width: 100%
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap

      .right
        width: 32px

        .radio-outter
          height: 14px
          width: 14px
          margin-left: 10px
          border: 1px solid #979290
          border-radius: 20px
          padding: 3px

          .radio-inner
            height: 14px
            width: 14px
            border-radius: 12px

.slide-fade-enter-active
  transition: all .3s ease

.slide-fade-leave-active
  transition: all .3s ease

.slide-fade-enter, .slide-fade-leave-to
  transform: translateY(-30px)
  opacity: 0
</style>
