import Vue from "vue";
import Vuex from "vuex";
import Board from "@/classes/Board";
import KanbanColumn from "@/classes/KanbanColumn";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    boards: [
      new Board(
        "1",
        "Test board",
        "Used for test",
        [new KanbanColumn(
          "1231231",
          "asd",
          "desc"
          //[new KanbanItem("7394", "Task-name", "desc", Priority.LOW_PRIORITY)]
        ),
        new KanbanColumn(
          "1231231",
          "asd",
          "desc"
          //[new KanbanItem("7394", "Task-name", "desc", Priority.LOW_PRIORITY)]
        )],
      ),
    ],
  },
  mutations: {
    initialiseStore(state) {
      if (localStorage.getItem("store")) {
        this.replaceState(
          Object.assign(
            state,
            JSON.parse(<string>localStorage.getItem("store"))
          )
        );
      }
    },
  },
  actions: {},
  modules: {},
});
