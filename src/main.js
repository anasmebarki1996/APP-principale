import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import {
  BootstrapVue,
  IconsPlugin
} from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

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