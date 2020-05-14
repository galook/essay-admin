// default Vue
import Vue from 'vue'
import App from './app.vue'
import router from './router'

// settings
import settings from '@/assets/settings.js'
// Styling
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue, settings.Bootstrap)

// Component manager
import componentManager from '@/assets/componentManager.js'
componentManager()

// Other
import axios from 'axios'

Vue.prototype.$axios = axios

import Swal from 'sweetalert2';

Vue.prototype.$alert = Swal

import VueTyperPlugin from 'vue-typer'

Vue.use(VueTyperPlugin)

import LazyTransition from 'vue-lazy-transition'
 
Vue.use(LazyTransition)

// CommonJS




new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
