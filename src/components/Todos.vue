<template>
    <div>
        <div>{{ msg }}</div>
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
        msg: 'Todos here'
      }
    },
    created () {
      console.log('Provant')
    },
    methods: {
      fetchData: function () {
        return this.fetchPage(1)
      },
      fetchPage: function (page) {
        this.$http.get('/api/v1/task?page' + page).then((response) => {
          console.log(response)
        }, (response) => {
          console.log(response)
        })
      }
    }
  }

</script>
