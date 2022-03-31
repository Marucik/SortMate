<template>
  <div id="app">
    <v-app>
      <router-view />
    </v-app>
  </div>
</template>
<script>
export default {
  name: "SortMate"
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap");

* {
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden !important;
  overflow-y: hidden !important;
}

#app {
  margin: 0;
  background: url("./assets/background.png");
  /* ========================================================
 This pattern is downloaded from www.subtlepatterns.com 
 If you need more, that's where to get'em.
 ======================================================== */
  height: 100%;
  width: 100%;
}
</style>
