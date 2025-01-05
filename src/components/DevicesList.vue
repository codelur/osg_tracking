<script setup>
//import arrayOfDevices from '../utils/constants.js'
defineEmits(['selectedDevice'])
</script>

<script>
export default {
  data() {
    return {
      selectedDevice: '',
      isDivVisible: false, // Controls visibility for mobile
      isMobile: false,
    }
  },
  props: {
    arrayOfDevices: {
      type: Array,
      required: true,
    },
  },
  methods: {
    selectDevice(deviceId) {
      this.selectedDevice = deviceId
      this.toggleDiv()
      this.$emit('selectedDevice', deviceId)
    },
    toggleDiv() {
      this.isDivVisible = !this.isDivVisible
    },
    checkScreenSize() {
      this.isMobile = window.innerWidth <= 430 // Define your breakpoint for mobile
    },
  },
  mounted() {
    this.checkScreenSize()
    window.addEventListener('resize', this.checkScreenSize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScreenSize)
  },
}
</script>

<template>
  <div class="devices__menu" v-if="isMobile">
    <button class="modern-button" @click="toggleDiv">
      <span class="devices__menu-button-text">DEVICES &darr;</span>
    </button>
  </div>
  <div class="devices__container" v-if="isDivVisible || !isMobile">
    <ul class="devices__list">
      <li v-for="item in arrayOfDevices" :key="item.device_id">
        <button class="devices__list-button" @click="selectDevice(item.device_id)">
          <div class="red-circle" v-if="!item.online"></div>
          <div class="green-circle" v-if="item.online"></div>
          <span>{{ item.display_name }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style>
.devices__container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.devices__list {
  list-style-type: none;
  padding: 20px;
}
.red-circle {
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  margin-left: 10px;
  align-self: center; /* Space between button and circle */
}
.green-circle {
  width: 10px;
  height: 10px;
  background-color: green;
  border-radius: 50%;
  margin-left: 10px;
  align-self: center; /* Space between button and circle */
}
.devices__list-button {
  display: flex;
  justify-content: space-between;
  padding: 12px 25px;
  font-size: 16px;
  font-weight: 600;
  width: 250px;
  text-align: center;
  text-decoration: none;
  border: 0px solid transparent;
  border-radius: 30px; /* Rounded corners */
  background: linear-gradient(45deg, #002e6d, #1ba6ff); /* Gradient background */
  color: white;
  font-family: cabinetgrotesk, sans-serif;

  transition: all 0.3s ease-in-out; /* Smooth transition */
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.5); /* Subtle shadow */
  margin-bottom: 20px;
  cursor: pointer;
}

.devices__menu-button {
  padding: 6px 12px;
  font-size: 16px;
  font-weight: 600;
  width: 180px;
  border: 0px solid transparent;
  border-radius: 10px;
  background: white;
  color: #1ba6ff;
}

.modern-button {
  background: linear-gradient(90deg, #007bff, #0056b3);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
}

.modern-button:hover {
  background: linear-gradient(90deg, #0056b3, #007bff);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.modern-button:active {
  transform: scale(0.9);
}

.devices__list-button:hover {
  background: linear-gradient(45deg, #1ba6ff, #002e6d); /* Reversed gradient on hover */
  transform: translateY(-4px); /* Slight lift effect */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* Darker shadow on hover */
}

/* Focus effect */
.devices__list-button:focus {
  outline: none;
  border: 3px solid transparent;
  border-color: #feb47b; /* Highlight border on focus */
}

.devices__menu-button-text {
  font-family: cabinetgrotesk, sans-serif;
  font-size: 20px;
  font-weight: 500;
}
.device-info__fields {
  min-width: 50vw;
}
@media screen and (max-width: 430px) {
  .device-info__fields {
    display: none;
  }
  .devices__menu {
    display: flex;
    justify-content: center;
  }
}
</style>
