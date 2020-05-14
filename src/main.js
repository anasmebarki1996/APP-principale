import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import LoadScript from "vue-plugin-load-script";

Vue.use(LoadScript);


import {
  BootstrapVue,
  IconsPlugin
} from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// ################### fortawesome ####################
import {
  library
} from "@fortawesome/fontawesome-svg-core";
import {
  faUserSecret,
  fas
} from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";
library.add(faUserSecret, fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);

// ################### moment ####################
import moment from "moment-timezone";
moment.tz.setDefault("Africa/Algiers");
Vue.prototype.$moment = moment;

const dialog = require("electron").remote.dialog;
Vue.prototype.$dialog = dialog;

// ################### axios ####################
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);


import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDh-wrSH71HVGsYWw9RcFgCBstOOyeHKqo",
    libraries: ["places", "visualization"]
  }
})

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