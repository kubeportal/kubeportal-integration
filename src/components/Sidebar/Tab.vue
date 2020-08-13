<template>
    <v-tab class="bg-gray-700" @click="activeTab = item" :class="{ active: activeTab }">
      <v-icon class="icon" >{{ item.iconname }}</v-icon>
      <span>{{ item.name }}</span>
    </v-tab>
</template>

<script>
export default {
  name: 'Tab',
  props: ['item'],

  components: {
  },
  data () {
    return {
      activeTab: 1
    }
  }

}
</script>

<style scoped>
  .icon {
    position: absolute;
    left: 0.8vw;
    color: floralwhite !important;
  }
  span {
    padding-left: 2vw;
    padding-right: 1vw;
    color: floralwhite !important;
  }

</style>
