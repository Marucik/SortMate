<template>
  <div class="admin-wrapper">
    <div class="admin-header">
      <h2 class="header-title">SortMate Admin</h2>
      <button class="logout-button" @click="logoutUser">Logout</button>
    </div>
    <div class="admin-main">
      <ProductRequest
        v-for="request in requests"
        @requestAccepted="filterRequests"
        :key="request.id"
        :request="request"
      />
    </div>
  </div>
</template>

<script>
import ProductRequest from "../components/Admin/ProductRequest.vue";
import axios from "axios";

export default {
  name: "Admin",
  components: { ProductRequest },
  data() {
    return {
      requests: []
    };
  },
  async beforeMount() {
    let response = await axios.get("/api/product-requests");

    this.requests = response.data;
  },
  methods: {
    logoutUser() {
      localStorage.authenticated = false;
      this.$router.push("/login");
    },
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
.admin-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
}

.admin-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: white;
}

.header-title {
  margin: 0;
}
</style>
