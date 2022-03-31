<template>
  <div class="wrapper">
    <ProductRequest
      v-for="request in requests"
      @requestAccepted="filterRequests"
      :key="request.id"
      :request="request"
    />
  </div>
</template>

<script>
import ProductRequest from "./ProductRequest.vue";
import axios from "axios";

export default {
  components: { ProductRequest },
  name: "Requests",
  data() {
    return {
      requests: []
    };
  },
  async beforeMount() {
    try {
      let response = await axios.get("/api/product-requests", {
        headers: { Authorization: `Bearer: ${localStorage.token}` }
      });

      this.requests = response.data;
    } catch (error) {
      this.logoutUser();
      this.$toast.error("Token expired. Please login again.");
    }
  },
  methods: {
    filterRequests(id) {
      setTimeout(() => {
        this.requests = this.requests.filter(element => element.id !== id);
      }, 300);
      this.$toast.success("Request accepted!");
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
