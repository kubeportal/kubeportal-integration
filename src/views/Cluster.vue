<template>
    <b-card class="maincard-adapt">
      <b-card-header>Cluster</b-card-header>
      <b-card-body>
      </b-card-body>
    </b-card>
</template>

<script>

export default {
  name: 'Cluster',
  data () {
    return {
      current_user: this.$store.getters['users/get_user_details']
    }
  }
}
</script>

<style scoped lang="scss">


</style>
