<template>
  <form v-on:submit.prevent="loginUser" class="form-container">
    <div class="input-wrapper">
      <label for="login">Login:</label>
      <input type="text" name="login" v-model="login" />
    </div>
    <div class="input-wrapper">
      <label for="password">Password:</label>
      <input type="password" name="password" v-model="passowrd" />
    </div>
    <input type="submit" class="login-button" value="Login" />
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      login: "",
      passowrd: "",
      error: undefined
    };
  },
  methods: {
    async loginUser() {
      try {
        await axios.post("/api/user/login", {
          login: this.login,
          password: this.passowrd
        });

        localStorage.authenticated = true;

        this.$router.push("/admin");
      } catch {
        this.$toast.error("Bad login ro password.");
      }
    }
  }
};
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  flex-flow: column;
  width: 50vw;
  padding: 0.1rem 0.5rem;
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
  z-index: 99;
  background-color: #fff;
  border-radius: 10px;
  padding: 2rem;
}

.form-container > .input-wrapper {
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 70%;
  padding-bottom: 0.5rem;
}

.form-container > .input-wrapper:nth-last-of-type(1) {
  padding-bottom: 0;
}

.login-button {
  margin-top: 1rem;
  width: 150px;
}
</style>
