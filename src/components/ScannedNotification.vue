<template>
  <div class="notification-container">
    <div class="notification">
      <p>Code: {{ code }}</p>
      <button class="close-btn" @click="emmitClose">X</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScannedNotification",
  props: ["code"],
  data() {
    return {};
  },
  methods: {
    emmitClose() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.notification-container {
  display: flex;
  justify-content: center;
  width: 100vw;
  position: fixed;
  top: 1.5rem;
  z-index: 15;
}

.notification {
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  background-color: #fff;
  width: 95%;
  padding: 0.1rem 0.5rem;
}

.close-btn {
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 2rem;
  padding: 0 1rem;
}
</style>
