<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4">
        <b-card class="profile">
          <b-card-header>
            <v-icon class="icon">mdi-account</v-icon>Profile</b-card-header>
            <b-card-body class="profile_body">
              <b-card-sub-title>Firstname</b-card-sub-title>
              <b-card-text>{{ current_user['firstname'] }}</b-card-text>
              <b-card-sub-title>Last name</b-card-sub-title>
              <b-card-text>{{ current_user['name'] }}</b-card-text>
              <b-card-sub-title>Primary Email</b-card-sub-title>
              <b-card-text>{{ current_user['primary_email'] }}</b-card-text>
              <b-card-sub-title>User groups</b-card-sub-title>
              <b-card-text>{{ current_user['user_groups'].join(', ') }}</b-card-text>
              <b-card-sub-title>Cluster access</b-card-sub-title>
              <b-card-text>{{ current_user['cluster_access'] }}</b-card-text>
          </b-card-body>
        </b-card>
      </div>
        <div class="col-md-6">
          <KubeConfig :yamlfile="yamlfile" />
        </div>
    </div>
  </div>
</template>

<script>

import ContentCardHeader from '@/components/ContentCardHeader'
import KubeConfig from '@/components/Profile/KubeConfig'
export default {
  name: 'Profile',
  components: { ContentCardHeader, KubeConfig },

  computed: {
    current_user () {
      return this.$store.getters['users/get_user_details']
    },
    yamlfile () {
      let string =
        'apiVersion: v1\nclusters:\n  - cluster:\n      insecure-skip-tls-verify: true\n      server: https://datexis-master2.beuth-hochschule.de:6443\n    name: data_science_cluster\ncontexts:\n  - context:\n      cluster: data_science_cluster\n      namespace: default\n      user: ' + this.current_user.username + '\n    name: ' + this.current_user.username + '\ncurrent-context: ' + this.current_user.username + '\nkind: Cluster\npreferences: {}\nusers:\n  - name: ' + this.current_user.username + '\n    user:\n      token: eyJhbllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllfmqfTjXg\n'
      return string
    }
  }
}
</script>

<style>
  .profile {
    background: rgba(255, 255, 255, 1);
  }
  p, div>.card-header {
    color: black !important;
  }

  .icon {
    margin-right: 1vw;
  }
  .profile_body {
    margin-top: 3vh;
  }
  @media (max-device-width : 767px) {
    .row {
      max-width: 26rem;
    }
  }
  @media (max-device-width : 400px) {
    .row {
      max-width: 18rem;
    }
  }
</style>
