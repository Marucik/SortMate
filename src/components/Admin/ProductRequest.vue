<template>
  <div class="request-wrapper" :class="{ fadeOut: accepted }">
    <div class="data-wrapper">
      <p class="data-label">Code:</p>
      <p>{{ request.code }}</p>
    </div>
    <div class="data-wrapper">
      <p class="data-label">Name:</p>
      <p>{{ request.name }}</p>
    </div>
    <div class="data-wrapper">
      <p class="data-label">Description:</p>
      <p>{{ request.description }}</p>
    </div>
    <button @click="acceptRequest">Accept request</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductRequest",
  props: ["request"],
  data() {
    return {
      accepted: false
    };
  },
  methods: {
    async acceptRequest() {
      try {
        await axios.post(`/api/product-requests/${this.request.id}:accept`);
        this.accepted = true;
        this.$emit("requestAccepted", this.request.id);
      } catch {
        this.$toast.error("Failed to accept request.");
      }
    }
  }
};
</script>

<style scoped>
.request-wrapper {
  width: 350px;
  /* height: 250px; */
  background-color: white;
  margin: 1rem 0;
  padding: 1rem;
}

.data-label {
  margin: 0;
}

.fadeOut {
  animation: fadeOut 0.3s ease-out;
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
