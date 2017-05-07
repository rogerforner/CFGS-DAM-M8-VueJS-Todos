// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import VueRouter from 'vue-router'
import Axios from 'axios'
import querystring from 'querystring'
import auth from './services/auth'
import router from './services/router'
import 'animate.css/animate.min.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons/iconfont/material-icons.css'
import gravatar from 'gravatar'

window.gravatar = gravatar
window.axios = Axios
window.querystring = querystring
Vue.prototype.$http = Axios

Vue.use(VueMaterial)
Vue.use(VueRouter)

window.axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest'
}

if (auth.loggedIn()) {
  window.axios.defaults.headers.common = {
    'Authorization': auth.getAuthHeader()
  }
}

// Theme

Vue.material.registerTheme('roger', {
  primary: {
    color: 'indigo',
    hue: 700
  },
  accent: 'blue',
  warn: 'pink',
  background: {
    color: 'indigo',
    hue: 300
  }
})

Vue.material.setCurrentTheme('roger')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router: router
})
