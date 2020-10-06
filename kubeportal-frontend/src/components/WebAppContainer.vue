<template>
  <div class="my-4 container-sm ">
    <b-button v-for="app in webapps" :key="app.index" class="app-button">
      {{ app.link_name }}
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'WebAppContainer',
  computed: {
    webapps () {
      return this.$store.getters['users/get_user_webapps']
    }
  },
  async created () {
    await this.$store.dispatch('users/get_user_webapps')
  }
}
</script>

<style scoped lang="scss">
  .app-button {
    margin: 2vw 2vw 0vw 0vw;
    width: 20%;
    min-width: 110px;
    height: 8vh;
    color: white;
    transition: 0.3s ease;
    opacity: 0.8;
    transform: translate(0, 0);
    -ms-transform: translate(0, 0%);
    background-color: #689F38;
    border-color: #689F38;
  }
  .app-button:hover {
    opacity: 1;
    transform: scale(1.04);
  }
</style>
