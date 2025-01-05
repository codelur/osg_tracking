<script setup>
import ToggleSwitch from '@/components/ToggleSwitch.vue'
</script>

<script>
export default {
  components: {
    ToggleSwitch,
  },
  data() {
    return {
      render: false,
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

    saveSettings() {
      // Send a POST request to the server to save settings
      this.$axios
        .post(
          'https://app-625361629214.us-central1.run.app/api/savesettings',
          JSON.stringify({
            showLatitude: this.settings.showLatitude,
            showLongitude: this.settings.showLongitude,
            showFactoryId: this.settings.showFactoryId,
            showState: this.settings.showState,
            showName: this.settings.showName,
            showMake: this.settings.showMake,
            showModel: this.settings.showModel,
            showDriveStatus: this.settings.showDriveStatus,
            showOnline: this.settings.showOnline,
          }),
        )

        .then((response) => {
          console.log('Settings saved:', response)
          const confirmation = document.querySelector('.usersettings__confirmation')
          confirmation.classList.add('saved')
          setTimeout(() => {
            confirmation.classList.remove('saved')
          }, 2000)
        })
        .catch((error) => {
          console.error('Error saving settings:', error)
        })
    },
  },
  mounted() {
    this.loadSettings()
  },
}
</script>
<template>
  <div class="usersettings">
    <div class="usersettings__setup">
      <h2 class="usersettings__title">Configure the settings for display:</h2>
      <div class="usersettings__container" v-if="render">
        <div class="usersettings__toggles" v-if="render">
          <ToggleSwitch
            label="Latitude"
            :value="settings.showLatitude"
            v-model:checked="settings.showLatitude"
          />
          <ToggleSwitch
            label="Longitude"
            :value="settings.showLongitude"
            v-model:checked="settings.showLongitude"
          />
          <ToggleSwitch
            label="Factory ID"
            :value="settings.showFactoryId"
            v-model:checked="settings.showFactoryId"
          />
        </div>
        <div class="usersettings__toggles" v-if="render">
          <ToggleSwitch
            label="Drive Status"
            :value="settings.showDriveStatus"
            v-model:checked="settings.showDriveStatus"
          />
          <ToggleSwitch
            label="State"
            :value="settings.showState"
            v-model:checked="settings.showState"
          />
          <ToggleSwitch
            label="Name"
            :value="settings.showName"
            v-model:checked="settings.showName"
          />
        </div>
        <div class="usersettings__toggles" v-if="render">
          <ToggleSwitch
            label="Make"
            :value="settings.showMake"
            v-model:checked="settings.showMake"
          />
          <ToggleSwitch
            label="Model"
            :value="settings.showModel"
            v-model:checked="settings.showModel"
          />
          <ToggleSwitch
            label="Online"
            :value="settings.showOnline"
            v-model:checked="settings.showOnline"
          />
        </div>
      </div>
      <div class="usersettings__submit">
        <button class="usersettings__button" @click="saveSettings">Save Settings</button>
        <span class="usersettings__confirmation">✔</span>
      </div>
    </div>
  </div>
</template>

<style>
.usersettings {
  grid-column: span 2;
  background-color: white;
  padding: 36px; /* Gradient background */
  margin-top: 12px;
}

.usersettings__setup {
  width: 100%;
  background-color: #fff;
  padding: 36px;
}

.usersettings__title {
  color: black;
  margin: 0 30px 30px 0;
}

.usersettings__container {
  width: 100%;
  display: flex;
  gap: 50px;
  margin: 60px 0 60px 0;
}

.usersettings__toggles {
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.usersettings__button {
  display: inline-block;
  padding: 12px 25px;
  font-size: 16px;
  font-weight: 600;
  width: 250px;
  text-align: center;
  text-decoration: none;
  font-family: 'cabinetgrotesk';
  border: 0px solid transparent;
  border-radius: 30px; /* Rounded corners */
  background: linear-gradient(45deg, #002e6d, #1ba6ff); /* Gradient background */
  color: white;
  transition: all 0.3s ease-in-out; /* Smooth transition */
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.5); /* Subtle shadow */
  margin-right: 20px;
  cursor: pointer;
}

.usersettings__confirmation {
  opacity: 0;
  color: #1ba6ff;
  transition:
    opacity 1s ease,
    color 1s ease;
}

.saved {
  opacity: 1;
  transition: opacity 1s ease;
}

.usersettings__button:hover {
  background: linear-gradient(45deg, #1ba6ff, #002e6d); /* Reversed gradient on hover */
}

.usersettings__submit {
  display: flex;
  justify-content: center;
  align-items: baseline;
}
@media screen and (max-width: 430px) {
  .usersettings {
    padding-top: 0;
    margin-top: 18px;
  }
  .usersettings__setup {
    padding: 12px;
  }
  .usersettings__container {
    flex-direction: column;
  }
  .usersettings__toggles {
    width: 100%;
  }
  .usersettings__title {
    margin: 0;
    font-size: 16px;
  }
  .usersettings__container {
    gap: 12px;
    margin: 28px 0;
  }
}
@media screen and (min-width: 391px) and (max-width: 1024px) {
  .switch__container-label {
    width: 60%;
  }
}
@media screen and (min-width: 1024px) {
  .usersettings {
    margin-top: 175px;
  }
}
</style>
