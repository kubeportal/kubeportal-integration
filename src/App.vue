<template>
  <v-app >
    <v-main>
      <template>
        <v-card class="app">
          <v-toolbar flat dark>
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
    </v-main>
  </v-app>
</template>

<script>

import Welcome from './components/Welcome'
import Statistics from './components/Statistics'

export default {
  name: 'App',

  components: { Statistics, Welcome },
  data () {
    return {
      current_user: {}
    }
  },
  created () {
    let state = this.$store.state
    console.log(state)
    for (let s in state) {
      console.log(s)
    }
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
