<template>
  <v-card class="bg-gray-700 pt-lg-10">
    <v-tabs vertical >
      <Tab :item=item v-for="item in items" :key="item.id"  />
      <slot />
    </v-tabs>
  </v-card>
</template>
<script>
import TabContent from '../TabContent'
import Tab from './Tab'

export default {
  components: { TabContent, Tab },

  data () {
    return {
      items: [
        { id: 1, name: 'Welcome', iconname: 'mdi-home-heart' },
        { id: 2, name: 'Config', iconname: 'mdi-file-document-outline' },
        { id: 3, name: 'Statistics', iconname: 'mdi-chart-pie' },
        { id: 4, name: 'Admin', iconname: 'mdi-tools' },
        { id: 5, name: 'Logout', iconname: 'mdi-logout-variant' }
      ],
    }
  },
  methods: {

  }
}
</script>
<style scoped lang="scss">
  .activeRoute {
    @apply bg-gray-100;
  }

</style>
