<template>
  <div>
  <Profile class="profile" :current_user="current_user"/>
  <b-card class="maincard-adapt">
  <b-card-body>
    <div class="container-fluid">
    <div class="row">
      <div class="col-sm">
        <KubeConfig :yamlfile="yamlfile" />
      </div>
      <div class="col-sm">
        <KubeInstallation  />
      </div>
    </div>
    </div>
  </b-card-body>
  </b-card>
  </div>
</template>

<script>
import KubeConfig from './KubeConfig'
import KubeInstallation from './KubeInstallation'
import Profile from "@/components/Cluster/Profile";

export default {
  name: 'Config',
  components: { KubeInstallation, KubeConfig, Profile },
  data () {
    return {
      current_user: this.$store.getters['users/get_current_user']
    }
  },

  computed: {
    yamlfile () {
      let string =
        'apiVersion: v1\nclusters:\n  - cluster:\n      insecure-skip-tls-verify: true\n      server: https://datexis-master2.beuth-hochschule.de:6443\n    name: data_science_cluster\ncontexts:\n  - context:\n      cluster: data_science_cluster\n      namespace: default\n      user: ' + this.current_user.username + '\n    name: ' + this.current_user.username + '\ncurrent-context: ' + this.current_user.username + '\nkind: Cluster\npreferences: {}\nusers:\n  - name: ' + this.current_user.username + '\n    user:\n      token: eyJhbllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllfmqfTjXg\n'
      return string
    }
  }
}
</script>

<style scoped lang="scss">
  .config {
    display: inline;
  }
  div.card {
    min-width: 300px;
    max-width: 100%;
  }

  .maincard-adapt {
    max-width: 100%;
  }

  @media (max-device-width: 1519px) {

    .maincard-adapt {
      width: 86vw;
      max-width: 100%
    }

  }

</style>
