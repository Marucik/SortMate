<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "SortMate"
};
</script>
<style>
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

#app {
  margin: 0;
  background-color: rgb(30, 0, 139);
  height: 100%;
  width: 100vw;
}
</style>
