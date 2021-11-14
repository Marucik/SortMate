<template>
  <div class="progerssBar-wrapper">
    <div
      v-for="number in progress"
      :key="number"
      class="progressBar-segment"
    ></div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: ["progress"]
};
</script>

<style scoped>
.progerssBar-wrapper {
  width: 100vw;
  height: 10px;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}

.progressBar-segment {
  width: 10%;
  height: 100%;
  background-color: purple;
}
</style>
