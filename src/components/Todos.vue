<template>
    <div>
        <div v-show="!authorized">
            <md-button class="md-raised md-primary" @click="connect">Connect</md-button>
        </div>
        <div v-show="authorized">
            <md-button class="md-raised md-primary" @click="logout">Logout</md-button>
        </div>
        <div>
            <md-table-card>
                <md-toolbar>
                    <h1 class="md-title">todosVue</h1>
                    <md-button class="md-icon-button">
                       <md-icon>filter_list</md-icon>
                    </md-button>

                    <md-button class="md-icon-button">
                       <md-icon>search</md-icon>
                    </md-button>
                </md-toolbar>

                <md-table md-sort="name" md-sort-type="desc">
                    <md-table-header>
                        <md-table-row>
                            <md-table-head md-sort-by="name">Name</md-table-head>
                            <md-table-head md-sort-by="priority">Priority</md-table-head>
                            <md-table-head md-sort-by="done" md-numeric>Done</md-table-head>
                        </md-table-row>
                    </md-table-header>

                    <md-spinner :md-size="150" md-indeterminate  class="md-accent" v-show="connecting"></md-spinner>
            <md-table-body>
                <md-table-row v-for="(todo, index) in todos" md-auto-select md-selection>
                    <md-table-cell>{{ index +1 }} {{ todo.name }}</md-table-cell>
                    <md-table-cell>{{ todo.priority }}</md-table-cell>
                    <md-table-cell>{{ todo.done }}</md-table-cell>
                </md-table-row>
            </md-table-body>
                </md-table>

                <md-table-pagination
                        :md-size=perPage
                        :md-total=total
                        :md-page=page
                        md-label="Rows"
                        md-separator="of"
                        :md-page-options="[5, 15, 25, 50]"
                        @pagination="onPagination"></md-table-pagination>

            </md-table-card>
        </div>
    </div>
</template>
<style>
  body{
      background-color: green;
  }
</style>
<script>
  var STORAGE_KEY = 'todosvue_token'
  var AUTH_CLIENT_ID = '4'
  var AUTH_REDIRECT_URI = 'http://localhost:8095/todos'

  export default{
    data () {
      return {
        todos: [],
        authorized: false,
        token: null,
        connecting: false,
        total: 0,
        perPage: 0,
        page: 0
      }
    },
    created () {
      if (document.location.hash) var token = this.extractToken(document.location.hash)
      if (token) this.saveToken(token)
      if (this.token == null) this.token = this.fetchToken()
      if (this.token) {
        this.authorized = true
        this.fetchData()
      } else {
        this.authorized = false
      }
    },
    methods: {
      fetchData: function () {
        return this.fetchPage(1)
      },
      fetchPage: function (page) {
        if (this.token != null) {
          this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token
          console.log('HEY TOKEN: ' + this.token)
        }
        this.$http.get('http://todos.dev:8000/api/v1/task?page=' + page).then((response) => {
          console.log(response.data)
          this.todos = response.data.data
        }, (response) => {
          // sweetAlert('Oops...', 'Something went wrong!', 'error')
          console.log(response.data)
          // this.authorized = false
        })
      },
      extractToken: function (hash) {
        return hash.match(/#(?:access_token)=([\S\s]*?)&/)[1]
      },
      logout: function () {
        window.localStorage.removeItem(STORAGE_KEY)
        // TODO: only if HTTP response code 401
        // TODO: mostrar amb una bona UI/UE -> SweetAlert
        window.sweetAlert('Oops...', 'Something went wrong!', 'error')
        this.authorized = false
      },
      connect: function () {
        query = {
          client_id: AUTH_CLIENT_ID,
          redirect_uri: AUTH_REDIRECT_URI,
          response_type: 'token',
          scope: ''
        }
        var query = window.querystring.stringify(query)
        window.location.replace('http://todos.dev:8000/oauth/authorize?' + query)
      },
      fetchToken: function () {
        return window.localStorage.getItem(STORAGE_KEY)
      },
      saveToken: function (token) {
        window.localStorage.setItem(STORAGE_KEY, token)
      },
      onPagination: function () {
        console.log('pagination todo!')
      }
    }
  }
// Traure nom del usuari i la seva foto amb les metadades que retorna el todosBackend.
</script>
