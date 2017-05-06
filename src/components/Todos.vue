<template>
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
            <md-table-head md-sort-by="priority" md-numeric>Priority</md-table-head>
            <md-table-head md-sort-by="done">Done</md-table-head>
            <md-table-head md-sort-by="actions">Actions</md-table-head>
          </md-table-row>
        </md-table-header>

        <md-spinner :md-size="150" md-indeterminate  class="md-accent" v-show="connecting"></md-spinner>

        <md-table-body>
          <md-table-row v-for="(todo, index) in todos" md-auto-select md-selection>
            <md-table-cell>{{ index +1 }} {{ todo.name }}</md-table-cell>
            <md-table-cell>{{ todo.priority }}</md-table-cell>
            <md-table-cell>{{ todo.done }}</md-table-cell>
            <md-table-cell>
              <span class="btn btn-md btn-danger"  @click="deleteTodo(index,todo.id)">
               <md-icon>delete_forever</md-icon>
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

  </div>
</template>
<style>
</style>
<script>
  import todosVue from '../todosVue'

  export default{
//    props: ['todo', 'index', 'from'],
    data () {
      return {
        todos: [],
//        editing: false,
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
          window.sweetAlert('Oops...', 'Something went wrong!', 'error')
        })
      },
      showConnectionError () {
        this.$refs.connectionError.open()
      },
      onPagination: function () {
        console.log('pagination todo!')
      },
      deleteTodo: function (index, id) {
        var out = this
        window.swal({
          title: 'Are you sure?',
          text: 'You will not be able to recover this task!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Yes, delete it!',
          closeOnConfirm: false
        },
        function () {
          window.swal('Deleted!', 'Your task has been deleted.', 'success')
          out.deleteTodoApi(id)
          out.fetchPage(out.page)
        })
      },
      deleteTodoApi: function (id) {
        this.$http.delete(todosVue.API_TASK_URL + '/' + id).then((response) => {
          console.log(response)
        }, (response) => {
          window.sweetAlert('Oops...', 'Something went wrong!', 'error')
          console.log(response)
        })
      }
//      editTodoApi: function () {
//        this.$http.put(this.uri + '/' + this.todo.id, {
//          name: this.todo.name,
//          priority: this.todo.priority,
//          done: this.todo.done
//        }).then((response) => {
//          console.log(response)
//        }, (response) => {
//          window.sweetAlert('Oops...', 'Something went wrong!', 'error')
//          console.log(response)
//        })
//      },
//      editTodo: function () {
//        this.editing = true
//        return this.editing
//      }
    }
  }
// Traure nom del usuari i la seva foto amb les metadades que retorna el todosBackend.
</script>
