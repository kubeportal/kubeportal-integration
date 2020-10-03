<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-input contenteditable="false" v-bind="attrs" v-on="on">{{ primary_email }}</v-input>
      </template>
      <v-list>
        <v-list-item v-for="(email, index) in current_user_emails" :key="index">
          <v-list-item-title @click="change_email(email)">{{ email }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  data () {
    return {
      primary_email: this.$store.getters['users/get_user_details']['primary_email'],
      current_user_emails: this.$store.getters['users/get_user_details']['all_emails']
    }
  },
  methods: {
    change_email (email) {
      console.log('click')
      this.primary_email = email
      this.$emit('change_primary_email')
    }
  }
}
</script>

<style scoped>

</style>
