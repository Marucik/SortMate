<template>
  <v-dialog v-model="isVisible" persistent max-width="290">
    <v-card>
      <v-card-title class="text-h5">
        Create request
      </v-card-title>
      <v-card-text>
        <v-form ref="newProductForm">
          <v-text-field
            label="Code"
            id="code"
            autocomplete="off"
            v-model="form.code"
          ></v-text-field>
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
              <v-btn color="darken-1" text @click="closeModal">
                Close
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <v-btn color="green darken-1" text @click="createProduct">
                Create product
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
  name: "AddProduct",
  props: ["isVisible"],
  data() {
    return {
      form: {
        code: "",
        productName: "",
        productDescription: "",
        segregationType: ""
      },
      segregations: ["plastic", "glass", "paper"]
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
      this.$refs.newProductForm.reset();
    },
    async createProduct() {
      try {
        await axios.post("/api/products", {
          name: this.form.productName,
          code: this.form.code,
          description: this.form.productDescription,
          segregationType: this.form.segregationType
        });

        this.$toast.success("Product created!");
      } catch (error) {
        this.$toast.error("Something went wrong.");
      } finally {
        this.closeModal();
      }
    }
  }
};
</script>

<style></style>
