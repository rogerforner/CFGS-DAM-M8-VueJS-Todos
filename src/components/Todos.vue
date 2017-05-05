<template>
    <div>
        <div>
          <ul>
            <li v-for="(todo, index) in todos">{{ todo.name }}</li>
          </ul>
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
        msg: 'Todos here',
        todos: []
      }
    },
    created () {
      console.log('Provant')
      this.fetchData()
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
          // SweetAlert('Oops...', 'Something went wrong!', 'error')
          console.log('Error')
        })
      }
    }
  }

</script>
