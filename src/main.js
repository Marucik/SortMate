import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueToast from "vue-toast-notification";
import "normalize.css";
import "vue-toast-notification/dist/theme-sugar.css";

Vue.use(VueToast, {
  position: "top-right"
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
