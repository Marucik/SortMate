<template>
  <div class="admin-wrapper">
    <div class="admin-header">
      <h2 class="header-title" @click="goToHome">
        Sort<span>Mate</span> Admin
      </h2>
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
    logoutUser() {
      localStorage.clear("token");
      this.$router.push("/login");
    },
    filterRequests(id) {
      setTimeout(() => {
        this.requests = this.requests.filter(element => element.id !== id);
      }, 300);
      this.$toast.success("Request accepted!");
    },
    goToHome() {
      this.$router.push("/");
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

.header-title {
  cursor: pointer;
}

.header-title span {
  color: purple;
}
</style>
