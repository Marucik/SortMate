<template>
  <div class="home">
    <ProgressBar :progress="scanProgress" />
    <ScannedNotification
      :isVisible="displayNotification && code !== undefined"
      :code="code"
      :isPresent="isPresent"
      :scannedData="scannedData"
      @closeNotification="hideNotification"
      @openRequest="displayForm"
    />
    <RequestForm
      :isVisible="displayRequestModal"
      :code="code"
      @closeRequest="hideRequest"
    />
    <CodeInputForm
      :isVisible="displayCodeInput"
      @scan="propToNotify"
      @closeForm="hideForm"
    />
    <CameraFeed @scan="propToNotify" @progress="updateProgress" />
    <div class="buttonWrapper">
      <v-btn color="primary" elevation="2" @click="goToLogin">Admin</v-btn>
      <v-btn color="accent" elevation="2" @click="displayCodeInput = true">
        Input code
      </v-btn>
    </div>
  </div>
</template>

<script>
import CameraFeed from "../components/CameraFeed.vue";
import ScannedNotification from "../components/ScannedNotification.vue";
import RequestForm from "../components/RequestForm.vue";
import ProgressBar from "../components/ProgressBar.vue";
import CodeInputForm from "../components/CodeInputForm.vue";

export default {
  name: "Home",
  components: {
    CameraFeed,
    ScannedNotification,
    RequestForm,
    ProgressBar,
    CodeInputForm
  },
  data() {
    return {
      code: null,
      isPresent: false,
      displayNotification: false,
      displayRequestModal: false,
      displayCodeInput: false,
      scanProgress: 0,
      scannedData: null
    };
  },
  methods: {
    async propToNotify(value) {
      if (value.code === undefined) {
        this.$toast.error("Code not found in front of camera. Try again.");
      }
      this.code = value.code;
      this.isPresent = value.isPresent;
      this.displayCodeInput = false;
      this.displayNotification = true;
      this.scanProgress = 0;
      this.scannedData = value.data;
    },
    hideNotification() {
      this.displayNotification = false;
      this.isPresent = false;
    },
    hideForm() {
      this.displayCodeInput = false;
    },
    displayForm() {
      this.hideNotification();
      this.displayRequestModal = true;
    },
    hideRequest() {
      this.displayRequestModal = false;
    },
    updateProgress(value) {
      this.scanProgress = value;
    },
    goToLogin() {
      this.$router
        .push("/admin")
        .catch(() => this.$toast.error("Please login first."));
    }
  }
};
</script>

<style>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.buttonWrapper {
  display: flex;
  gap: 1rem;
  flex-flow: column;
  position: fixed;
  top: 1rem;
  left: 1rem;
}

#camera {
  height: 100%;
}
</style>
