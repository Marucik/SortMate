<template>
  <v-dialog v-model="isVisible" persistent width="390">
    <v-card>
      <v-card-title class="text-h5" @click="goToHome">
        Sort<span class="purple--text text--darken-2">Mate</span>
      </v-card-title>
      <v-card-text>
        <v-form v-on:submit.prevent="loginUser" class="form-wrapper">
          <v-text-field label="Login" v-model="login"></v-text-field>
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
          ></v-text-field>
          <v-btn :loading="loading" color="primary" block type="submit"
            >Login</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      login: "",
      password: "",
      error: undefined,
      loading: false,
      isVisible: true
    };
  },
  methods: {
    async loginUser() {
      this.loading = true;
      try {
        const userToken = await axios.post("/api/users/login", {
          login: this.login,
          password: this.password
        });

        localStorage.token = userToken.data;

        this.$router.push("/admin");
      } catch {
        this.$toast.error("Bad login or password.");
      } finally {
        this.loading = false;
      }
    },
    goToHome() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
</style>
