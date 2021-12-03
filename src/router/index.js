import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import Login from "../views/Login.vue";
import axios from "axios";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    beforeEnter: async (to, from, next) => {
      try {
        await axios.get("/api/users/me", {
          headers: { Authorization: `Bearer: ${localStorage.token}` }
        });
        next();
      } catch (error) {
        Vue.$toast.error("Please login first.");
        next("/login");
      }
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
