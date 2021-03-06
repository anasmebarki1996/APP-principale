import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import LoadScript from "vue-plugin-load-script";
Vue.use(LoadScript);

import io from "socket.io-client";
Vue.prototype.$socket = io("http://127.0.0.1:30001");

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// ################### fortawesome ####################
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret, fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faUserSecret, fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);

// ################### moment ####################
import moment from "moment-timezone";
moment.tz.setDefault("Africa/Algiers");

moment.locale("fr");
Vue.prototype.$moment = moment;

const dialog = require("electron").remote.dialog;
Vue.prototype.$dialog = dialog;

// ################### axios ####################
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

Vue.filter("lastTime", function(dateTime) {
  return moment(new Date(dateTime)).fromNow();
});

Vue.filter("dateTime", function(dateTime) {
  return moment(new Date(dateTime)).format("YYYY-MM-DD à HH:mm");
});

import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAOifFchSotR-YmTmtWsgybi62qqGmVjUU",
    libraries: ["places", "visualization"],
  },
});

import Default from "./Layout/Wrappers/baseLayout.vue";
import Pages from "./Layout/Wrappers/pagesLayout.vue";
Vue.config.productionTip = false;
Vue.component("default-layout", Default);
Vue.component("userpages-layout", Pages);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
