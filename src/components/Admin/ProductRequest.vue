<template>
  <v-card class="mx-auto" max-width="350" :class="{ fadeOut: accepted }">
    <v-card-text>
      <div>Code</div>
      <p class="text-h4 text--primary">
        {{ request.code }}
      </p>
      <p style="margin: 0">Name:</p>
      <div class="text--primary">
        {{ request.name }}
      </div>
      <p style="margin: 0">Type:</p>
      <div class="text--primary">
        {{ request.segregationType }}
      </div>
      <p style="margin: 0">Description:</p>
      <div class="text--primary">
        {{ request.description }}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="teal accent-4" @click="acceptRequest">
        accept
      </v-btn>
    </v-card-actions>
  </v-card>
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
        await axios.post(
          `/api/product-requests/${this.request.id}:accept`,
          null,
          {
            headers: { Authorization: `Bearer: ${localStorage.token}` }
          }
        );
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
