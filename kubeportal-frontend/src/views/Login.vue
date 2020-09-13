<template>
    <b-card bg-variant="light" class="mt-16 logincard">
      <b-card-header>
        <v-icon class="icon" left>mdi-login-variant</v-icon>
        Kubeportal
      </b-card-header>
      <b-card-body>
        <v-alert class="alert" dense outlined type="error" v-if="is_authenticated==='failed'"> Login Failed.</v-alert>
        <b-card-text>
        <v-text-field label="user name" v-model="username" required></v-text-field>
        <v-text-field type="password" v-model="password" label="password" required></v-text-field>
      </b-card-text>
        <div class="row">
          <b-button class="signin" @click="login">
            Sign In
          </b-button>
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
      username: '',
      password: '',
      isSignIn: ''
    }
  },
  methods: {
    async login () {
      const request_body = { username: this.username, password: this.password }
      const response = await this.$store.dispatch('users/post_login_data', request_body)
      this.handle_login_response(response)
    },
    async signInWithGoogle () {
      try {
        const googleUser = await this.$gAuth.signIn()
        if (!googleUser) {
          return null
        }
        const auth_response = googleUser.getAuthResponse()
        console.log('getAuthResponse', this.$gAuth.GoogleAuth.currentUser.get().getAuthResponse())
        this.isSignIn = this.$gAuth.isAuthorized
        const response = await this.$store.dispatch('users/authorize_google_user', auth_response)
        await this.handle_login_response(response)
      } catch (error) {
        console.log(error)
      }
    },
    async handle_login_response (response) {
      if (response.status === 200) {
        console.log(response.data)
        console.log(response.header)
        this.$store.commit('users/set_user', response.data)
        this.$store.commit('users/set_is_authenticated', 'true')
        this.$router.push({ name: 'Kubeportal' })
      } else {
        console.log('login failed')
        this.$store.commit('users/set_is_authenticated', 'failed')
        this.$router.push({ name: 'Home' })
      }
    }
  },
  computed: {
    is_authenticated () {
      return this.$store.getters['generator/get_is_authenticated']
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
    width: 75%;
    color: floralwhite;
    background-color: #689F38;
    margin: auto;
  }
  .text {
    margin: auto;
  }
  .card-header {
    margin-bottom: 1vh;
  }
  .alert {
    margin: 1vw 0 1vw 0;
  }

</style>
