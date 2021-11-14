<template>
  <div class="notification-container">
    <div class="notification-header">
      <button class="close-btn" @click="emitCloseNotification">X</button>
    </div>
    <div class="notification-content">
      <div v-if="isPresent && code !== undefined">
        <p>Name: {{ scannedData.name }}</p>
        <p>Code: {{ code }}</p>
        <p>Segregation type: {{ scannedData.segregationType }}</p>
      </div>
      <div v-if="!isPresent && code !== undefined" class="notification-request">
        <p>Code not found in database. Do you want to send request?</p>
        <button @click="emitOpenRequest">Send request</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScannedNotification",
  props: ["code", "isPresent", "scannedData"],
  data() {
    return {};
  },
  methods: {
    emitCloseNotification() {
      this.$emit("closeNotification");
    },
    emitOpenRequest() {
      this.$emit("openRequest");
    }
  }
};
</script>

<style scoped>
.notification-container {
  display: flex;
  justify-content: center;
  flex-flow: column;
  width: 50vw;
  padding: 0.1rem 0.5rem;
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
  z-index: 99;
  background-color: #fff;
  border-radius: 10px;
}

.notification-header {
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
}

.notification-request {
  display: flex;
  flex-flow: column;
  justify-content: center;
  padding-bottom: 1rem;
}

.notification-content {
  display: flex;
  justify-content: center;
}

.close-btn {
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 2rem;
  padding: 0 1rem;
}
</style>
