<template>
  <div class="form-container">
    <form v-on:submit.prevent="loginUser" class="form-wrapper">
      <h3 class="header" @click="goToHome">Sort<span>Mate</span></h3>
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
  </div>
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
        const userToken = await axios.post("/api/users/login", {
          login: this.login,
          password: this.passowrd
        });

        localStorage.token = userToken.data;

        this.$router.push("/admin");
      } catch {
        this.$toast.error("Bad login or password.");
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

.header {
  margin: 0;
  margin-bottom: 1rem;
}

.header:hover {
  cursor: pointer;
}

.header span {
  color: purple;
}

.form-wrapper {
  background-color: #fff;
  border-radius: 10px;
  padding: 2rem;
}

.input-wrapper {
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 100%;
  padding-bottom: 0.5rem;
}

.input-wrapper:nth-last-of-type(1) {
  padding-bottom: 0;
}

.login-button {
  margin-top: 1rem;
  width: 100%;
}
</style>
