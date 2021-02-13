<template>
  <div
    role="listbox"
    :id="'sel' + _uid"
    class="dropdown"
    :style="responsive ? 'width: 100%' : 'width: ' + width + 'px'"
  >
    <div
      @click="toggleContent()"
      class="toggler"
      :class="{ active: showContent }"
    >
      <div class="title">{{ dropdowned.title }}</div>
      <div class="chevron" :class="{ up: showContent }">
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
    <div
      :ref="'selCont'"
      :id="'sel-cont' + _uid"
      class="content"
      :class="{ invisible: !showContent }"
      :style="responsive ? 'width: ' + width + 'px' : ''"
    >
      <div
        role="option"
        @click="dropdown(option)"
        v-for="option in options"
        :key="option.value"
        class="option"
        :class="{ dropdowned: value == option.value }"
      >
        {{ option.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dropdown",
  props: {
    value: {
      required: true
    },
    options: {
      required: true,
      type: Array
    },
    responsive: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  watch: {
    isElVisible() {
      this.updateWidth();
    }
  },
  created() {
    if (this.value) {
      for (let option in this.options) {
        if (this.options[option].value == this.value) {
          this.dropdowned = this.options[option];
        }
      }
    } else {
      this.dropdowned = this.options[0];
    }
  },
  mounted() {
    this.updateWidth();
  },
  updated() {
    if (
      this.offsetTop != document.getElementById("sel" + this._uid).offsetTop
    ) {
      this.offsetTop = document.getElementById("sel" + this._uid).offsetTop;
    }
  },
  data() {
    return {
      showContent: false,
      dropdowned: " ",
      width: 0,
      offsetTop: -1
    };
  },
  computed: {
    isElVisible() {
      return this.offsetTop;
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
    dropdown(val) {
      this.dropdowned = val;
      this.hide();
      this.$emit("input", val);
    },
    updateWidth() {
      if (!this.responsive) {
        this.width = document.getElementById(
          "sel-cont" + this._uid
        ).offsetWidth;
      } else {
        this.width = document.getElementById("sel" + this._uid).offsetWidth;
      }
    },
    listener(e) {
      if (!e.target.closest("#sel" + this._uid)) {
        this.hide();
      }
    }
  }
};
</script>

<style scoped>
.dropdown {
    display: inline-block;
    position: relative;
}

.dropdown .toggler {
    background-color: white;
    padding: 10px 20px;
    border: 1px solid rgba(204, 203, 200, 0.5);
    border-radius: 5px;
    font-size: 16px;
    transition: border-color .3s ease-in-out;
}

.dropdown .toggler:hover {
    cursor: pointer;
    border-color: #cccbc8;
}

.dropdown .toggler.active {
    border-color: #cccbc8;
}

.dropdown .toggler .title {
    display: inline-block;
    text-overflow: ellipsis;
    font-weight: bold;
}

.dropdown .toggler .chevron {
    margin-left: 10px;
    float: right;
    transition: 0.2s ease-in-out;
}

.dropdown .toggler .chevron.up {
    transform: rotate(-180deg);
}

.dropdown .content {
    position: absolute;
    margin-top: 10px;
    background: white;
    box-shadow: 0px 0px 30px rgba(129, 127, 126, 0.16);
    border-radius: 5px;
    white-space: nowrap;
    z-index: 10;
}

.dropdown .content.invisible {
    visibility: hidden;
}

.dropdown .content .option {
    padding: 10px 20px;
    padding-right: 60px;
    font-size: 16px;
}

.dropdown .content .option:first-child {
    border-radius: 5px 5px 0 0;
}

.dropdown .content .option:last-child {
    border-radius: 0 0 5px 5px;
}

.dropdown .content .option:hover {
    background-color: #E6F1F9;
    cursor: pointer;
}

.dropdown .content .option.dropdowned {
    font-weight: bold;
}

@media (max-width: 991.8px) {
    .payment-period .toggler {
        font-size: 14px;
    }
    .dropdown .content .option {
        font-size: 14px;
    }
}

@media (max-width: 400px) {
    .dropdown .toggler {
        font-size: 12px;
    }
    .dropdown .content .option {
        font-size: 12px;
    }
}

</style>
