<template>
    <div>
        <div v-show="!authorized">
            <md-button class="md-raised md-primary" @click="connect">Connect</md-button>
            <div>
              <ul>
                <li v-for="(todo, index) in todos">
                    {{ todo.name }}
                </li>
              </ul>
            </div>
        </div>
    </div>
</template>
<style>
  body{
      background-color:#ff0000;
  }
</style>
<script>
  export default{
    data () {
      return {
        todos: [],
        authorized: false
      }
    },
    created () {
      console.log(this.fetchToken())
      if (this.fetchToken()) {
        this.authorized = true
      } else {
        this.authorized = false
      }
    },
    methods: {
      fetchData: function () {
        return this.fetchPage(1)
      },
      fetchPage: function (page) {
        this.$http.get('http://todos.dev:8000/api/v1/task?page' + page).then((response) => {
          console.log(response.data)
          this.todos = response.data.data
        }, (response) => {
          // sweetAlert('Oops...', 'Something went wrong!', 'error')
          console.log('Error')
        })
      },
      connect: function () {
        console.log('Connect here')
      },
      fetchToken: function () {
        return window.localStorage.getItem(window.STORAGE_KEY)
      },
      save: function (toKEN) {
        window.localStorage.setItem(window.STORAGE_KEY, this.token)
      }
    }
  }

</script>
