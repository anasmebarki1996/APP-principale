import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/dashboard/Home.vue";
// import About from "../views/dashboard/About.vue";
// import Dashboard from "../views/Dashboard.vue";
// import Login from "../views/auth/Login.vue";
import VueCookies from "vue-cookies";

Vue.use(VueCookies);

Vue.use(VueRouter);

// const axios = require("axios");
// const routes = [
//   {
//     path: "/",
//     name: "Dashboard",
//     component: Dashboard,
//     redirect: "/home",
//     // beforeEnter: async (to, from, next) => {
//     //   let resp = await axios
//     //     .post("http://localhost:8000/API/checkToken")
//     //     .then(res => {
//     //       console.log(res);

//     //       return res.data;
//     //     })
//     //     .catch(res => {
//     //       console.log(res);
//     //       return null;
//     //     });
//     //   if (resp) {
//     //     if (resp.status == "success") {
//     //       next();
//     //     }
//     //   } else next("/login");
//     // },
//     children: [
//       {
//         path: "/home",
//         name: "Home",
//         component: Home
//       },
//       {
//         path: "/about",
//         name: "About",
//         component: About
//       }
//     ]
//   },
//   {
//     path: "/login",
//     name: "Login",
//     redirect: "/home",
//     component: Login
//     // beforeEnter: async (to, from, next) => {
//     //   console.log("before enter #################");
//     //   let resp = await axios
//     //     .post("http://localhost:8000/API/checkToken")
//     //     .then(res => {
//     //       return res.data.status;
//     //     })
//     //     .catch(() => {
//     //       return null;
//     //     });
//     //   if (resp == "success") {
//     //     alert("your are already logged in");
//     //     next();
//     //   } else next();
//     // }
//   },
//   {
//     path: "*",
//     redirect: "/home"
//   }
// ];

// const router = new VueRouter({
//   mode: "history",
//   base: process.env.BASE_URL,
//   routes
// });
// export default router;

export default new VueRouter({
  scrollBehavior() {
    return window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  },
  routes: [
    // Dashboards
    {
      path: "/intervention",
      name: "intervention",
      component: () => import("../views/Dashboards/Intervention.vue")
    },
    {
      path: "/nouvelle-intervention",
      name: "Nouvelle Intervention",
      component: () => import("../views/Dashboards/Nouvelle-Intervention.vue")
    },
    {
      path: "/intervention-en-cours",
      name: "Intervention en cours",
      component: () => import("../views/Dashboards/Intervention-En-Cours.vue")
    },
    {
      path: "/",
      name: "analytics",
      component: () => import("../views/Dashboards/Analytics.vue")
    },

    // Pages

    {
      path: "/login",
      name: "login",
      meta: {
        layout: "userpages"
      },
      component: () => import("../views/auth/Login.vue")
    },
    // {
    //   path: '/pages/forgot-password-boxed',
    //   name: 'forgot-password-boxed',
    //   meta: {
    //     layout: 'userpages'
    //   },
    //   component: () => import('../views/UserPages/ForgotPasswordBoxed.vue'),
    // },

    // Elements

    {
      path: "/elements/buttons-standard",
      name: "buttons-standard",
      component: () => import("../views/Elements/Buttons/Standard.vue")
    },
    {
      path: "/elements/dropdowns",
      name: "dropdowns",
      component: () => import("../views/Elements/Dropdowns.vue")
    },
    {
      path: "/elements/icons",
      name: "icons",
      component: () => import("../views/Elements/Icons.vue")
    },
    {
      path: "/elements/badges-labels",
      name: "badges",
      component: () => import("../views/Elements/Badges.vue")
    },
    {
      path: "/elements/cards",
      name: "cards",
      component: () => import("../views/Elements/Cards.vue")
    },
    {
      path: "/elements/list-group",
      name: "list-group",
      component: () => import("../views/Elements/ListGroups.vue")
    },
    {
      path: "/elements/timelines",
      name: "timeline",
      component: () => import("../views/Elements/Timeline.vue")
    },
    {
      path: "/elements/utilities",
      name: "utilities",
      component: () => import("../views/Elements/Utilities.vue")
    },

    // Components

    {
      path: "/components/tabs",
      name: "tabs",
      component: () => import("../components/Tabs.vue")
    },
    {
      path: "/components/accordions",
      name: "accordions",
      component: () => import("../components/Accordions.vue")
    },
    {
      path: "/components/modals",
      name: "modals",
      component: () => import("../components/Modals.vue")
    },
    {
      path: "/components/progress-bar",
      name: "progress-bar",
      component: () => import("../components/ProgressBar.vue")
    },
    {
      path: "/components/tooltips-popovers",
      name: "tooltips-popovers",
      component: () => import("../components/TooltipsPopovers.vue")
    },
    {
      path: "/components/carousel",
      name: "carousel",
      component: () => import("../components/Carousel.vue")
    },
    {
      path: "/components/pagination",
      name: "pagination",
      component: () => import("../components/Pagination.vue")
    },
    {
      path: "/components/maps",
      name: "maps",
      component: () => import("../components/Maps.vue")
    },

    // Tables

    {
      path: "/tables/regular-tables",
      name: "regular-tables",
      component: () => import("../views/Tables/RegularTables.vue")
    },

    // Dashboard Widgets

    {
      path: "/widgets/chart-boxes-3",
      name: "chart-boxes-3",
      component: () => import("../views/Widgets/ChartBoxes3.vue")
    },

    // Forms

    {
      path: "/forms/controls",
      name: "controls",
      component: () => import("../views/Forms/Elements/Controls.vue")
    },
    {
      path: "/forms/layouts",
      name: "layouts",
      component: () => import("../views/Forms/Elements/Layouts.vue")
    },
    // Charts

    {
      path: "/charts/chartjs",
      name: "chartjs",
      component: () => import("../views/Charts/Chartjs.vue")
    }
  ]
});
