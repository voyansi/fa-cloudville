import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import '@fortawesome/fontawesome-free/css/solid.css'
import '@fortawesome/fontawesome-free/css/fontawesome.css'

Vue.use(Buefy, { defaultIconPack: 'fas' })

Vue.config.productionTip = false


new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
