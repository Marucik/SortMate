<template>
  <v-dialog v-model="isVisible" persistent max-width="290">
    <v-card>
      <v-card-title class="text-h5">
        Add new user
      </v-card-title>
      <v-card-text>
        <v-form
          v-on:submit.prevent="createUser"
          ref="newUserForm"
          class="form-wrapper"
        >
          <v-text-field label="Login" v-model="login"></v-text-field>
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
          ></v-text-field>
          <v-btn :loading="loading" color="accent" block type="submit"
            >Create user</v-btn
          >
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-container style="padding: 0">
          <v-row no-gutters>
            <v-col>
              <v-btn color="darken-1" text @click="closeModal">
                Close
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  name: "AddUser",
  props: ["isVisible"],
  data() {
    return {
      login: "",
      password: "",
      loading: false
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
      this.$refs.newUserForm.reset();
    },
    async createUser() {
      this.loading = true;
      try {
        await axios.post(
          "/api/users/register",
          {
            login: this.login,
            password: this.password
          },
          {
            headers: { Authorization: `Bearer: ${localStorage.token}` }
          }
        );

        this.$toast.success("Created new user");
      } catch {
        this.$toast.error("Bad login or password.");
      } finally {
        this.loading = false;
        this.closeModal();
      }
    }
  }
};
</script>

<style></style>
