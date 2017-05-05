// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import VueRouter from 'vue-router'
import Tokens from 'components/Tokens'
import Todos from 'components/Todos'
import Profile from 'components/Profile'
import Axios from 'axios'
import querystring from 'querystring'

window.axios = Axios
window.querystring = querystring
Vue.prototype.$http = Axios

import sweetAlert from 'sweetalert'
window.sweetAlert = sweetAlert

const routes = [
    { path: '/todos', component: Todos },
    { path: '/tokens', component: Tokens },
    { path: '/profile', component: Profile }
]

const router = new VueRouter({
    // history mode html5 per borrar #
  mode: 'history',
  routes
})

Vue.use(VueMaterial)
Vue.use(VueRouter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router: router
})
