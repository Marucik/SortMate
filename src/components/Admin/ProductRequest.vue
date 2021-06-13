<template>
  <div class="request-wrapper">
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
  methods: {
    async acceptRequest() {
      await axios.post();
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
</style>
