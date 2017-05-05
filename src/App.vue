<template>
  <div class="phone-viewport">
    <md-toolbar>
      <md-button class="md-icon-button" @click="toggleLeftSidenav">
       <md-icon>menu</md-icon>
      </md-button>

      <h2 class="md-title">todosVue</h2>
    </md-toolbar>


    <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">

      <md-toolbar class="md-large">

        <div class="md-toolbar-container">

          <h3 class="md-title">todosVue</h3>

        </div>
      </md-toolbar>

      <md-list>
        <md-list-item @click="toggleLeftSidenav">
         <md-icon>playlist_add_check</md-icon>
          <router-link to="/todos">todosVue</router-link>
        </md-list-item>

        <md-list-item @click="toggleLeftSidenav">
         <md-icon>vpn_key</md-icon>
          <router-link to="/tokens">Tokens</router-link>
        </md-list-item>
        <md-list-item @click="toggleLeftSidenav">
         <md-icon>profile</md-icon>
          <router-link to="/profile">Profile</router-link>
        </md-list-item>
      </md-list>
    </md-sidenav>
    <router-view></router-view>
  </div>
</template>

<script>
import Hello from './components/Hello'

export default {
  name: 'app',
  components: {
    Hello
  },
  methods: {
    toggleLeftSidenav () {
      this.$refs.leftSidenav.toggle()
    },
    open (ref) {
      console.log('Opened: ' + ref)
    },
    close (ref) {
      console.log('Closed: ' + ref)
    }
  }
}
</script>

<style>
</style>
