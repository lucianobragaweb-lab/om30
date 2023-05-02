import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { makeServer } from './server'
import store from './store'
import VueTheMask from 'vue-the-mask'

import './assets/main.css'
import './index.css'

if (process.env.NODE_ENV === 'development') {
  makeServer()
}

const app = createApp(App)

app.use(VueTheMask)
app.use(router)
app.use(store)

app.mount('#app')
