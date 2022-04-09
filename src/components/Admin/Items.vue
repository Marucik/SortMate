<template>
  <div class="wrapper">
    <v-card
      v-for="item in items"
      v-bind:key="item.id"
      class="mx-auto"
      max-width="350"
    >
      <v-card-text>
        <div>Code</div>
        <p class="text-h4 text--primary">
          {{ item.code }}
        </p>
        <p style="margin: 0">Name:</p>
        <div class="text--primary">
          {{ item.name }}
        </div>
        <p style="margin: 0">Type:</p>
        <div class="text--primary">
          {{ item.segregationType }}
        </div>
        <p style="margin: 0">Description:</p>
        <div class="text--primary">
          {{ item.description }}
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Items",
  data() {
    return {
      items: []
    };
  },
  async beforeMount() {
    try {
      let response = await axios.get("/api/products", {
        headers: { Authorization: `Bearer: ${localStorage.token}` }
      });

      this.items = response.data;
    } catch (error) {
      this.logoutUser();
      this.$toast.error("Token expired. Please login again.");
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}
</style>
