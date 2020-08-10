<template>
  <div class="cameraFeed">
    <video id="camera" ref="video"></video>
    <button class="scan" @click="emitClick"></button>
    <button class="torch" @click="toggleTorch">
      <img v-if="torchLit" src="@/assets/icons/zap.svg" alt="torchOn" />
      <img v-else src="@/assets/icons/zap-off.svg" alt="torchOff" />
    </button>
  </div>
</template>

<script>
import {
  BrowserBarcodeReader,
  BarcodeFormat,
  DecodeHintType
} from "@zxing/library";

export default {
  name: "CameraFeed",
  data() {
    return {
      videoWidth: 0,
      videoHeight: 0,
      mainStream: null,
      torchLit: false
    };
  },
  methods: {
    async emitClick() {
      const hints = new Map();
      const formats = [BarcodeFormat.EAN_13];
      hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
      hints.set(DecodeHintType.TRY_HARDER, true);

      for (let index = 0; index < 10; index++) {
        // let found = false;

        const codeReader = new BrowserBarcodeReader(hints);
        const imgSrc = this.createImageFromVideo();

        try {
          var result = await codeReader.decodeFromImage(undefined, imgSrc);
        } catch (err) {
          console.error("Not found :(");
        }

        if (result) break;
      }

      console.log(result);

      this.$emit("scan", result);
    },
    createImageFromVideo() {
      let canvas = document.createElement("canvas");
      canvas.width = this.videoWidth;
      canvas.height = this.videoHeight;

      canvas
        .getContext("2d")
        .drawImage(this.$refs.video, 0, 0, canvas.width, canvas.height);

      let dataURL = canvas.toDataURL();
      return dataURL;
    },
    toggleTorch() {
      const track = this.mainStream.getVideoTracks()[0];

      this.torchLit = !this.torchLit;

      track.applyConstraints({
        advanced: [{ torch: this.torchLit }]
      });
    }
  },
  async mounted() {
    var constraints = {
      audio: false,
      video: {
        width: 1280,
        height: 720,
        facingMode: "environment"
      }
    };

    let videoTarget = this.$refs.video;

    this.videoHeight = this.$refs.video.offsetHeight;
    this.videoWidth = this.$refs.video.offsetWidth;

    try {
      var mediaStream = await navigator.mediaDevices.getUserMedia(constraints);

      var video = videoTarget;
      video.srcObject = mediaStream;
      video.onloadedmetadata = function() {
        video.play();
      };
    } catch (err) {
      console.log(err.name + ": " + err.message);
    }

    this.mainStream = mediaStream;
  }
};
</script>

<style scoped>
.cameraFeed {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

#camera {
  height: 100%;
}

.scan {
  display: block;
  position: absolute;
  outline: none;
  background-color: #fff;
  bottom: 60px;
  width: 90px;
  height: 90px;
  border: 5px black solid;
  border-radius: 50%;
  opacity: 0.8;
  transition: transform 0.1s ease-out;
}

.scan:active {
  transform: scale(1.2);
  transition: transform 0.1s ease-in;
}

.torch {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 60px;
  left: calc(100vw / 4 - 15px);
  outline: none;
  background-color: #fff;
  width: 50px;
  height: 50px;
  border: 5px black solid;
  border-radius: 50%;
  opacity: 0.8;
}
</style>
