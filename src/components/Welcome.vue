<template>
  <div>
    <ContentCardHeader class="wrapper">
      <b-card bg-variant="light" class="maincard">
        <b-card-body>
          <b-card-text>
            Hello: {{ this.current_user_firstname }} !
          </b-card-text>
        </b-card-body>
      </b-card>
    </ContentCardHeader>
   <WebAppContainer />
  </div>
</template>

<script>
import WebAppContainer from './WebAppContainer'
import ContentCardHeader from "@/components/ContentCardHeader";

export default {
  name: 'Welcome',
  components: { ContentCardHeader, WebAppContainer },
  data () {
    return {
      current_user_firstname: this.$store.getters['users/get_current_user_firstname']
    }
  },
  methods: {
    get_cluster_infos () {
      let cluster_request = this.$store.getters['statistics/get_cluster_request_info']
      cluster_request.map(info => this.request_infos(info))
    },
    async request_infos (info) {
      await this.$store.dispatch('statistics/get_cluster_info', info)
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
    height: 20vh !important;
  }

</style>
