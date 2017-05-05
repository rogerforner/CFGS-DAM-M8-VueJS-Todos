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
  // var AUTH_CLIENT_ID = '4'
  // var AUTH_REDIRECT_URI = 'http://localhost:8095/todos'
  var API_URL = 'http://todos.dev:8080/api/v1/task'

  export default{
    data () {
      return {
        todos: [],
        connectin: true,
        connecting: false,
        total: 0,
        perPage: 0,
        page: 0
      }
    },
    created () {
      var that = this
      setTimeout(function () {
        that.fetchData()
        that.connecting = false
      }, 500)
    },
    methods: {
      fetchData: function () {
        return this.fetchPage(1)
      },
      fetchPage: function (page) {
        this.$http.get(API_URL + '?page=' + page).then((response) => {
          this.todos = response.data.data
          console.log(response.data)
          console.log(typeof response.data.total)
          this.total = response.data.total
          this.perPage = response.data.per_page
          this.page = response.data.current_page
        }, (response) => {
          console.log('ERROR DATA: ' + response.data)
          this.showConnectionError()
          this.authorized = false
        })
      },
      onPagination: function () {
        console.log('pagination todo!')
      }
    }
  }
// Traure nom del usuari i la seva foto amb les metadades que retorna el todosBackend.
</script>
