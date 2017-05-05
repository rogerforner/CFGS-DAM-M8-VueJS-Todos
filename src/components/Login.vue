<template>
    <md-card>
        <md-card-header>
            <div class="md-title">Login</div>
        </md-card-header>
        <md-card-content>
            <md-button class="md-raised md-primary" @click="connect" v-show="authorized">Connect</md-button>
            <md-button class="md-raised md-primary" @click="logout" v-show="!authorized">Logout</md-button>
        </md-card-content>
    </md-card>
</template>
<style>

</style>
<script>
var STORAGE_KEY = 'todosvue_token'
var AUTH_CLIENT_ID = 5
var AUTH_REDIRECT_URI = 'http://localhost:8095/todos'

export default{
  data () {
    return {
      authorized: false
    }
  },
  methods: {
    extractToken: function (hash) {
      return hash.match(/#(?:access_token)=([\S\s]*?)&/)[1]
    },
    saveToken: function (token) {
      window.localStorage.setItem(STORAGE_KEY, token)
    },
    fetchToken: function () {
      return window.localStorage.getItem(STORAGE_KEY)
    },
    login: function () {
      query = {
        client_id: AUTH_CLIENT_ID,
        redirect_uri: AUTH_REDIRECT_URI,
        response_type: 'token',
        scope: ''
      }
      var query = window.querystring.stringify(query)
      window.location.replace('http://todos.dev:8000/oauth/authorize?' + query)
    },
    logout: function () {
      window.localStorage.removeItem(STORAGE_KEY)
      // TODO: only if HTTP response code 401
      // TODO: mostrar amb una bona UI/UE -> SweetAlert
      window.sweetAlert('Oops...', 'Something went wrong!', 'error')
      this.authorized = false
    },
    initLogout: function () {
      this.openDialog('sureToLogout')
    },
    openDialog: function (ref) {
      this.$refs[ref].open()
    },
    onCloseSureToLogout: function (type) {
      if (type === 'ok') this.logout()
    }
  }
}
</script>
