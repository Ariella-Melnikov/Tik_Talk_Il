import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import store from '../store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faInstagram, faLinkedin, faFacebook, faTiktok, faWhatsapp } from '@fortawesome/free-brands-svg-icons'

library.add(faInstagram, faLinkedin, faFacebook, faTiktok, faWhatsapp)


const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(store)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
