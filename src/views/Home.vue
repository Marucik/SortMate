<template>
  <div class="home">
    <ScannedNotification
      v-if="notification != null"
      :code="notification"
      @close="hideNotification"
    />
    <CameraFeed @scan="propToNotify" />
  </div>
</template>

<script>
import CameraFeed from "../components/CameraFeed.vue";
import ScannedNotification from "../components/ScannedNotification.vue";

export default {
  name: "Home",
  components: { CameraFeed, ScannedNotification },
  data() {
    return {
      notification: null
    };
  },
  methods: {
    propToNotify(value) {
      if (value === undefined) {
        this.notification = "Not found";
      } else {
        this.notification = value;
      }
    },
    hideNotification() {
      this.notification = null;
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
