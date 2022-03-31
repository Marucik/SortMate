<template>
  <v-dialog v-model="isVisible" persistent max-width="290">
    <v-card>
      <v-card-title class="text-h5">
        Manually enter code
      </v-card-title>
      <v-card-text>
        <v-form ref="codeForm">
          <v-text-field
            :rules="[rules.required]"
            label="Code"
            v-model="code"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-container style="padding: 0">
          <v-row no-gutters>
            <v-col>
              <v-btn color="darken-1" text @click="closeForm">
                Close
              </v-btn>
            </v-col>
            <v-spacer />
            <v-col>
              <v-btn color="green darken-1" text @click="checkCode">
                Check
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
  name: "CodeInputForm",
  props: ["isVisible"],
  data() {
    return {
      code: "",
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  methods: {
    closeForm() {
      this.$emit("closeForm");
      this.$refs.codeForm.reset();
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
        } catch (error) {
          this.$emit("scan", {
            isPresent: false,
            code: this.code,
            data: null
          });
        } finally {
          this.$refs.codeForm.reset();
        }
    }
  }
};
</script>

<style></style>
