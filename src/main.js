// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import VueRouter from 'vue-router'
import Tokens from 'components/Tokens'
import Todos from 'components/Todos'

const routes = [
    { path: '/foo', component: Todos },
    { path: '/bar', component: Tokens }
]

const router = new VueRouter(
  routes // short for routes: routes
)

Vue.use(VueMaterial)
Vue.use(router)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
