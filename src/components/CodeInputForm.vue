<template>
  <div class="formWrapper">
    <div class="header">
      <button class="closeBtn" @click="closeForm">X</button>
    </div>
    <div class="form">
      <div class="inputWrapper">
        <label for="productCode">Product code:</label>
        <input type="text" name="productCode" v-model="code" />
      </div>
      <button class="requestSubmit" @click="checkCode">
        Check code
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CodeInputForm",
  data() {
    return {
      code: ""
    };
  },
  methods: {
    closeForm() {
      this.$emit("closeForm");
    },
    async checkCode() {
      if (this.code !== "")
        try {
          const result = await axios.get(`/api/products/${this.code}`);

          this.$emit("scan", {
            isPresent: true,
            code: this.code,
            data: result.data
          });
          return;
        } catch (error) {
          this.$emit("scan", {
            isPresent: false,
            code: this.code,
            data: null
          });
          return;
        }
    }
  }
};
</script>

<style>
input,
label {
  display: block;
}

.formWrapper {
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

.header {
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
}

.form {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 1rem;
}

.inputWrapper {
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 70%;
  padding-bottom: 0.5rem;
}

.inputWrapper:nth-last-of-type(1) {
  padding-bottom: 0;
}

.requestSubmit {
  width: 70%;
  margin: 1rem 0;
}

.closeBtn {
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 2rem;
  padding: 0 1rem;
  cursor: pointer;
}
</style>
