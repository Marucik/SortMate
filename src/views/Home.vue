<template>
  <div class="home">
    <ProgressBar :progress="scanProgress" />
    <ScannedNotification
      v-if="displayNotification && code !== undefined"
      :code="code"
      :isPresent="isPresent"
      :scannedData="scannedData"
      @closeNotification="hideNotification"
      @openRequest="displayForm"
    />
    <RequestForm
      v-if="displayRequestModal"
      :code="code"
      @closeRequest="hideRequest"
    />
    <CameraFeed @scan="propToNotify" @progress="updateProgress" />
  </div>
</template>

<script>
import CameraFeed from "../components/CameraFeed.vue";
import ScannedNotification from "../components/ScannedNotification.vue";
import RequestForm from "../components/RequestForm.vue";
import ProgressBar from "../components/ProgressBar.vue";
// import axios from "axios";

export default {
  name: "Home",
  components: { CameraFeed, ScannedNotification, RequestForm, ProgressBar },
  data() {
    return {
      code: null,
      isPresent: false,
      displayNotification: false,
      displayRequestModal: false,
      scanProgress: 0,
      scannedData: null
    };
  },
  methods: {
    async propToNotify(value) {
      if (value.code === undefined) {
        this.$toast.error("Code not found in front of camera. Try again :)");
      }

      this.code = value.code;
      this.isPresent = value.isPresent;
      this.displayNotification = true;
      this.scanProgress = 0;
      this.scannedData = value.data;
    },
    hideNotification() {
      this.displayNotification = false;
      this.isPresent = false;
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

#camera {
  height: 100%;
}
</style>
