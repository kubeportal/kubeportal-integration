<template>
  <v-card class="app">
    <v-tabs vertical dark class="sidenav">
      <v-tab>
        <v-icon class="icon" left>mdi-home-heart</v-icon>
        <show-at breakpoint="mediumAndAbove">
          <div class="title"><small>Welcome</small></div>
        </show-at>
      </v-tab>
      <v-tab>
        <v-icon class="icon" left>mdi-file-document-outline</v-icon>
        <show-at breakpoint="mediumAndAbove">
          <div class="title"><small>Cluster</small></div>
        </show-at>
      </v-tab>
      <v-tab>
        <v-icon class="icon" left>mdi-chart-pie</v-icon>
        <show-at breakpoint="mediumAndAbove">
          <div class="title"><small>Statistics</small></div>
        </show-at>
      </v-tab>
      <v-tab>
        <v-icon class="icon" left>mdi-file-edit-outline</v-icon>
        <show-at breakpoint="mediumAndAbove">
          <div class="title"><small>Generator</small></div>
        </show-at>
      </v-tab>
      <v-tab @click="openAdmin">
        <v-icon class="icon" left>mdi-tools</v-icon>
        <show-at breakpoint="mediumAndAbove">
          <div class="title"><small>Admin</small></div>
        </show-at>
      </v-tab>
      <v-tab>
        <v-icon class="icon" left>mdi-cog-outline</v-icon>
        <show-at breakpoint="mediumAndAbove">
          <div class="title"><small>Settings</small></div>
        </show-at>
      </v-tab>
      <v-tab @click="logout">
        <v-icon class="icon" left>mdi-logout-variant</v-icon>
        <show-at breakpoint="mediumAndAbove">
          <div class="title"><small>Logout</small></div>
        </show-at>
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
            <Config />
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
            <Generator />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>

import Welcome from '@/components/Welcome'
import Statistics from '@/components/Statistics'
import Config from '@/components/Cluster/Config'
import Generator from '@/components/Generator/Generator'
import { showAt } from 'vue-breakpoints'

export default {
  name: 'App',

  components: { Statistics, Welcome, Config, showAt, Generator },
  data () {
    return {
      statistics: this.$store.getters['statistics/get_statistics']
    }
  },
  methods: {
    get_all_statistic_values () {
      this.statistics.map(this.request_stat_value)
    },
    async request_stat_value (stat) {
      let request_stat = stat.replace(/_/i, '')
      await this.$store.dispatch('statistics/get_statistic_stat', request_stat)
    },
    logout () {
      this.$store.commit('users/set_user', {})
      this.$store.commit('statistics/update_statistics', [])
      this.$store.commit('users/set_token', '')
      this.$store.commit('statistics/update_webapps', [])
      this.$store.commit('users/set_is_authenticated', '')
      this.$router.push({ name: 'Home' })
    },
    openAdmin () {
      window.location.href = 'https://cluster.datexis.com/admin/'
    }
  },
  computed: {
    userIsAdmin () {
      let current_user = this.$store.getters['users/get_current_user']
      return current_user['role'] === 'admin'
    }
  },
  created () {
    if(this.$store.getters['users/get_is_authenticated'] === '') {
      this.$router.push({ name: 'Home' })
    } else if (this.$store.getters['users/get_is_authenticated'] === true) {
      this.get_all_statistic_values()
    }
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
    max-height: 150vh;
    min-height: 95vh;
    position: absolute;
    left: -2px;
    top: -2px;
    min-width: 100px;
  }
  .title {
    padding: 0 1rem 0 3rem;
  }
  .items {
    margin-left: 1vw;
  }

</style>
