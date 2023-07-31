import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import SiteInProgress from './views/SiteInProgress.vue'
import App from './App.vue'
import router from './router'

const inProgress = import.meta.env.VITE_APP_IN_PROGRESS !== 'false'

const mainApp = inProgress ? SiteInProgress : App

const app = createApp(mainApp)

if (!inProgress) {
  app.use(createPinia())
  app.use(router)
}

app.mount('#app')
