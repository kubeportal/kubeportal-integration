<template>
  <b-card bg-variant="light" class="ma-8">
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
  </b-card>
</template>

<script>

export default {
  name: 'Welcome',

  data () {
    return {
      current_user: {},
      metrics: this.$store.getters['get_metrics']
    }
  },
  methods: {
    async fetch_userdata () {
      this.current_user = await this.$store.dispatch('get_current_user', 's77518')
    },
    get_all_statistic_values () {
      this.metrics.map(this.request_metric_value)
    },
    async request_metric_value (metric) {
      let request_metric = metric.replace(/_/i, '')
      await this.$store.dispatch('get_statistic_metric', request_metric)
    }
  },
  created () {
    this.fetch_userdata()
    this.get_all_statistic_values()
  }
}
</script>
