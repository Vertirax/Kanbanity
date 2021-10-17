import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import KanbanDashboard from "@/components/KanbanDashboard.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "dashboard",
    component: KanbanDashboard,
    props: true,
  },
  {
    path: "/task-board",
    name: "task-board",
    component: () => {
      return import("@/components/TaskBoard.vue");
    },
  },
  { path: "*", redirect: "/" },
];

const router = new VueRouter({
  mode: "history",
  routes: routes,
});

export default router;
