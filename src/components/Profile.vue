<template>
    <md-card md-with-hover>
        <md-card-header>
            <md-avatar @click.native="changePicture">
                <img :src="avatar" alt="Roger Forner Fabre">
            </md-avatar>

            <div class="md-title">{{ id }} {{ name }}</div>
            <div class="md-subhead">{{ email }}</div>
        </md-card-header>

        <md-card-content>
            <md-spinner :md-size="150" md-indeterminate  class="md-accent" v-show="connecting" ></md-spinner>
            <form novalidate @submit.stop.prevent="submit">
                <md-input-container>
                    <label>Name</label>
                    <md-input v-model="name" placeholder="Put your name here" v-show="!connecting"></md-input>
                </md-input-container>

                <md-input-container>
                    <label>Email</label>
                    <md-input v-model="email" placeholder="Put your email here" v-show="!connecting"></md-input>
                </md-input-container>

                <md-input-container>
                    <label>Created at</label>
                    <md-input v-model="createdAt" placeholder="Date here" v-show="!connecting"></md-input>
                </md-input-container>

                <md-input-container>
                    <label>Updated at</label>
                    <md-input v-model="updatedAt" placeholder="Date at here" v-show="!connecting"></md-input>
                </md-input-container>
            </form>
        </md-card-content>

        <md-card-actions>
            <md-button>Edit</md-button>
            <md-button>Delete</md-button>
        </md-card-actions>

        <md-snackbar md-position="bottom center" ref="connectionError" md-duration="4000">
            <span>Connection error. Please reconnect using connect button!.</span>
        </md-snackbar>

    </md-card>

</template>
<style>
</style>
<script>
import todosVue from '../todosVue'

export default {
  data () {
    return {
     // avatar: 'https://s.gravatar.com/avatar/74fbfbc098b6104178909d663e37c1cf?s=80',
      avatar: '',
      id: null,
      name: null,
      email: null,
      createdAt: null,
      updatedAt: null,
      connecting: true
    }
  },
  computed: {
    avatarHash: function () {
      return window.md5(this.email)
    }
  },
  created () {
    console.log('Component profile created')
    this.fetchUserProfile()
  },
  methods: {
    fetchUserProfile: function () {
      this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem(todosVue.STORAGE_KEY)
      this.$http.get(todosVue.API_PROFILE_URL).then((response) => {
        this.connecting = false
        console.log(response.data)
        this.id = response.data.id
        this.name = response.data.name
        this.email = response.data.email
        this.createdAt = response.data.created_at
        this.updatedAt = response.data.updated_at
        this.avatar = this.fetchAvatar()
      }, (response) => {
        this.connecting = false
        this.showConnectionError()
      })
    },
    showConnectionError () {
      this.$refs.connectionError.open()
    },
    fetchAvatar () {
      return 'https://s.gravatar.com/avatar/' + this.avatarHash + '?s=80'
    },
    changePicture: function () {
      var that = this
      if (!navigator.camera) {
        window.alert('Camera API not supported')
        return
      }
      var options = { quality: 50,
        destinationType: window.Camera.DestinationType.DATA_URL,
        sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Album
        encodingType: 0     // 0=JPG 1=PNG
      }
      navigator.camera.getPicture(
        function (imgData) {
          that.avatar = 'data:image/jpeg;base64,' + imgData
        },
        function () {
          window.alert('Error taking picture')
        },
        options)
      return false
    }
  }
}

</script>