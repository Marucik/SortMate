<template>
  <div class="request-container">
    <div class="request-header">
      <button class="close-btn" @click="emitCloseRequest">X</button>
    </div>
    <div class="request-form">
      <div class="input-wrapper">
        <label for="productCode">Product code:</label>
        <input type="text" name="productCode" disabled :value="code" />
      </div>
      <div class="input-wrapper">
        <label for="productName">Product name:</label>
        <input type="text" name="productName" v-model="form.productName" />
      </div>
      <div class="input-wrapper">
        <label for="productDescription">Product description:</label>
        <input
          type="text"
          name="productDescription"
          v-model="form.productDescription"
        />
      </div>
      <div class="input-wrapper">
        <label for="segregationType">Segregation type:</label>
        <select
          type="text"
          name="segregationType"
          v-model="form.segregationType"
        >
          <option value="plastic">Plastic</option>
          <option value="glass">Glass</option>
          <option value="paper">Paper</option>
        </select>
      </div>
      <button class="request-submit" @click="sendRequest">Send request</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Request",
  props: ["code"],
  data() {
    return {
      form: {
        productName: "",
        productDescription: "",
        segregationType: ""
      }
    };
  },
  methods: {
    emitCloseRequest() {
      this.$emit("closeRequest");
    },
    async sendRequest() {
      try {
        await axios.post("/api/product-requests", {
          name: this.form.productName,
          code: this.code,
          description: this.form.productDescription,
          segregationType: this.form.segregationType
        });
      } catch (error) {
        console.error(error);
      }

      this.$toast.success("Request sent!");
      this.$emit("closeRequest");
    }
  }
};
</script>

<style scoped>
input,
label {
  display: block;
}

.request-container {
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
}

.request-header {
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
}

.request-form {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 1rem;
}

.request-form > .input-wrapper {
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 70%;
  padding-bottom: 0.5rem;
}

.request-form > .input-wrapper:nth-last-of-type(1) {
  padding-bottom: 0;
}

.request-submit {
  width: 70%;
  margin: 1rem 0;
}

.close-btn {
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 2rem;
  padding: 0 1rem;
}
</style>
