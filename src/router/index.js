import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/dashboard/Home.vue";
import About from "../views/dashboard/About.vue";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/auth/Login.vue";
import VueCookies from "vue-cookies";

Vue.use(VueCookies);

Vue.use(VueRouter);

// const axios = require("axios");
const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    redirect: "/home",
    // beforeEnter: async (to, from, next) => {
    //   let resp = await axios
    //     .post("http://localhost:8000/API/checkToken")
    //     .then(res => {
    //       console.log(res);

    //       return res.data;
    //     })
    //     .catch(res => {
    //       console.log(res);
    //       return null;
    //     });
    //   if (resp) {
    //     if (resp.status == "success") {
    //       next();
    //     }
    //   } else next("/login");
    // },
    children: [
      {
        path: "/home",
        name: "Home",
        component: Home
      },
      {
        path: "/about",
        name: "About",
        component: About
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    redirect: "/home",
    component: Login
    // beforeEnter: async (to, from, next) => {
    //   console.log("before enter #################");
    //   let resp = await axios
    //     .post("http://localhost:8000/API/checkToken")
    //     .then(res => {
    //       return res.data.status;
    //     })
    //     .catch(() => {
    //       return null;
    //     });
    //   if (resp == "success") {
    //     alert("your are already logged in");
    //     next();
    //   } else next();
    // }
  },
  {
    path: "*",
    redirect: "/home"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
