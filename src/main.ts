import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import SiteInProgress from './views/SiteInProgress.vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

const inProgress = import.meta.env.VITE_APP_STATUS === 'IN_PROGRESS'

const mainApp = inProgress ? SiteInProgress : App

const app = createApp(mainApp)

if (!inProgress) {
  app.use(createPinia())
  app.use(router)
  app.use(VueAxios, axios)
  app.provide('axios', app.config.globalProperties.axios)
}

app.mount('#app')
