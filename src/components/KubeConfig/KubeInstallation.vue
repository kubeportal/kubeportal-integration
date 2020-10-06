<template>
  <b-card>
    <b-card-header>Using Kubectl</b-card-header>
    <b-card-body>
      <b-card-text>
        <Download />
        <v-divider></v-divider>
        <div class="row">
          <div class="col">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <b-button v-bind="attrs" v-on="on" class="btn btn-secondary" aria-expanded="true" v-b-toggle.accordion-1>
                  <v-icon class="icon" left>mdi-apple</v-icon>
                  <v-icon class="icon" left>mdi-linux</v-icon>
                  <show-at breakpoint="mediumAndAbove">MacOS / Linux</show-at>
                </b-button>
              </template>
              <span>{{ tooltip }}</span>
            </v-tooltip>
            <b-collapse id="accordion-1" v-b-visible accordion="accordion1" role="tabpanel">
              <OSInstallation :instructions="macUnix" />
            </b-collapse>
          </div>
          <div class="col">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <b-button v-bind="attrs" v-on="on" class="btn btn-secondary" aria-expanded="true" v-b-toggle.accordion-2>
                  <v-icon class="icon" left>mdi-microsoft-windows</v-icon>
                 <show-at breakpoint="mediumAndAbove">Windows</show-at>
                </b-button>
              </template>
              <span>{{ tooltip }}</span>
            </v-tooltip>
            <b-collapse id="accordion-2" v-b-visible accordion="accordion2" role="tabpanel">
              <OSInstallation :instructions="windows" />
            </b-collapse>
          </div>
        </div>
      </b-card-text>
    </b-card-body>
  </b-card>
</template>

<script>
import OSInstallation from './OSInstallation'
import KubeConfig from '@/components/KubeConfig/KubeConfig'
import Download from '@/components/Profile/Download'
import { showAt } from 'vue-breakpoints'


export default {
  name: 'KubeInstallation',
  components: { OSInstallation, KubeConfig, Download, showAt },

  data () {
    return {
      tooltip: 'You can test your installation by calling kubectl cluster-info.',
      windows: ['Install kubectl for Windows', 'Navigate to your home directory: cd %USERPROFILE%', 'Create the .kube directory: mkdir .kube', 'Store the config file as .kube/config'],
      macUnix: ['Install kubectl with your package manager', 'Navigate to your home directory: cd ~', 'Create the .kube directory: mkdir .kube', 'Store the config file as .kube/config']
    }
  }
}

</script>

<style scoped lang="scss">
  .btn {
    margin: 2vw 0vw 1vw 0vw;
    color: floralwhite;
    background-color: #689F38 !important;
  }
  .btn:hover {
    background-color: #8BC34A !important;
  }
  .icon {
    color: #F1F8E9;
  }

</style>
