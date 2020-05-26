import Vue from "vue";
import axios from "axios";
import VueRouter from "vue-router";
import VueCookies from "vue-cookies";

Vue.use(VueCookies);

Vue.use(VueRouter);

const routes = [
  // ########################### Intervention ###########################

  {
    path: "/intervention",
    name: "intervention",
    component: () =>
      import("../views/Dashboards/Intervention/Intervention.vue"),
  },
  {
    path: "/intervention-details",
    name: "Intervention Détails",
    component: () =>
      import("../views/Dashboards/Intervention/Intervention-Details.vue"),
  },
  {
    path: "/intervention-en-cours",
    name: "Intervention En Cours",
    component: () =>
      import("../views/Dashboards/Intervention/Intervention-En-Cours.vue"),
  },
  {
    path: "/nouvelle-intervention",
    name: "Nouvelle Intervention",
    component: () => import("../views/Dashboards/Intervention/Nouvelle-Intervention.vue"),
  },

  // Agent

  {
    path: "/agent",
    name: "Agent",
    component: () => import("../views/Dashboards/Agent/Agent.vue"),
  },

  // Engin

  {
    path: "/engin",
    name: "Engin",
    component: () => import("../views/Dashboards/Engin/Engin.vue"),
  },

  // ########################### statistiques ###########################

  {
    path: "/",
    name: "Unites",
    component: () => import("../views/Dashboards/Statistiques/Unites.vue"),
  },
  {
    path: "/statistiques/journal",
    name: "Journal",
    component: () => import("../views/Dashboards/Statistiques/Journal.vue"),
  },
  {
    path: "/statistiques/maps",
    name: "Maps",
    component: () => import("../views/Dashboards/Statistiques/Maps.vue"),
  },

  // Pages
  {
    path: "/login",
    name: "login",
    meta: {
      layout: "userpages",
    },
    component: () => import("../views/auth/Login.vue"),
  },
  // Nodes
  {
    path: "/intervention/addnode",
    name: "addNode",
    component: () => import("../views/Dashboards/Node/addNode.vue"),
    props: true,
  },
  {
    path: "/intervention/updatenode",
    name: "updateNode",
    component: () => import("../views/Dashboards/Node/updateNode.vue"),
  },
  {
    path: "/intervention/listnode",
    name: "listNode",
    component: () => import("../views/Dashboards/Node/listNode.vue"),
  },
  // redirect

  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  scrollBehavior() {
    return window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  },
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach(async (to, from, next) => {
  let resp = await axios
    .post(process.env.VUE_APP_API + "/checkToken")
    .then((res) => {
      return res.data.status;
    })
    .catch(() => {
      return null;
    });

  if (to.fullPath !== "/login") {
    if (resp == "success") {
      next();
    } else next("/login");
  } else {
    if (resp == "success") {
      next("/nouvelle-intervention");
    } else {
      next();
    }
  }
});

export default router;