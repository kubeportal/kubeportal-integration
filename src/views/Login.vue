<template>
    <b-card bg-variant="light" class="mt-16 logincard">
      <b-card-header>
        <v-icon class="icon" left>mdi-login-variant</v-icon>
        Kubeportal
      </b-card-header>
      <b-card-body>
        <v-alert class="alert" dense outlined type="error" v-if="is_authenticated !== 'true'">Login Failed.</v-alert>
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
export default {
  name: 'Login',
  data () {
    return {
      is_authenticated: localStorage.getItem('is_authenticated'),
      username: '',
      password: '',
      isSignedIn: ''
    }
  },
  methods: {
    async login () {
      const request_body = { username: this.username, password: this.password }
      const user_data_response = await this.$store.dispatch('users/post_login_data', request_body)
      await this.handle_login_response(user_data_response)
    },
    async signInWithGoogle () {
      try {
        const googleUser = await this.$gAuth.signIn()
        if (!googleUser) {
          return null
        }
        const auth_response = googleUser.getAuthResponse()
        console.log('getAuthResponse', this.$gAuth.GoogleAuth.currentUser.get().getAuthResponse())
        this.isSignedIn = this.$gAuth.isAuthorized
        const response = await this.$store.dispatch('users/authorize_google_user', auth_response)
        await this.handle_login_response(response)
      } catch (error) {
        console.log(error)
      }
    },
    async handle_login_response (user_data_response) {
      if (user_data_response.status === 200) {
        await this.$store.dispatch('users/get_user_details', user_data_response.data['id'])
        this.$store.commit('users/set_is_authenticated', 'true')
        this.set_local_storage()
        await this.$router.push({ name: 'Kubeportal' })
      } else {
        console.log('login failed')
        this.$store.commit('users/set_is_authenticated', 'false')
        await this.$router.push({ name: 'Home' })
      }
    },
    set_local_storage () {
      console.log(`set local storage. authenticated: ${this.$store.getters['users/get_is_authenticated']}`)
      localStorage.setItem('user_token', this.$store.getters['users/get_user_token'])
      localStorage.setItem('firstname', this.$store.getters['users/get_user_firstname'])
      localStorage.setItem('is_authenticated', this.$store.getters['users/get_is_authenticated'])
      localStorage.setItem('user_id', this.$store.getters['users/get_user_id'])
    }
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
