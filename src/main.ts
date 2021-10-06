import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueClipboard from "vue-clipboard2";
import VueColor from "vue-color";
import "@/assets/app.scss";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueClipboard);
Vue.use(VueColor);

new Vue({
  router,
  store,
  beforeCreate() {
    this.$store.commit("initialiseStore");
  },
  render: (h) => h(App),
}).$mount("#app");
