<template>
  <ContentCardHeader class="wrapper">
  <b-card class="maincard">
    <b-card-header>
      Cluster Statistics
    </b-card-header>

    <div>
    <v-simple-table fixed-header>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="first text-left">Name</th>
          <th class="second text-left">Value</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in all_statistics" :key="item.index">
          <td>{{ Object.keys(item)[0] }}</td>
          <td>{{ Object.values(item)[0]}}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
    </div>
  </b-card>
  </ContentCardHeader>
</template>

<script>

import ContentCardHeader from "@/components/ContentCardHeader";
export default {
  name: 'Statistics',
  components: { ContentCardHeader },
  computed: {
    all_statistics () {
      console.log(this.$store.getters['statistics/get_statistics'])
      return this.$store.getters['statistics/get_statistics']
    }
  }
}
</script>

<style scoped lang="scss">
  .first {
    width: 30rem;
  }
  .wrapper {
    height: 70vh !important;
  }
</style>
