import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueToast from "vue-toast-notification";
import "normalize.css";
import "vue-toast-notification/dist/theme-sugar.css";
import vuetify from "./plugins/vuetify";

Vue.use(VueToast, {
  position: "top-right"
});

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
