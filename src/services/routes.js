import Tokens from '../components/Tokens'
import Todos from '../components/Todos'
import Profile from '../components/Profile'
import NotFound from '../components/NotFound.vue'
import Login from '../components/Login.vue'

const routes = [
  {
    path: '/todos',
    component: Todos,
    auth: true
  },
  {
    path: '/tokens',
    component: Tokens,
    auth: false
  },
  {
    path: '/profile',
    component: Profile,
    auth: true
  },
  {
    path: '/login',
    component: Login,
    auth: false
  },
  {
    path: '*',
    component: NotFound,
    auth: false
  }
]

export default routes
