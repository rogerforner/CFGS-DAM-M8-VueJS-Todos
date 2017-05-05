<template>
    <md-card md-with-hover>
        <md-card-header>
            <md-avatar>
                <img :src="avatar" alt="Manel Gavaldà Andreu">
            </md-avatar>

            <div class="md-title">{{name}}</div>
            <div class="md-subhead">Manel</div>
        </md-card-header>

        <md-card-content>
            <form novalidate @submit.stop.prevent="submit">
                <md-input-container>
                    <label>Name</label>
                    <md-input v-model="name" placeholder="Put your name here"></md-input>
                </md-input-container>

                <md-input-container>
                    <label>Email</label>
                    <md-input v-model="email" placeholder="Put your email here"></md-input>
                </md-input-container>

                <md-input-container>
                    <label>Created at</label>
                    <md-input v-model="createdAt" placeholder="Your date here"></md-input>
                </md-input-container>

                <md-input-container>
                    <label>Updated at</label>
                    <md-input v-model="updatedAt" placeholder="Your date here"></md-input>
                </md-input-container>
            </form>
        </md-card-content>

        <md-card-actions>
            <md-button>Action</md-button>
            <md-button>Action</md-button>
        </md-card-actions>
    </md-card>
</template>
<style>
</style>
<script>
  import todosVue from '../todosVue'
  export default {
    data () {
      return {
        avatar: 'https://s.gravatar.com/avatar/7d23ac5a56b02117f12c54f0d98bf6de?s=80',
        id: null,
        name: null,
        email: null,
        createdAt: null,
        updatedAt: null,
        connecting: true,
        page: 0
      }
    },
    computed: {
      avatarHash: function () {
        return '7d23ac5a56b02117f12c54f0d98bf6de?s=80'
        // TODO: return md5 de email(si canvia emial canvia url).
      }
    },
    created () {
      console.log('Component profile created')
      this.fetchUserProfile()
    },
    methods: {
      fetchUserProfile: function () {
        this.$http.get(todosVue.API_PROFILE_URL + this.page).then((response) => {
          this.connecting = false
          this.id = response.data.id
          this.name = response.data.name
          this.email = response.data.email
          this.createdAt = response.data.created_at
          this.updatedAt = response.data.updated_at
        }, (response) => {
          this.connecting = false
          this.showConnectionError()
          window.sweetAlert('Oops...', 'Something went wrong!', 'error')
        })
      },
      showConnectionError () {
        this.$refs.connectionError.open()
      }
    }
  }

</script>
