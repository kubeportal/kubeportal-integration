<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-3">
        <b-card class="profile">
          <b-card-header>
            <EditModal class="float-right"></EditModal>
            <v-icon class="icon">mdi-account</v-icon>Profile</b-card-header>
            <b-card-body class="profile_body">
              <b-card-sub-title>Firstname</b-card-sub-title>
              <b-card-text>{{ current_user['firstname'] }}</b-card-text>
              <b-card-sub-title>Last name</b-card-sub-title>
              <b-card-text>{{ current_user['name'] }}</b-card-text>
              <b-card-sub-title>Primary Email</b-card-sub-title>
              <b-card-text> {{ current_user['primary_email'] }}</b-card-text>
              <b-card-sub-title>User groups</b-card-sub-title>
              <b-card-text>{{ user_groups['name'] }}</b-card-text>
              <b-card-sub-title>Cluster access</b-card-sub-title>
              <b-card-text>{{ current_user['cluster_access'] }}</b-card-text>
          </b-card-body>
        </b-card>
      </div>
        <div class="col-lg-7">
          <KubeInstallation class="installation" />
        </div>
    </div>
  </div>
</template>

<script>

import ContentCardHeader from '@/components/ContentCardHeader'
import KubeConfig from '@/components/KubeConfig/KubeConfig'
import KubeInstallation from '@/components/KubeConfig/KubeInstallation'
import EditModal from '@/components/Profile/EditModal'

export default {
  name: 'Profile',
  components: { KubeInstallation, ContentCardHeader, KubeConfig, EditModal },
  data () {
    return {
      primary_email: this.$store.getters['users/get_user_details']['primary_email']
    }
  },
  computed: {
    current_user () { return this.$store.getters['users/get_user_details'] },
    user_groups () { return this.$store.getters['users/get_user_groups'] }
  },
  methods: {
    change_primary_email (email) {
      console.log('click')
      this.primary_email = email
    }
  }
}
</script>

<style>
  .profile {
    background: rgba(255, 255, 255, 1);
    min-width: 180px;
    height: 100%;
  }
  p, div>.card-header {
    color: black !important;
  }
  .profile_body {
    margin-top: 3vh;
    min-width: 149px;
  }
  .installation {
    height: 100%
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
