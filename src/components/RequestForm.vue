<template>
  <v-dialog v-model="isVisible" persistent max-width="290">
    <v-card>
      <v-card-title class="text-h5">
        Create request
      </v-card-title>
      <v-card-text>
        <v-form ref="requestForm">
          <v-text-field
            label="Product name"
            id="name"
            autocomplete="off"
            v-model="form.productName"
          ></v-text-field>
          <v-text-field
            label="Product description"
            id="description"
            autocomplete="off"
            v-model="form.productDescription"
          ></v-text-field>
          <v-select
            label="Segregation type"
            :items="segregations"
            v-model="form.segregationType"
          ></v-select>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-container style="padding: 0">
          <v-row no-gutters>
            <v-col>
              <v-btn color="darken-1" text @click="emitCloseRequest">
                Close
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <v-btn color="green darken-1" text @click="sendRequest">
                Send request
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
  name: "Request",
  props: ["code", "isVisible"],
  data() {
    return {
      form: {
        productName: "",
        productDescription: "",
        segregationType: ""
      },
      segregations: ["plastic", "glass", "paper"]
    };
  },
  methods: {
    emitCloseRequest() {
      this.$emit("closeRequest");
      this.$refs.requestForm.reset();
    },
    async sendRequest() {
      try {
        await axios.post("/api/product-requests", {
          name: this.form.productName,
          code: this.code,
          description: this.form.productDescription,
          segregationType: this.form.segregationType
        });

        this.$toast.success("Request sent!");
      } catch (error) {
        this.$toast.error("Something went wrong.");
      } finally {
        this.$emit("closeRequest");
        this.$refs.requestForm.reset();
      }
    }
  }
};
</script>

<style scoped>
input,
label {
  display: block;
}

.requestContainer {
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

.requestHeader {
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
}

.requestForm {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 1rem;
}

.requestForm > .inputWrapper {
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 70%;
  padding-bottom: 0.5rem;
}

.requestForm > .inputWrapper:nth-last-of-type(1) {
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
}
</style>
