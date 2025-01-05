<script setup>
import { RouterLink, RouterView } from 'vue-router'
import AppFooter from './views/AppFooter.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/"
          ><img
            alt="Devices"
            class="header-img"
            src="@/assets/devices.png"
            height="12"
          />Devices</RouterLink
        >

        <RouterLink to="/settings"
          ><img alt="Settings" class="header-img" src="@/assets/settings.png" height="12" />
          Settings</RouterLink
        >
      </nav>
      <img
        alt="Company logo"
        class="company-logo logo"
        src="@/assets/companyLogo.png"
        height="125"
      />
    </div>
  </header>
  <RouterView />
  <AppFooter />
</template>

<style scoped>
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: #000;
}
header {
  line-height: 1.5;
  max-height: 100vh;
  grid-column: span 2;
  padding: 12px 12px 12px 12px;
  height: 150px;
  background-color: white;

  width: 100%;
}

.logo {
  background-color: white;
  display: block;
  margin: 0 auto 2rem;
  padding: 12px;
}

nav {
  font-size: 8px;
  text-align: center;
  margin-top: 2rem;
  padding-bottom: 0;
  font-family: 'cabinetgrotesk';
}

nav a.router-link-exact-active {
  color: var(--color-selected-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  font-size: 20px;
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  justify-content: left;
}

nav a:first-of-type {
  border: 0;
}

.header-img {
  width: 24px;
  height: auto;
  margin: 0 32px;
}

@media screen and (min-width: 800px) and (max-width: 932px) {
  .header-img {
    margin: 0 12px;
  }
}
@media screen and (max-width: 430px) {
  .wrapper {
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
  }
  header {
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
    position: relative;
    height: auto;
  }
  .logo {
    height: 100px;
    padding-bottom: 0;
    margin-bottom: 0;
  }
  nav {
    display: flex;
  }
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    position: fixed;
    padding-right: calc(var(--section-gap) / 2);
    background-color: white;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: end;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 2rem;
    padding-top: 1rem;
    margin-top: 1rem;
    background-color: white;
  }
}
</style>
