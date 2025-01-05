<script setup>
//import arrayOfDevices from '../utils/constants.js'
import DeviceInfo from './DeviceInfo.vue'
import DevicesList from '@/components/DevicesList.vue'
</script>

<script>
export default {
  components: {
    DevicesList,
    DeviceInfo,
  },
  data() {
    return {
      arrayOfDevices: [],
      deviceValues: {},
      render: false,
      selectedLat: 34.069333051247725,
      selectedLng: -118.28044832395406,
      selectedDevice: '',
      settings: {
        showLatitude: false,
        showLongitude: false,
        showFactoryId: false,
        showState: false,
        showName: false,
        showMake: false,
        showModel: false,
        showDriveStatus: false,
        showOnline: false,
      },
    }
  },

  methods: {
    selectDevice(deviceId) {
      this.selectedDevice = deviceId
      this.getDeviceInfo()
      // Handle the value received from the child
    },

    getDeviceInfo() {
      let device = this.arrayOfDevices.find((item) => {
        return item.device_id === this.selectedDevice
      })

      let currentDeviceValues = {
        latitude: device.latest_device_point.lat,
        longitude: device.latest_device_point.lng,
        factory_id: device.factory_id,
        drive_status: device.latest_device_point.device_state.drive_status,
        state: device.active_state,
        name: device.display_name,
        make: device.make,
        model: device.model,
        online: device.online ? 'ON' : 'OFF',
      }

      if (JSON.stringify(this.deviceValues) !== JSON.stringify(currentDeviceValues)) {
        this.deviceValues = { ...currentDeviceValues }
      }

      return currentDeviceValues
    },

    async getDeviceList() {
      try {
        const response = await this.$axios.get(
          'https://app-625361629214.us-central1.run.app/api/getDevicesInfo',
        )
        this.arrayOfDevices = response.data.result_list

        console.log('Loaded device Info:', this.deviceValues)
      } catch (error) {
        console.error('Error loading settings:', error)
      }
    },
    async loadSettings() {
      try {
        const response = await this.$axios.get(
          'https://app-625361629214.us-central1.run.app/api/getsettings',
        )
        this.settings = response.data

        console.log('Loaded settings:', this.settings)
      } catch (error) {
        console.error('Error loading settings:', error)
      } finally {
        this.render = true // Set loading to false after settings are loaded
      }
    },
  },
  async mounted() {
    await this.getDeviceList()
    await this.loadSettings()
    this.selectedDevice = this.arrayOfDevices[0].device_id
    this.getDeviceInfo()
    /*setInterval(async () => {
      await this.getDeviceList()
      this.getDeviceInfo()
      console.log('Getting Device Info')
    }, 6000)*/
  },
}
</script>

<template>
  <div class="about">
    <DevicesList @selectedDevice="selectDevice" :arrayOfDevices="arrayOfDevices" />
    <DeviceInfo :deviceId="selectedDevice" :settings="settings" :deviceInfo="deviceValues" />
  </div>
</template>

<style>
.about {
  display: flex;
  grid-column: span 2;
  background-color: white;
  justify-content: space-evenly;
  padding: 20px 10px;
  background-image: url('../assets/unnamed.png');
  background-size: cover;
}
@media screen and (max-width: 430px) {
  .about {
    margin-top: 18px;
    flex-direction: column;
  }
}
@media (min-width: 1024px) {
  .usersettings {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .map {
    height: 200px;
  }
  .usersettings__button {
    margin-top: 20px;
  }
}
@media screen and (min-width: 431px) and (max-width: 932px) {
  .about {
    margin-top: 12px;
  }
}
@media screen and (min-width: 1024px) {
  .about {
    margin-top: 175px;
  }
}
</style>
