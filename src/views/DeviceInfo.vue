<template>
  <div class="device-info">
    <div class="device-info__fields">
      <span class="device-info__name" v-if="!anySettingIsTrue">{{ deviceInfo.name }}</span>
      <DeviceField
        label="Latitude"
        :value="deviceInfo.latitude"
        :showComponent="settings.showLatitude"
      />
      <DeviceField
        label="Longitude"
        :value="deviceInfo.longitude"
        :showComponent="settings.showLongitude"
      />
      <DeviceField
        label="Factory ID"
        :value="deviceInfo.factory_id"
        :showComponent="settings.showFactoryId"
      />
      <DeviceField
        label="Status"
        :value="deviceInfo.drive_status"
        :showComponent="settings.showDriveStatus"
      />
      <DeviceField label="State" :value="deviceInfo.state" :showComponent="settings.showState" />
      <DeviceField label="Name" :value="deviceInfo.name" :showComponent="settings.showName" />
      <DeviceField label="Make" :value="deviceInfo.make" :showComponent="settings.showMake" />
      <DeviceField label="Model" :value="deviceInfo.model" :showComponent="settings.showModel" />
      <DeviceField label="Online" :value="deviceInfo.online" :showComponent="settings.showOnline" />
    </div>
    <div class="device__map">
      <GoogleMapLoader :lat="googleMapLat" :lng="googleMapLng" :values="visibleFields" />
    </div>
  </div>
</template>

<script>
import DeviceField from '@/components/DeviceField.vue'
import GoogleMapLoader from '@/components/GoogleMapLoader.vue'

export default {
  props: ['deviceId', 'settings', 'deviceInfo'],
  components: {
    DeviceField,
    GoogleMapLoader,
  },
  data() {
    return {
      googleMapLat: 0,
      googleMapLng: 0,
      visibleFields: {},
    }
  },
  watch: {
    deviceId: 'loadDeviceInfo',
    deviceInfo: 'loadDeviceInfo',
  },
  computed: {
    anySettingIsTrue() {
      return Object.values(this.settings).some((value) => value === true)
    },
  },
  methods: {
    async loadDeviceInfo() {
      if (!this.settings || Object.keys(this.settings).length === 0) {
        await new Promise((resolve) => setTimeout(resolve, 100)) // Wait for settings to load
        return this.loadDeviceInfo() // Recurse until settings are available
      }

      // Dynamically build the visible fields based on the settings
      Object.entries(this.deviceInfo).forEach(([key, value]) => {
        const visibilityKey = `show${key
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('')}`

        if (this.settings[visibilityKey]) {
          this.visibleFields[key] = value
        }
      })

      // Update map coordinates
      this.googleMapLat = this.deviceInfo.latitude
      this.googleMapLng = this.deviceInfo.longitude
    },
    capitalize(str) {
      return str.replace(/^\w/, (c) => c.toUpperCase())
    },
  },
}
</script>

<style>
.device__map {
  display: flex;
  justify-content: center;
  margin: 30px 0 20px 0;
}

.device-info__name {
  grid-column: span 3;
  justify-self: center;
  font-family: 'cabinetgrotesk';
  font-weight: bold;
  background: linear-gradient(90deg, #002e6d, #1ba6ff); /* Gradient colors */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; /* Makes the text itself transparent */
  text-fill-color: transparent;
}

.device-info {
  justify-content: center;
}

.device-info__fields {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 1rem 2rem;
  width: 100%;
  background-color: white;
  border-radius: 20px;
}
@media screen and (min-width: 391px) and (max-width: 1024px) {
  .device-info__fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
