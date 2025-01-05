<script>
export default {
  props: {
    label: String,
    value: {
      // Prop to accept initial value from parent
      type: Boolean,
      default: false, // Default value if not provided
    },
  },

  computed: {
    checked: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('update:checked', newValue) // Emit the updated value to the parent
      },
    },
  },
  methods: {
    updateValue() {
      this.checked = event.target.checked
    },
  },
}
</script>

<template>
  <div class="switch__container">
    <p class="switch__container-label">{{ label }}</p>
    <div class="switch__toogle">
      <label className="switch">
        <input type="checkbox" v-model="checked" class="switch__box" @change="updateValue" />
        <span
          class="switch__slider"
          :class="[checked ? 'switch__slider-on' : 'switch__slider-off']"
        ></span>
        <p class="switch__temp-off" :class="[checked ? 'switch__inactive' : 'switch__active']">
          OFF
        </p>
        <p class="switch__temp-on" :class="[checked ? 'switch__active' : 'switch__inactive']">ON</p>
      </label>
    </div>
  </div>
</template>

<style>
.switch__container {
  display: flex;
  border: 2px solid #002e6d;
}

.switch__container-label {
  width: 50%;
  font-family: 'cabinetgrotesk';
  background: linear-gradient(45deg, #002e6d, #1ba6ff); /* Gradient background */

  padding: 12px;
  color: white;
}
.switch {
  display: flex;
  position: relative;
  width: 80px;
  height: 28px;
  align-items: center;
  cursor: pointer;
}

.switch__toogle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
}

.switch__box {
  border-radius: 25px;
  border: 2px solid #1ba6ff;
  width: 80px;
  height: 28px;
  appearance: none;
}

.switch__slider {
  border-radius: 20px;
  width: 40px;
  height: 28px;
  background-color: #002e6d;
  color: white;
  text-align: center;
  position: absolute;
  transition: left 0.5s ease-in-out;
}

.switch__slider-on {
  left: 39px;
}

.switch__slider-off {
  left: 1px;
}

.switch__temp-on {
  position: absolute;
  text-align: center;
  right: 10px;
}
.switch__temp-off {
  position: absolute;
  text-align: center;
  left: 10px;
}

p {
  transition: color 1s ease-in-out;
}

.switch__active {
  color: white;
}

.switch__inactive {
  color: black;
}
@media screen and (min-width: 800px) and (max-width: 932px) {
  .switch__container-label {
    align-content: center;
  }
  .switch__container {
    height: 75px;
  }
}
</style>
