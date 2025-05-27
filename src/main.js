import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// Vuetify
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Global styles
import './styles/settings.scss'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(vuetify)

app.mount('#app')
