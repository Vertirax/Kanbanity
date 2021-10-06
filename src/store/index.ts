import Vue from "vue";
import Vuex from "vuex";
import VuexORM from "@vuex-orm/core";
import database from "@/database";
import createPersistedState from "vuex-persistedstate";
import Task from "@/models/Task";
import Column from "@/models/KanbanColumn";
import ToastStorage from "@/store/modules/toast-storage";
import Board from "@/models/Board";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    VuexORM.install(database),
    createPersistedState({
      key: "storage",
    }),
  ],
  state: {
    currentBoardId: "",
    darkMode: true,
  },
  mutations: {
    initialiseStore(state) {
      if (localStorage.getItem("storage")) {
        this.replaceState(
          Object.assign(
            state,
            JSON.parse(<string>localStorage.getItem("storage"))
          )
        );
      }
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    setCurrentBoardId(state, id) {
      state.currentBoardId = id;
    },
    updateList(state, list) {
      // TODO: replace logic with update.
      const query = Column.query().where("board_id", list[0].board_id).get();
      query.map((val) => val.$delete());
      Column.insert({
        data: list,
      });
    },
    updateItems(state, items) {
      // gets called between columns and in one column
      /*Task.update({
        where: (record) => {
          return record.column_id === items[0].column_id;
        },
        data: [items],
      });*/
      //.then(() => console.log(Task.query().where("column_id", items[0].column_id).get()));*/

      // TODO: replace logic with update.
      const query = Task.query().where("column_id", items[0].column_id).get();
      query.map((val) => val.$delete());
      Task.insert({
        data: items,
      });
    },
    deleteBoard(state, payload) {
      const taskQuery = Task.query().where("board_id", payload.boardId).get();
      const columnQuery = Column.query().where("board_id", payload.boardId).get();
      taskQuery.map((val) => val.$delete());
      columnQuery.map((val) => val.$delete());

      Board.delete(payload.boardId);
    },
    deleteColumn(state, payload) {
      const query = Task.query().where("column_id", payload.colId).get();
      query.map((val) => val.$delete());

      Column.delete(payload.colId);
    },
    deleteTask(state, payload) {
      Task.delete(payload.taskId);
    },
  },
  actions: {
    deleteBoard({ commit }, payload) {
      commit("deleteBoard", payload);
    },
    deleteColumn({ commit }, payload) {
      commit("deleteColumn", payload);
    },
    deleteTask({ commit }, payload) {
      commit("deleteTask", payload);
    },
    toggleDarkMode({ commit }) {
      commit("toggleDarkMode");
    },
    saveTaskListItem() {
      // console.log(find(this.state.boards, { id: this.state.currentBoardId }));
      // this.state.boards.find()
    },
  },
  getters: {
    getCurrentBoardId: (state) => state.currentBoardId,
  },
  modules: {
    ToastStorage,
  },
});
