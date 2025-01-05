# GPS Device Tracker Application

This application displays GPS information of devices and their current locations on a map. It also includes a settings page where users can customize which GPS data fields are displayed on the main page.

## Features

- **Device List with Status**: Displays a list of devices with online/offline status (red/green dots).
- **GPS Information Display**: Shows selected GPS data fields for the currently displayed device.
- **Interactive Map**: Integrates Google Maps API to display the current location of the device with a marker and an information window.
- **Settings Page**: Allows users to configure which GPS data fields are shown in the main view.
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices with support for different screen orientations.
- **One Step GPS Integration**: Retrieves device data from the One Step GPS account.

## Technologies Used

### Front-End

- **Framework**: Vue.js
- **Styling**: Google Fonts, responsive design

### Back-End

- **Language**: Golang
- **Functionality**:
  - Handles API requests to retrieve device information and integrate Google Maps.
  - Reads/writes settings from/to a `user_settings.json` file for field display customization.
- **Integration**: Connects to One Step GPS for device data and Google Maps API for map rendering.

### Deployment

- **Containerization**: Both front-end and back-end are containerized using Docker for seamless deployment.
- **Hosting**: Deployed as a service on Google Cloud Platform.
- **Live URL**: [GPS Device Tracker](https://osg-625361629214.us-central1.run.app/)

## Application Workflow

### Main Page

1. Displays a list of devices associated with the user's One Step GPS account.
2. The list includes a red/green status indicator for each device (offline/online).
3. Shows GPS data fields selected in the settings page.
4. Displays a Google Map centered on the current location of the selected device.
   - A marker indicates the device's location.
   - An information window shows additional GPS data (if configured).

### Settings Page

- Allows users to select which GPS data fields to display.
- Saves preferences in a `user_settings.json` file.

## Map Features

- **Marker**: Pins the current location of the selected device.
- **Information Window**: Displays selected data fields.
- **Zoom Level**: Fixed at 14 for optimal viewing.
- **Interactive Display**: Updates dynamically as the user interacts with the application.

## Installation

### Prerequisites

- Docker
- Google Cloud CLI (for deployment)

### Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
