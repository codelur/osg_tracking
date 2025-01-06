import axios from 'axios'

const API_BASE_URL = 'https://app-625361629214.us-central1.run.app/api'

const getDeviceList = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getDevicesInfo`)
    return response.data
  } catch (error) {
    console.error('Error loading device list:', error)
  }
}

const getSettings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getsettings`)
    return response.data
  } catch (error) {
    console.error('Error loading settings:', error)
  }
}

const getGoogleMapsScript = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/map`)
    return response.data
  } catch (error) {
    console.error('Error loading settings:', error)
  }
}

const saveSettings = async (settings) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/savesettings`, settings)
    return response.data
  } catch (error) {
    console.error('Error saving settings:', error)
    throw error
  }
}

export { getDeviceList, getSettings, getGoogleMapsScript, saveSettings }
