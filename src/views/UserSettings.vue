<script setup>
import ToggleSwitch from '@/components/ToggleSwitch.vue'
import { getSettings, saveSettings } from '@/services/services'
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
        this.settings = await getSettings()

        console.log('Loaded settings:', this.settings)
      } catch (error) {
        console.error('Error loading settings:', error)
      } finally {
        this.render = true // Set loading to false after settings are loaded
      }
    },

    formatLabel(key) {
      return key
        .replace(/^show/, '') // Remove "show" prefix
        .replace(/([A-Z])/g, ' $1') // Add spaces before capital letters
        .trim() // Remove leading/trailing spaces
    },

    saveSettingsHandler() {
      // Send a POST request to the server to save settings
      try {
        saveSettings(JSON.stringify(this.settings))
        console.log('Settings saved successfully')
        const confirmation = document.querySelector('.usersettings__confirmation')
        confirmation.classList.add('saved')
        setTimeout(() => {
          confirmation.classList.remove('saved')
        }, 2000)
      } catch (error) {
        console.error('Error saving settings:', error)
      }
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
      <div class="usersettings__container">
        <div v-for="(value, key, index) in settings" :key="key" class="usersettings__toggles">
          <ToggleSwitch :label="formatLabel(key)" :value="value" v-model:checked="settings[key]" />
        </div>
      </div>
      <div class="usersettings__submit">
        <button class="usersettings__button" @click="saveSettingsHandler">Save Settings</button>
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
  margin: 60px 0 60px 0;
  max-width: 1500px;
}

.usersettings__toggles {
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
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 28px 0;
  }
  .usersettings__toggles {
    width: 100%;
  }
  .usersettings__title {
    margin: 0;
    font-size: 16px;
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
