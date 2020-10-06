<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600" class="overlay">
      <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on" class="float-right icon">mdi-account-edit</v-icon>
      </template>
      <v-card>
        <v-card-text>
          <v-card-title>change your primary email: {{ this.primary_email }}</v-card-title>
          <Dropdown class="dropdown" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="discard_changes()">Discard</v-btn>
          <v-btn color="green darken-1" text @click="save_changes()">Apply Changes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Dropdown from '@/components/Profile/Dropdown'
export default {
  name: 'EditModal',
  components: { Dropdown },
  data () {
    return {
      dialog: false,
      current_user: this.$store.getters['users/get_user_details'],
      primary_email: this.$store.getters['users/get_user_details']['primary_email']
    }
  },
  methods: {
    discard_changes () {
      this.dialog === false ? this.dialog = true : this.dialog = false
    },
    save_changes () {
      this.$store.dispatch('users/update_user', { 'primary_email': this.primary_email })
      this.dialog === false ? this.dialog = true : this.dialog = false
    },
    change_primary_email (email) {
      console.log('change email')
      this.primary_email = email
    }
  }
}
</script>

<style scoped>
.icon:hover {
  cursor: pointer;
}
.icon {
  margin-right: 1vw;
}
.dropdown {
  margin-left: 1vw;
}

</style>
