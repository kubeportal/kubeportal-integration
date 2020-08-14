<template>
  <v-app >
    <v-main>
      <Kubeportal />
    </v-main>
  </v-app>
</template>

<script>

import Welcome from './components/Welcome'
import Statistics from './components/Statistics'
import Kubeportal from './views/Kubeportal'

export default {
  name: 'App',

  components: { Statistics, Welcome, Kubeportal },
  data () {
    return {
      metrics: this.$store.getters['get_metrics']
    }
  },
  methods: {
    get_all_statistic_values () {
      this.metrics.map(this.request_metric_value)
    },
    async request_metric_value (metric) {
      let request_metric = metric.replace(/_/i, '')
      await this.$store.dispatch('get_statistic_metric', request_metric)
    }
  },
  created () {
    this.get_all_statistic_values()
  }
}
</script>

<style scoped lang="scss">
  .icon {
    position: absolute;
    left: 1vw
  }

  .sidenav {
    height: 100vh;
    position: absolute;
    right: 0;
  }
  .toolbar {
    background: #424242;
  }
  .title {
    padding: 0 2vw 0 4vw;
  }
  .app {
    background: #424242;
  }
  .v-icon.v-icon {
    align-items: baseline;
  }
</style>
