<template>
  <v-card class="app">
    <v-toolbar flat class="blue-grey darken-4 toolbar">
      <v-icon class="icon">mdi-view-dashboard-variant</v-icon>
      <v-toolbar-title class="title">Data Science Cluster</v-toolbar-title>
    </v-toolbar>

    <v-tabs vertical dark class="sidenav">
      <v-tab>
        <v-icon class="icon" left>mdi-home-heart</v-icon>
        <div class="title"><small>Welcome</small></div>
      </v-tab>
      <v-tab>
        <v-icon class="icon" left>mdi-file-document-outline</v-icon>
        <div class="title"><small>Config</small></div>
      </v-tab>
      <v-tab>
        <v-icon class="icon" left>mdi-chart-pie</v-icon>
        <div class="title"><small>Statistics</small></div>
      </v-tab>
      <v-tab>
        <v-icon class="icon" left>mdi-tools</v-icon>
        <div class="title"><small>Admin</small></div>
      </v-tab>
      <v-tab>
        <v-icon class="icon" left>mdi-logout-variant</v-icon>
        <div class="title"><small>Logout</small></div>
      </v-tab>

      <v-tab-item class="items">
        <v-card flat>
          <v-card-text>
            <Welcome />
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item class="items">
        <v-card flat>
          <v-card-text>
            <Welcome />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item class="items">
        <v-card flat>
          <v-card-text>
            <Statistics />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item class="items">
        <v-card flat>
          <v-card-text>
            <Welcome />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item class="items">
        <v-card flat>
          <v-card-text>
            <Welcome />
          </v-card-text>
        </v-card>
      </v-tab-item>

    </v-tabs>
  </v-card>
</template>

<script>

import Welcome from '@/components/Welcome'
import Statistics from '@/components/Statistics'

export default {
  name: 'App',

  components: { Statistics, Welcome },
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
    left: 15px;
    color: floralwhite;
  }
  .sidenav {
    height: 100vh;
    position: absolute;
    right: 0;
    min-width: 100px;
  }
  .toolbar {
    color: floralwhite;
  }
  .title {
    padding: 0 1rem 0 3rem;
  }

</style>
