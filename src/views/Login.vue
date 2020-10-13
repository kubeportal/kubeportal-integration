<template>
    <b-card bg-variant="light" class="mt-16 logincard">
      <b-card-header>
        <v-icon class="icon" left>mdi-login-variant</v-icon>
        Kubeportal
      </b-card-header>
      <b-card-body>
        <v-alert class="alert" dense outlined type="error" v-if="is_authenticated === 'false'">Login Failed.</v-alert>
        <b-card-text>
          <v-text-field label="user name" v-model="username" required></v-text-field>
          <v-text-field type="password" v-model="password" label="password" required></v-text-field>
        </b-card-text>
        <div class="row">
          <b-button class="signin" @click="login">Sign In</b-button>
        </div>
        <div class="row"><p class="my-4 text">or</p></div>
        <div class="row">
          <b-button class="signin" @click="signInWithGoogle">
            <v-icon  white small left>mdi-google</v-icon>
            Continue with Google
          </b-button>
        </div>
      </b-card-body>
    </b-card>
</template>

<script>
import to from 'await-to-js'
import * as backend from '@/api/backend'
export default {
  name: 'Login',
  data () {
    return {
      is_authenticated: '',
      username: '',
      password: '',
      isSignedIn: ''
    }
  },
  methods: {
    async login () {
      const request_body = { username: this.username, password: this.password }
      const response = await this.$store.dispatch('users/post_login_data', request_body)
      console.log(response);

      await this.handle_login_response(response)
    },
    async signInWithGoogle () {
      let error, googleUser
      [error, googleUser] = await to(this.$gAuth.signIn())
      if (!googleUser || error) {
        console.log('google login failed')
        this.is_authenticated = 'false'
        return undefined
      }
      const auth_response = googleUser.getAuthResponse()
      console.log('getAuthResponse', this.$gAuth.GoogleAuth.currentUser.get().getAuthResponse())
      this.isSignedIn = this.$gAuth.isAuthorized
      const response = await this.$store.dispatch('users/authorize_google_user', auth_response)
      await this.handle_login_response(response)
    },
    async handle_login_response (response) {
      console.log(response)
      if(response === undefined) {
        this.is_authenticated = 'false'
        await this.$router.push({ name: 'Home' })
      } else if (response.status === 200) {
        this.$store.commit('users/set_is_authenticated', 'true')
        await this.$store.dispatch('users/get_user_details', response.data['id'])
        await this.$store.dispatch('users/get_user_groups')
        await this.$router.push({ name: 'Kubeportal' })
      }
    }
  },
  async mounted () {
    let response
    response = await backend.read('/api/')
    this.$store.commit('api/set_csrf_token', response.data['csrf_token'])
    this.$store.commit('api/set_api_version', response.data['default_api_version'])
  }
}
</script>

<style scoped lang="scss">
  .logincard {
    margin: auto;
    width: 25%;
    min-width: 300px;
  }
  .signin {
    color: floralwhite;
    background-color: #689F38;
    margin: auto;
    width: 100%
  }
  .text, .row {
    margin: auto;
  }
  .card-header {
    margin-bottom: 1vh;
  }
  .alert {
    margin: 1vw 0 1vw 0;
  }
</style>
