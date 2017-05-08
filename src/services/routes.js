import Tokens from '../components/Tokens'
import Todos from '../components/Todos'
import Profile from '../components/Profile'
import NotFound from '../components/NotFound'
import DeviceInfo from '../components/DeviceInfo'
import Login from '../components/Login'
import Notifications from '../components/Notifications'
import Cordova from '../components/Cordova'

const routes = [
  { path: '/android_asset/www/index.html',
    component: Login,
    meta: { auth: false }
  },
  {
    path: '/',
    component: Todos,
    meta: { auth: true }
  },
  {
    path: '/todos',
    component: Todos,
    meta: { auth: true }
  },
  {
    path: '/tokens',
    component: Tokens,
    meta: { auth: false }
  },
  {
    path: '/profile',
    component: Profile,
    meta: { auth: true }
  },
  {
    path: '/device_info',
    component: DeviceInfo,
    meta: { auth: false }
  },
  { path: '/cordova',
    component: Cordova,
    meta: { auth: false }
  },
  {
    path: '/login',
    component: Login,
    meta: { auth: false }
  },
  { path: '/notifications',
    component: Notifications,
    // props: Notifications.get(),
    meta: { auth: true }
  },
  {
    path: '*',
    component: NotFound,
    meta: { auth: false }
  }
]

export default routes
