import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import { BootstrapVue } from "bootstrap-vue";
import {
  BIcon,
  BIconLayoutSidebarInset,
  BIconLayoutSidebarReverse,
  BIconListTask,
  BIconPencilFill,
  BIconPencil,
  BIconTrashFill,
  BIconTrash,
  BIconColumnsGap,
  BIconSliders,
  BIconCaretLeft,
  BIconCaretLeftFill,
  BIconCaretRight,
  BIconCaretRightFill,
  BIconChevronRight,
  BIconChevronDown,
  BIconThreeDotsVertical,
  BIconBoxArrowUp,
  BIconCheck2,
  BIconPlusSquare,
  BIconClipboard,
  BIconClock,
  BIconClockHistory,
  BIconPlus
} from "bootstrap-vue";
import VueClipboard from "vue-clipboard2";
import VueColor from "vue-color";
import Vuelidate from "vuelidate";
import { i18n } from "@/i18n";
import "@/assets/app.scss";
import "bootstrap-vue/dist/bootstrap-vue.min.css";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

// BootstrapVue Icon components imported separately to reduce bundle size.
Vue.component('BIcon', BIcon);
Vue.component('BIconLayoutSidebarInset', BIconLayoutSidebarInset);
Vue.component('BIconLayoutSidebarReverse', BIconLayoutSidebarReverse);
Vue.component('BIconListTask', BIconListTask);
Vue.component('BIconPencilFill', BIconPencilFill);
Vue.component('BIconPencil', BIconPencil);
Vue.component('BIconTrashFill', BIconTrashFill);
Vue.component('BIconTrash', BIconTrash);
Vue.component('BIconColumnsGap', BIconColumnsGap);
Vue.component('BIconSliders', BIconSliders);
Vue.component('BIconCaretLeft', BIconCaretLeft);
Vue.component('BIconCaretLeftFill', BIconCaretLeftFill);
Vue.component('BIconCaretRight', BIconCaretRight);
Vue.component('BIconCaretRightFill', BIconCaretRightFill);
Vue.component('BIconChevronRight', BIconChevronRight);
Vue.component('BIconChevronDown', BIconChevronDown);
Vue.component('BIconThreeDotsVertical', BIconThreeDotsVertical);
Vue.component('BIconBoxArrowUp', BIconBoxArrowUp);
Vue.component('BIconCheck2', BIconCheck2);
Vue.component('BIconPlusSquare', BIconPlusSquare);
Vue.component('BIconClipboard', BIconClipboard);
Vue.component('BIconClock', BIconClock);
Vue.component('BIconClockHistory', BIconClockHistory);
Vue.component('BIconPlus', BIconPlus);

new Vue({
  router,
  store,
  i18n,
  beforeCreate() {
    this.$store.commit("initialiseStore");
  },
  created() {
    Vue.use(VueClipboard);
    Vue.extend(VueColor);
    Vue.use(Vuelidate);
  },
  render: (h) => h(App),
}).$mount("#app");
