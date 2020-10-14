<template>
      <b-card bg-variant="light" class="maincard">
          <b-card-header>
            Hello: {{ this.current_user_firstname }} !
          </b-card-header>
        <WebAppContainer />
      </b-card>
</template>

<script>
import WebAppContainer from '../components/WebAppContainer'

export default {
  name: 'Welcome',
  components: { WebAppContainer },
  data () {
    return {
      current_user_firstname: this.$store.getters['users/get_user_firstname']
    }
  },
  methods: {
    get_cluster_infos () {
      let cluster_request = this.$store.getters['statistics/get_cluster_request_info']
      this.request_infos(cluster_request)
      //cluster_request.map(info => this.request_infos(info))
    },
    async request_infos (infos) {
      await this.$store.dispatch('statistics/get_cluster_infos', infos)
    }
  },
  created () {
    this.get_cluster_infos()
  }
}
</script>

<style scoped lang="scss">
  p {
    color: black !important
  }
  .wrapper {
    height: auto !important;
  }

</style>
