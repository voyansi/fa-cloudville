import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import { forgeAPIWrapper } from '../functions/forge/forgeAPIWrapper'

Vue.config.productionTip = false

Vue.use(Buefy)


// extends the vue type to so typescript knows what's happening
declare module "vue/types/vue" {
  interface Vue {
    $forge: forgeAPIWrapper
  }
}
// add forge wrapper to global variables

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
