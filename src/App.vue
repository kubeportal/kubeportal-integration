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
              <span class="title"><small>Welcome</small></span>
            </v-tab>
            <v-tab>
              <v-icon class="icon" left>mdi-file-document-outline</v-icon>
              <span class="title"><small>Config</small></span>
            </v-tab>
            <v-tab>
              <v-icon class="icon" left>mdi-chart-pie</v-icon>
              <span class="title"><small>Statistics</small></span>
            </v-tab>
            <v-tab>
              <v-icon class="icon" left>mdi-tools</v-icon>
              <span class="title"><small>Admin</small></span>
            </v-tab>
            <v-tab>
            <v-icon class="icon" left>mdi-logout-variant</v-icon>
              <span class="title"><small>Logout</small></span>
            </v-tab>

            <v-tab-item class="items">
              <v-card flat>
                <v-card-text>
                 <Welcome />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <p> Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Nunc sed turpis.
                  </p>
                  <p> Suspendisse feugiat. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In hac habitasse platea dictumst. Fusce ac felis sit amet ligula pharetra condimentum.
                  </p>
                  <p> Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Nam commodo suscipit quam. In consectetuer turpis ut velit. Sed cursus turpis vitae tortor. Aliquam eu nunc.
                  </p>
                  <p> Etiam ut purus mattis mauris sodales aliquam. Ut varius tincidunt libero. Aenean viverra rhoncus pede. Duis leo. Fusce fermentum odio nec arcu.
                  </p>
                  <p class="mb-0"> Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
                  </p>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <p>
                    Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
                  </p>
                  <p class="mb-0">
                    Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.
                  </p>
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

export default {
name: 'App',

components: {
  Welcome
},

}
</script>

<style scoped lang="scss">

  .icon {
    position: absolute;
    left: 1vw;
    margin: 0 1vw 0 0;
  }
  .sidenav {
    height: 100vh;
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

</style>
