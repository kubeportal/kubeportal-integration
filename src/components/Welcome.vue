<template>
  <b-card bg-variant="light" text-variant="">
    <b-card-text>
      Hello: {{ this.current_user.firstname }} !
    </b-card-text>
    <b-card-text>
      Fullname: {{ this.current_user.firstname }} {{ this.current_user.name }}
    </b-card-text>
    <b-card-text>
      Username: {{ this.current_user.username }}
    </b-card-text>
    <b-card-text>
      Kubernetes Service Account: {{ this.current_user.service_account }}
    </b-card-text>
    <b-button href="#" variant="primary">Go somewhere</b-button>
  </b-card>
</template>

<script>

  export default {
    name: 'Welcome',

    components: {

    },
    data () {
      return {
        current_user: {}
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
