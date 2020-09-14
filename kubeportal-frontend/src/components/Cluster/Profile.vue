<template>
  <ContentCardHeader class="wrapper">
    <b-card  class="profile" :current_user="current_user" >
      <b-card-header>Cluster access</b-card-header>
      <b-card-body>
      <b-card-text>
        Fullname: {{ this.current_user.firstname }} {{ this.current_user.name }}
      </b-card-text>
      <b-card-text>
        Username: {{ this.current_user.username }}
      </b-card-text>
      <b-card-text>
        Kubernetes Service Account: {{ this.current_user.service_account }}
      </b-card-text>
      </b-card-body>
    </b-card>
  </ContentCardHeader>
</template>

<script>

import ContentCardHeader from "@/components/ContentCardHeader";
export default {
  name: 'Profile',
  components: { ContentCardHeader },
  props: ['current_user']
}
</script>

<style>
  .profile {
    background: rgba(255, 255, 255, 1);

  }
  p, div>.card-header {
    color: black !important;
  }
  .wrapper {
    height: 35vh !important;
  }
</style>
