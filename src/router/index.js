import Vue from "vue";
import axios from "axios";
import VueRouter from "vue-router";
import VueCookies from "vue-cookies";

Vue.use(VueCookies);

Vue.use(VueRouter);

const routes = [
  // Dashboards
  {
    path: "/intervention",
    name: "intervention",
    component: () => import("../views/Dashboards/Intervention.vue"),
  },
  {
    path: "/nouvelle-intervention",
    name: "Nouvelle Intervention",
    component: () => import("../views/Dashboards/Nouvelle-Intervention.vue"),
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("../views/Dashboards/Test.vue"),
  },
  {
    path: "/intervention-en-cours",
    name: "Intervention_En_Cours",
    component: () => import("../views/Dashboards/Intervention-En-Cours.vue"),
  },
  {
    path: "/",
    name: "analytics",
    component: () => import("../views/Dashboards/Analytics.vue"),
  },
  // Agent

  {
    path: "/agent",
    name: "Agent",
    component: () => import("../views/Dashboards/Agent/Agent.vue"),
  },
  {
    path: "/nouveau-agent",
    name: "Nouveau Agent",
    component: () => import("../views/Dashboards/Agent/Nouveau-Agent.vue"),
  },
  {
    path: "/modifier-agent",
    name: "Modifier Agent",
    component: () => import("../views/Dashboards/Agent/Modifier-Agent.vue"),
  },

  // Engin

  {
    path: "/engin",
    name: "Engin",
    component: () => import("../views/Dashboards/Engin/Engin.vue"),
  },

  // Planning
  {
    path: "/planning",
    name: "Planning",
    component: () => import("../views/Dashboards/Planning/Planning.vue"),
  },
  {
    path: "/nouvelle-equipe",
    name: "Nouvelle équipe",
    component: () => import("../views/Dashboards/Planning/Nouvelle-Equipe.vue"),
  },
  {
    path: "/modifier-equipe",
    name: "Modifier équipe",
    component: () => import("../views/Dashboards/Planning/Modifier-Equipe.vue"),
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
  {
    path: "/register",
    name: "register",
    meta: {
      layout: "userpages",
    },
    component: () => import("../views/auth/RegisterBoxed.vue"),
  },

  // Elements

  {
    path: "/elements/buttons-standard",
    name: "buttons-standard",
    component: () => import("../views/Elements/Buttons/Standard.vue"),
  },
  {
    path: "/elements/dropdowns",
    name: "dropdowns",
    component: () => import("../views/Elements/Dropdowns.vue"),
  },
  {
    path: "/elements/icons",
    name: "icons",
    component: () => import("../views/Elements/Icons.vue"),
  },
  {
    path: "/elements/badges-labels",
    name: "badges",
    component: () => import("../views/Elements/Badges.vue"),
  },
  {
    path: "/elements/cards",
    name: "cards",
    component: () => import("../views/Elements/Cards.vue"),
  },
  {
    path: "/elements/list-group",
    name: "list-group",
    component: () => import("../views/Elements/ListGroups.vue"),
  },
  {
    path: "/elements/timelines",
    name: "timeline",
    component: () => import("../views/Elements/Timeline.vue"),
  },
  {
    path: "/elements/utilities",
    name: "utilities",
    component: () => import("../views/Elements/Utilities.vue"),
  },

  // Components

  {
    path: "/components/tabs",
    name: "tabs",
    component: () => import("../components/Tabs.vue"),
  },
  {
    path: "/components/accordions",
    name: "accordions",
    component: () => import("../components/Accordions.vue"),
  },
  {
    path: "/components/modals",
    name: "modals",
    component: () => import("../components/Modals.vue"),
  },
  {
    path: "/components/progress-bar",
    name: "progress-bar",
    component: () => import("../components/ProgressBar.vue"),
  },
  {
    path: "/components/tooltips-popovers",
    name: "tooltips-popovers",
    component: () => import("../components/TooltipsPopovers.vue"),
  },
  {
    path: "/components/carousel",
    name: "carousel",
    component: () => import("../components/Carousel.vue"),
  },
  {
    path: "/components/pagination",
    name: "pagination",
    component: () => import("../components/Pagination.vue"),
  },
  {
    path: "/components/maps",
    name: "maps",
    component: () => import("../components/Maps.vue"),
  },

  // Tables

  {
    path: "/tables/regular-tables",
    name: "regular-tables",
    component: () => import("../views/Tables/RegularTables.vue"),
  },

  // Dashboard Widgets

  {
    path: "/widgets/chart-boxes-3",
    name: "chart-boxes-3",
    component: () => import("../views/Widgets/ChartBoxes3.vue"),
  },

  // Forms

  {
    path: "/forms/controls",
    name: "controls",
    component: () => import("../views/Forms/Elements/Controls.vue"),
  },
  {
    path: "/forms/layouts",
    name: "layouts",
    component: () => import("../views/Forms/Elements/Layouts.vue"),
  },
  // Charts

  {
    path: "/charts/chartjs",
    name: "chartjs",
    component: () => import("../views/Charts/Chartjs.vue"),
  },
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
    .post("http://localhost:8000/API/checkToken")
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
      next("/");
    } else {
      next();
    }
  }
});

export default router;