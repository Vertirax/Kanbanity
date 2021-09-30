import Vue from "vue";
import Vuex from "vuex";
import VuexORM from "@vuex-orm/core";
import database from "@/database";
import Board from "@/classes/Board";
import KanbanColumn from "@/classes/KanbanColumn";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [VuexORM.install(database)],
  state: {
    /*columns: {
      1: { id: 1, board_id: 1, name: "name1", description: "desc1" },
      2: { id: 2, board_id: 1, name: "name2", description: "desc2" },
    },
    boards: {
      "1": { id: 1, name: "name1", description: "desc1" },
      "2": { id: 2, name: "name2", description: "desc2" },
    },
    /*boards: [
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
      new Board(
        nanoid(),
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
    ],*/
    currentBoardId: "",
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
    setCurrentBoardId(state, id) {
      state.currentBoardId = id;
    },
  },
  actions: {
    saveTaskListItem() {
      // console.log(find(this.state.boards, { id: this.state.currentBoardId }));
      // this.state.boards.find()
    },
  },
  getters: {
    getCurrentBoardId: (state) => state.currentBoardId,
  },
  modules: {},
});
