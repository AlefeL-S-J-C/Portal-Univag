import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'

import App from './App.vue'
import router from './router'

// Tailwind CSS
import './main.css'

// PrimeVue CSS
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.css'

const app = createApp(App)

app.use(PrimeVue)
app.use(ToastService)
app.use(ConfirmationService)
app.use(router)

app.mount('#app')
