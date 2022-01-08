import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueClipboard from "vue-clipboard2";
import VueColor from "vue-color";
import Vuelidate from "vuelidate";
import { i18n } from "./i18n";
import "@/assets/app.scss";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueClipboard);
Vue.extend(VueColor);
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  i18n,
  beforeCreate() {
    this.$store.commit("initialiseStore");
  },
  render: (h) => h(App),
}).$mount("#app");
