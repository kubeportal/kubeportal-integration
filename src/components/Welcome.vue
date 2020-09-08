<template>
  <div>
    <ContentCardHeader class="wrapper">
      <b-card bg-variant="light" class="maincard">
        <b-card-body>
          <b-card-text>
            Hello: {{ this.current_user.firstname }} !
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
      statistics: this.$store.getters['statistics/get_api_statistics'],
      current_user: this.$store.getters['users/get_current_user']
    }
  },
  methods: {
    get_all_statistic_values () {
      this.statistics.map(stat => this.request_stat_value(stat))
    },
    async request_stat_value (stat) {
      let request_stat = stat.replace(/_/i, '')
      await this.$store.dispatch('statistics/get_statistics', request_stat)
      console.log(this.$store.getters['statistics/get_statistics'])
    }
  },
  created () {
    this.get_all_statistic_values()
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
