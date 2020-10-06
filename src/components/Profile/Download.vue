<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <div>
          <v-icon class="icon" left>mdi-download</v-icon>
          <a><b>kubectl config</b></a>
        </div>
      </div>
      <div class="col-md-7">
        <p class="content">{{ download_info }}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Download',
  data () {
    return {
      download_info: 'this configuration file is needed for Kubernetes client tools on your computer.\n' +
        'It contains your personal access token.'
    }
  }
}

</script>

<style scoped lang="scss">
  .content {
    max-width: 80%;
  }
  .btn {
    background-color: darkgray;
    padding-right: 1vw
  }
  .btn:hover{
     color: whitesmoke;
  }
  .icon {
    margin-right: 1vw;
  }

</style>
