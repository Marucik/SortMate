<template>
  <div class="cameraFeed">
    <video id="camera" ref="video"></video>
    <button class="scan" @click="emitClick"></button>
    <button v-if="isTorchAvailable" class="torch" @click="toggleTorch">
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
import axios from "axios";

export default {
  name: "CameraFeed",
  data() {
    return {
      videoWidth: 0,
      videoHeight: 0,
      mainStream: null,
      torchLit: false,
      isTorchAvailable: false
    };
  },
  methods: {
    async emitClick() {
      const hints = new Map();
      const formats = [BarcodeFormat.EAN_13];
      hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
      hints.set(DecodeHintType.TRY_HARDER, true);

      for (let index = 0; index < 10; index++) {
        const codeReader = new BrowserBarcodeReader(hints);
        const imgSrc = this.createImageFromVideo();

        try {
          var scanResult = await codeReader.decodeFromImage(undefined, imgSrc);
        } catch (err) {
          console.log("Not found");
          this.$emit("progress", index + 1);
        }

        if (scanResult) {
          break;
        }
      }

      if (scanResult) {
        try {
          const result = await axios.get(`/api/products/${scanResult.text}`);

          // Kod znaleziony w bazie - wyświetlenie szczegółów
          this.$emit("scan", {
            isPresent: true,
            code: scanResult.text,
            data: result.data
          });
          return;
        } catch (error) {
          // Kod nie znaleziony w bazie - wyświetlenie formularza
          this.$emit("scan", {
            isPresent: false,
            code: scanResult.text,
            data: null
          });
          return;
        }
      } else {
        // Kod nie znaleziony na żadnym ze zdjęć
        this.$emit("scan", {
          isPresent: false,
          code: undefined,
          data: null
        });
      }
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
        width: 1920,
        height: 1080,
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
    const capabilites = mediaStream.getVideoTracks()[0].getCapabilities();

    if (capabilites.torch) {
      this.isTorchAvailable = true;
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
