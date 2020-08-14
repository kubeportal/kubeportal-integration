<template>
  <div>
  <b-card bg-variant="light" class="maincard">
    <b-card-text>
      Hello: {{ this.current_user.firstname }} !
    </b-card-text>
    <v-divider class="w-23 my-5" />
    <b-card-text>
      Fullname: {{ this.current_user.firstname }} {{ this.current_user.name }}
    </b-card-text>
    <b-card-text>
      Username: {{ this.current_user.username }}
    </b-card-text>
    <b-card-text>
      Kubernetes Service Account: {{ this.current_user.service_account }}
    </b-card-text>
  </b-card>
   <WebAppContainer />
  </div>
</template>

<script>
import WebAppContainer from './WebAppContainer'

export default {
  name: 'Welcome',
  components: { WebAppContainer },
  data () {
    return {
      current_user: {},
      metrics: this.$store.getters['get_metrics']
    }
  },
  methods: {
    async fetch_userdata () {
      this.current_user = await this.$store.dispatch('get_current_user', 's77518')
    }
  },
  created () {
    this.fetch_userdata()
  }
}
</script>
