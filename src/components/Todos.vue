<template>
  <div>
    <vue-pull-refresh :on-refresh="onRefresh" :config="config">
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
            <md-table-head md-sort-by="priority" md-numeric>Priority</md-table-head>
            <md-table-head md-sort-by="done">Done</md-table-head>
            <md-table-head md-sort-by="actions">Actions</md-table-head>
          </md-table-row>
        </md-table-header>

        <md-spinner :md-size="150" md-indeterminate  class="md-accent" v-show="connecting"></md-spinner>

        <md-table-body>
          <md-table-row v-for="(todo, index) in todos">
            <md-table-cell>{{ index +1 }} {{ todo.name }}</md-table-cell>
            <md-table-cell>{{ todo.priority }}</md-table-cell>


            <md-table-cell>
              <span v-if="todo.done">
                <md-switch v-model="todo.done" id="done" name="done" class="md-primary" @click.native="setDone(todo.done, todo.id)"></md-switch>
              </span>
              <span v-else>
                <md-switch v-model="todo.done" id="done" name="done" class="md-primary" @click.native="setDone(todo.done, todo.id)"></md-switch>
              </span>
            </md-table-cell>

            <md-table-cell>
              <span class="btn btn-md btn-danger"  @click="deleteTodo(index,todo.id)">
                <md-button><md-icon>delete_forever</md-icon></md-button>
              </span>
              <!--<span class="btn btn-md btn-info" @click="editTodo(index,todo.id)">-->
                <!--<md-icon>edit</md-icon>-->
              <!--</span>-->
            </md-table-cell>
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

    <md-snackbar md-position="bottom center" ref="connectionError" md-duration="4000">
      <span>Connection error. Please reconnect using connect button!.</span>
    </md-snackbar>

    </vue-pull-refresh>
  </div>
</template>
<style>
</style>
<script>
  import todosVue from '../todosVue'
  import VuePullRefresh from 'vue-pull-refresh'

  export default{
//    props: ['todo', 'index', 'from'],
    components: {
      'vue-pull-refresh': VuePullRefresh
    },
    data () {
      return {
        todos: [],
//        editing: false,
        connecting: false,
        total: 0,
        perPage: 0,
        page: 0,
        config: {
          errorLabel: 'Error',
          startLabel: 'Swipe',
          readyLabel: 'Release',
          loadingLabel: 'Refreshing...'
        }
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
      setDone: function (done, id) {
        this.done = done
        this.editTodoApi(id)
      },
      fetchData: function () {
        return this.fetchPage(1)
      },
      fetchPage: function (page) {
        this.$http.get(todosVue.API_TASK_URL + '?page=' + page).then((response) => {
          this.connecting = false
          this.todos = response.data.data
          this.total = response.data.total
          this.perPage = response.data.per_page
          this.page = response.data.current_page
        }, (response) => {
          this.connecting = false
          this.showConnectionError()
          this.authorized = false
        })
      },
      showConnectionError () {
        this.$refs.connectionError.open()
      },
      onPagination: function () {
        this.fetchPage(this.page += 1)
      },
      deleteTodo: function (index, id) {
        var out = this
        out.deleteTodoApi(id)
        out.fetchPage(out.page)
        out.fetchData()
      },
      deleteTodoApi: function (id) {
        this.$http.delete(todosVue.API_TASK_URL + '/' + id).then((response) => {
          console.log(response)
        }, (response) => {
          console.log(response)
        })
      },
      editTodoApi: function (id) {
        this.$http.put(todosVue.API_TASK_URL + '/' + id, {
          name: this.name,
          priority: this.priority,
          done: this.done
        }).then((response) => {
          console.log(response)
        }, (response) => {
//          window.sweetAlert('Oops...', 'Something went wrong!', 'error')
          console.log(response)
        })
      },
      onRefresh: function () {
        this.connecting = true
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            resolve()
          }, 1000)
        }).then(() => {
          this.fetchData()
        }).catch(() => {
          this.showConnectionError()
        })
      }
    }
  }
// Traure nom del usuari i la seva foto amb les metadades que retorna el todosBackend.
</script>
