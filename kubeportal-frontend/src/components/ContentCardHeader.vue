<template>
  <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg">
    <v-row>
      <v-col>
        <slot />
      </v-col>
    </v-row>
  </v-parallax>
</template>

<script>
export default {
  name: 'ContentCardHeader'
}
</script>

<style scoped lang="scss">
</style>
