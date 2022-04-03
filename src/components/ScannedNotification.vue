<template>
  <v-dialog v-model="isVisible" persistent max-width="290">
    <v-card :color="getColor">
      <v-card-title class="text-h5">
        <span v-if="isPresent">
          Code found
        </span>
        <span v-else>
          Code not found
        </span>
      </v-card-title>
      <v-card-text>
        <div v-if="isPresent">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>{{ scannedData.name }}</v-list-item-title>
              <v-list-item-subtitle>Name</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>{{ code }}</v-list-item-title>
              <v-list-item-subtitle>Code</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>{{
                scannedData.segregationType
              }}</v-list-item-title>
              <v-list-item-subtitle>Segregation type</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
        <div v-else>
          Do you want to send request?
        </div>
      </v-card-text>
      <v-card-actions>
        <v-container style="padding: 0">
          <v-row no-gutters>
            <v-col>
              <v-btn color="darken-1" text @click="emitCloseNotification">
                Close
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col v-if="!isPresent">
              <v-btn color="green darken-1" text @click="emitOpenRequest">
                Send
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ScannedNotification",
  props: ["code", "isPresent", "scannedData", "isVisible"],
  data() {
    return {};
  },
  computed: {
    getColor() {
      if (this.scannedData) {
        switch (this.scannedData.segregationType) {
          case "plastic":
            return "yellow accent-2";
          case "paper":
            return "blue darken-2";
          case "glass":
            return "green darken-1";
          default:
            return "white";
        }
      } else {
        return "white";
      }
    }
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
