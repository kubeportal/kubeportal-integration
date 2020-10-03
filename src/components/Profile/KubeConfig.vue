<template>
  <b-card class="yaml-card">
    <b-card-header>Config</b-card-header>
    <b-card-body>
        <pre>{{ yamlfile }}</pre>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: 'KubeConfig',
  props: ['yamlfile']
}
</script>

<style scoped lang="scss">

</style>
