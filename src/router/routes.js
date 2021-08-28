import Dashboard from "../components/KanbanDashboard.vue"
import TaskBoard from "../components/TaskBoard.vue"

export default [
  {
    path: "/",
    name: "home",
    redirect: "/dashboard"
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard
  },
  {
    path: "/boards/:id",
    name: "task-board",
    component: TaskBoard
  }
]
