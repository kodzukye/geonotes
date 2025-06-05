import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import router from './router'
import './assets/base.css'

import VueGoogleMaps from '@fawmi/vue-google-maps'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

app.use(VueGoogleMaps, {
  load: {
    key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: 'places',
  },
})

app.mount('#app')
