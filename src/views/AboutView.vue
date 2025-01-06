<script setup>
import { ref, onMounted } from 'vue'
import DevicesList from '@/components/DevicesList.vue'
import DeviceInfo from './DeviceInfo.vue'

import { getDeviceList, getSettings } from '@/services/services'
// Reactive variables
const arrayOfDevices = ref([])
const deviceValues = ref({})
const render = ref(false)
const selectedDevice = ref('')
const settings = ref({
  showLatitude: false,
  showLongitude: false,
  showFactoryId: false,
  showState: false,
  showName: false,
  showMake: false,
  showModel: false,
  showDriveStatus: false,
  showOnline: false,
})

const selectDevice = (deviceId) => {
  selectedDevice.value = deviceId
  getDeviceInfo()
}

const getDeviceInfo = () => {
  const device = arrayOfDevices.value.find((item) => item.device_id === selectedDevice.value)
  const currentDeviceValues = {
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

  // Direct comparison instead of JSON stringify
  if (
    Object.keys(deviceValues.value).length === 0 ||
    !Object.entries(currentDeviceValues).every(([key, value]) => deviceValues.value[key] === value)
  ) {
    deviceValues.value = { ...currentDeviceValues }
  }

  return currentDeviceValues
}

const loadDevicesList = async () => {
  try {
    const data = await getDeviceList()
    arrayOfDevices.value = data.result_list
  } catch (error) {
    console.error('Error loading device list:', error)
  }
}

const loadingSettings = async () => {
  try {
    settings.value = await getSettings()
  } catch (error) {
    console.error('Error loading settings:', error)
  } finally {
    render.value = true
  }
}

onMounted(async () => {
  await loadDevicesList()
  await loadingSettings()
  selectedDevice.value = arrayOfDevices.value[0]?.device_id || ''
  getDeviceInfo()
})
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
  background-image: url('../assets/gps.png');
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
