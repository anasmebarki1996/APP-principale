import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import BootstrapVue from "bootstrap-vue"
Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.min.css'



import Default from './Layout/Wrappers/baseLayout.vue';
import Pages from './Layout/Wrappers/pagesLayout.vue';
Vue.config.productionTip = false;
Vue.component('default-layout', Default);
Vue.component('userpages-layout', Pages);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");









// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: {
//     App
//   }
// });