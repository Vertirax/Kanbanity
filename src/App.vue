<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
// import Dashboard from "./components/KanbanDashboard.vue";
// import { db } from './utils/db'
import { mapActions } from "vuex";
import Board from "@/classes/Board";
import KanbanColumn from "@/classes/KanbanColumn";

export default {
  name: "app",
  /*components: {
    Dashboard,
  },*/
  methods: {
    ...mapActions({
      fetchData: "fetchData",
    }),
  },
  /*created() {
    // this.fetchData(this.boards);
  },*/
  data() {
    return {
      projects: [],
      cols: new KanbanColumn("1212", "name", "desc"),
      boards: new Board("02213", "name", "desc", new KanbanColumn("1231231")),
      dummy: [
        {
          id: 112,
          name: "Name",
          description: "description",
          lists: [
            {
              id: 2213,
              name: "Todo",
              headerColor: "red",
              items: [{}, {}],
            },
            {
              id: 4412,
              name: "Done",
              headerColor: "red",
              items: [{}, {}],
            },
          ],
        },
      ],
    };
  },
  /*firebase: {
    projects: db.ref('projetcs'),
  },*/
  /*mounted() {
    // console.log('projects ', this.projects)
    // console.log(this.boards, this.cols);
  },*/
};
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700);
@import url(https://fonts.googleapis.com/icon?family=Material+Icons);
@import url(https://demos.creative-tim.com/argon-design-system/assets/css/argon-design-system.min.css?v=1.2.0);
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css);
@import "assets/style.css";
</style>
