<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600" class="overlay">
      <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on" class="float-right icon">mdi-account-edit</v-icon>
      </template>
      <v-card>
        <v-card-text>
          <v-card-title>change your primary email: {{ this.current_primary_email }} </v-card-title>
          <Dropdown :primary_email="selected_primary_email" @change_primary_email="change_primary_email" class="dropdown" />
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
      current_primary_email: this.$store.getters['users/get_user_details']['primary_email'],
      selected_primary_email: this.$store.getters['users/get_user_details']['primary_email']
    }
  },
  computed: {
    current_user () { return this.$store.getters['users/get_user_details'] }
  },
  methods: {
    discard_changes () {
      console.log('discard changes')
      this.dialog === false ? this.dialog = true : this.dialog = false
    },
    async save_changes () {
      console.log('save changes')
      const response = this.$store.dispatch('users/update_user', { 'id': this.current_user['id'], 'primary_email': this.selected_primary_email })
      this.dialog === false ? this.dialog = true : this.dialog = false
      this.primary_email = this.$store.getters['users/get_user_details']['primary_email']
    },
    change_primary_email (email) {
      console.log(email)
      this.selected_primary_email = email
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
