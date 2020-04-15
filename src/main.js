import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import LoadScript from 'vue-plugin-load-script';


Vue.use(LoadScript);
Vue.loadScript("https://code.jquery.com/jquery-3.4.1.slim.min.js")
Vue.loadScript("https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js")
Vue.loadScript("https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js")


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

import Default from "./Layout/Wrappers/baseLayout.vue";
import Pages from "./Layout/Wrappers/pagesLayout.vue";
Vue.config.productionTip = false;
Vue.component("default-layout", Default);
Vue.component("userpages-layout", Pages);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");