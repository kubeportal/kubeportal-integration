<template>

</template>

<script>
export default {
  name: 'Toolbar',

  methods: {
    toggle_nav () {
      console.log(this.$store.state.showNavigation)
      this.$store.commit('toggleShowNavigation')
    }
  }
}
</script>

<style scoped lang="scss">

</style>
