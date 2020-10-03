<template>
  <ContentCardHeader class="wrapper">
    <b-card class="maincard-adapt">
      <b-card-header>Cluster</b-card-header>
      <b-card-body>
      </b-card-body>
    </b-card>
  </ContentCardHeader>
</template>

<script>
import ContentCardHeader from "@/components/ContentCardHeader";

export default {
  name: 'Config',
  components: { ContentCardHeader },
  data () {
    return {
      current_user: this.$store.getters['users/get_user_details']
    }
  }
}
</script>

<style scoped lang="scss">
  .config {
    display: inline;
  }
  .wrapper {
    height: auto !important;
  }
  div.card {
    min-width: 300px;
    max-width: 100%;
    max-height: 100%;
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
