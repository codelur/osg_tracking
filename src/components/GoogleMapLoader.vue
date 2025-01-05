<template>
  <div id="map" :style="{ width: '100%', height: '400px' }"></div>
</template>

<script setup>
import { onMounted, watch, defineProps } from 'vue'

import axios from 'axios'

// Define component props
const props = defineProps({
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  values: {
    type: Object,
    required: true,
  },
})

// Local variable to store the map instance
let map
let marker // Variable to store the marker instance
let infoWindow

// Function to load the Google Maps script dynamically
async function loadGoogleMapsScript() {
  const response = await await axios.get('https://app-625361629214.us-central1.run.app/api/map')
  const data = await response.data

  return new Promise((resolve, reject) => {
    // Check if the Google Maps API is already loaded
    if (window.google && window.google.maps) {
      return resolve(window.google.maps)
    }

    // Create a script element to load the Google Maps API
    const script = document.createElement('script')
    script.src = data
    script.async = true
    script.defer = true

    script.onload = () => {
      if (window.google && window.google.maps) {
        resolve(window.google.maps) // Resolve the promise with the google.maps object
      } else {
        reject(new Error('Google Maps API failed to load.'))
      }
    }

    script.onerror = () => {
      reject(new Error('Failed to load Google Maps API.'))
    }

    // Append the script to the head of the document
    document.head.appendChild(script)
  })
}

function createInfoWindow() {
  if (Object.keys(props.values).length !== 0) {
    const contentDiv = document.createElement('div')
    contentDiv.classList.add('google__window')
    let contentHTML = '<ul class="google__list">'
    Object.entries(props.values).forEach(([key, value]) => {
      // Only display the item if the corresponding boolean is true
      let label = key
        .split('_') // Split by '-'
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(' ')
      contentHTML += `<li class="google__list-item">${label}: ${value}</li>`
    })
    contentHTML += '</ul>'

    contentDiv.innerHTML = contentHTML
    // Attach the InfoWindow
    infoWindow = new google.maps.InfoWindow({
      content: contentDiv,
    })

    infoWindow.open(map, marker)
  }
}

// Initialize the map when the component is mounted
onMounted(async () => {
  try {
    const googleMaps = await loadGoogleMapsScript()

    // Ensure google.maps is defined before using it
    if (googleMaps) {
      // Initialize the map instance
      map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: props.lat, lng: props.lng },
        zoom: 14,
        mapId: '1a09fd8aba5ba4b8',
      })

      marker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: props.lat, lng: props.lng },
        map: map,
        title: 'Marker Location',
      })

      createInfoWindow()
    } else {
      console.error('google.maps is undefined')
    }
  } catch (error) {
    console.error('Error loading Google Maps:', error)
  }
})

// Watch for changes in lat or lng props and update the map center and marker position
watch([() => props.lat, () => props.lng, () => props.values], (newValues) => {
  if (map && marker) {
    // Update map center
    map.setCenter({
      lat: newValues[0], // New latitude
      lng: newValues[1], // New longitude
    })

    marker.position = { lat: newValues[0], lng: newValues[1] }

    if (infoWindow) infoWindow.close()

    createInfoWindow()
  }
})
</script>

<style scoped>
#map {
  height: 100%;
}
</style>
<style>
.google__window {
}
.google__list {
  list-style-type: none;
  padding-left: 12px;
  font-family: 'cabinetgrotesk';
  font-size: 11px;
}
.google__list-item {
  color: black;
  font-family: 'cabinetgrotesk';
}
</style>
