import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import KanbanDashboard from "@/components/KanbanDashboard.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    // name: "Dashboard",
    component: KanbanDashboard,
  },
  {
    path: "/task-board",
    name: "task-board",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => {
      return import(
        /* webpackChunkName: "about" */ "@/components/TaskBoard.vue"
      );
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes: routes,
});

export default router;
