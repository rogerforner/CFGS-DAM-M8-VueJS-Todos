<template>

  <vue-pull-refresh :on-refresh="onRefresh" :config="config">
    <md-card md-with-hover>

      <md-card-header>
        <md-avatar @click.native="selectCamera">
            <img id="profilePicture" :src="avatar" alt="name">
        </md-avatar>

        <div class="md-subhead">Username (Tap avatar to change it)</div>
        {{name}}
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

              <md-input-container>
                <label>Updated at</label>
                <md-input v-model="updatedAt" placeholder="Your date here"></md-input>
              </md-input-container>

              <md-input-container>
                <label>Phone Number</label>
                <md-input v-model="phone" placeholder="Your phone here"></md-input>
              </md-input-container>

              <md-input-container>
                <label>Latitude</label>
                <md-input v-model="latitude" placeholder="Latitude"></md-input>
              </md-input-container>

              <md-input-container>
                <label>Longitude</label>
                <md-input v-model="longitude" placeholder="Longitude"></md-input>
              </md-input-container>

            </form>
        </md-card-content>
        <md-spinner :md-size="150" md-indeterminate  class="md-accent" v-show="connecting"></md-spinner>

        <md-card-actions>
            <md-button @click.native="loadLocation">Get Location</md-button>
            <md-button @click.native="loadContact">Save Contact</md-button>
        </md-card-actions>

      <md-snackbar md-position="bottom center" ref="connectionError" md-duration="4000">
        <span>Connection error. Please reconnect using connect button!.</span>
      </md-snackbar>

    </md-card>
  </vue-pull-refresh>
</template>
<style>
</style>
<script>
  import todosVue from '../todosVue'
  import gravatar from 'gravatar'
  import VuePullRefresh from 'vue-pull-refresh'

  export default {
    components: {
      'vue-pull-refresh': VuePullRefresh
    },
    data () {
      return {
        latitude: window.localStorage.getItem('latitude'),
        longitude: window.localStorage.getItem('longitude'),
        phone: null,
        avatar: '',
        id: null,
        name: null,
        email: null,
        createdAt: null,
        updatedAt: null,
        connecting: false,
        page: 0,
        url: '',
        config: {
          errorLabel: 'Error',
          startLabel: 'Swipe',
          readyLabel: 'Release',
          loadingLabel: 'Refreshing...'
        }
      }
    },
    created () {
      console.log('Component profile created')
    },
    mounted () {
      this.fetchUserProfile()
      console.log(window.localStorage.getItem('profilePicture'))
    },
    methods: {
      fetchUserProfile: function () {
        this.$http.get(todosVue.API_PROFILE_URL).then((response) => {
          this.connecting = false
          this.id = response.data.id
          this.name = response.data.name
          this.email = response.data.email
          this.avatar = 'http:' + gravatar.url(this.email)
          if (window.localStorage.getItem('profilePicture')) {
            this.avatar = window.localStorage.getItem('profilePicture')
          }
          this.createdAt = response.data.created_at
          this.updatedAt = response.data.updated_at
//          this.phone = response.data.phone
        }, (response) => {
          this.connecting = false
          this.showConnectionError()
        })
      },
      showConnectionError () {
        this.$refs.connectionError.open()
      },
      onRefresh () {
        this.connecting = true
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            resolve()
          }, 1000)
        }).then(() => {
          this.fetchUserProfile()
        }).catch(() => {
          this.showConnectionError()
        })
      },
      selectCamera () {
        if (window.cordova && window.device.platform !== 'browser') {
          this.openCamera()
        } else {
          console.log('Camera not supported')
        }
      },
      openCamera () {
        navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
          destinationType: window.Camera.DestinationType.FILE_URI })

        function onSuccess (imageURI) {
          window.localStorage.setItem('profilePicture', null)
          console.log('Picture Taken')
          var image = document.getElementById('profilePicture')
          image.src = imageURI
          window.localStorage.setItem('profilePicture', imageURI)
          console.log(image)
        }

        function onFail (message) {
          window.alert('Error: ' + message)
        }
      },
      loadContact () {
        if (window.cordova && window.device.platform !== 'browser') {
          this.saveContact()
        } else {
          console.log('Contact not supported')
        }
      },
      saveContact () {
        function onSuccess (contact) {
          window.alert('Contact Save Success')
        }

        function onError (contactError) {
          window.alert('Error =  ' + contactError.code)
        }

        // create a new contact object
        var contact = navigator.contacts.create()
        contact.displayName = contact.nickname = contact.name = this.name
        contact.phoneNumbers = new window.ContactField('mobile', this.phone, true)
        console.log(contact)
        contact.save(onSuccess, onError)
      },
      loadLocation () {
        if (window.cordova && window.device.platform !== 'browser') {
          this.getLocation()
        } else {
          console.log('Geolocation not supported')
        }
      },
      getLocation () {
        var out = this
        console.log('Get location')
        this.connecting = true
        navigator.geolocation.getCurrentPosition(
          function (position) {
            out.connecting = false
            console.log('Coordinates: ' + position.coords.latitude + ', ' + position.coords.longitude)
            window.localStorage.setItem('latitude', position.coords.latitude)
            window.localStorage.setItem('longitude', position.coords.longitude)
          },
          function (err) {
            out.connecting = false
            window.alert('Error :' + err)
          },
          { timeout: 10000 })
      }
    }
  }

</script>
