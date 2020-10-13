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
        <v-icon class="icon" left>mdi-account</v-icon>
        <show-at breakpoint="mediumAndAbove">
          <div class="title"><small>Profile</small></div>
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
      <v-tab v-if="userIsAdmin" @click="openAdmin">
        <v-icon class="icon" left>mdi-tools</v-icon>
        <show-at breakpoint="mediumAndAbove">
          <div class="title"><small>Admin</small></div>
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
            <Profile />
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

import Welcome from '@/views/Welcome'
import Statistics from '@/views/Statistics'
import Config from '@/views/Cluster'
import Generator from '@/views/Generator'
import Profile from '@/components/Profile/Profile'
import { showAt } from 'vue-breakpoints'

export default {
  name: 'App',

  components: { Statistics, Welcome, Config, Generator, Profile, showAt },
  data () {
    return {
      statistics: this.$store.getters['statistics/get_cluster_info']
    }
  },
  methods: {
    get_all_statistic_values () {
      this.statistics.map(this.request_cluster_info)
    },
    async request_cluster_info (cluster_info) {
      await this.$store.dispatch('statistics/get_cluster_info', cluster_info)
    },
    logout () {
      this.$store.commit('users/set_user_id', null)
      this.$store.commit('users/set_user_firstname', '')
      this.$store.commit('users/set_is_authenticated', '')
      this.$store.commit('users/set_user_details', {})
      this.$store.commit('users/set_user_webapps', [])
      this.$store.commit('statistics/set_cluster_info', [])
      this.$store.commit('api/set_csrf_token', '')
      this.$store.commit('api/set_access_token', '')

      this.$router.push({ name: 'Home' })
    },
    openAdmin () {
      window.location.href = 'https://cluster.datexis.com/admin/'
    }
  },
  computed: {
    userIsAdmin () {
      let current_user = this.$store.getters['users/get_user_details']
      console.log('current user')
      console.log(current_user)
      return current_user['admin']
    }
  },
  async mounted () {
    if(this.$store.getters['users/get_is_authenticated'] === 'true') {
      const user_id = this.$store.getters['users/get_user_id']
      /*if (user_id === undefined) {
        await this.$store.dispatch('users/get_user_details', localStorage.getItem('user_id'))
        this.$store.commit('users/set_user_firstname', localStorage.getItem('firstname'))
        this.$store.commit('users/set_is_authenticated', 'true')
      }*/
    } else {
      await this.$router.push({ name: 'Home' })
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
