import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import KanbanDashboard from "@/components/KanbanDashboard.vue";
import { Routes } from "@/enums/Routes";

Vue.use(VueRouter);

const BASE = "/";

const routes: Array<RouteConfig> = [
  {
    path: BASE,
    name: Routes.DASHBOARD,
    component: KanbanDashboard,
    props: true,
  },
  {
    path: BASE.concat(Routes.TASK_BOARD),
    name: Routes.TASK_BOARD,
    component: () => {
      return import("@/components/TaskBoard.vue");
    },
  },
  {
    path: BASE.concat(Routes.NOTIFICATIONS),
    name: Routes.NOTIFICATIONS,
    component: () => {
      return import("@/components/Notifications.vue");
    },
  },
  {
    path: BASE.concat(Routes.PREFERENCES),
    name: Routes.PREFERENCES,
    component: () => {
      return import("@/components/preferences/Preferences.vue");
    },
  },
  { path: "*", redirect: "/" },
];

const router = new VueRouter({
  mode: "history",
  routes: routes,
});

export default router;
