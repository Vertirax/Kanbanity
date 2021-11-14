// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Vue from "vue";
import Vuex from "vuex";
import VuexORM from "@vuex-orm/core";
import database from "@/database";
import createPersistedState from "vuex-persistedstate";
import Task from "@/models/Task";
import Column from "@/models/KanbanColumn";
import ToastStorage from "@/store/modules/toast-storage";
import DragAndDropStorage from "@/store/modules/drag-and-drop-storage";
import NotificationStorage from "@/store/modules/notification-storage";
import Board from "@/models/Board";
import KanbanDashboard from "@/classes/Board";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    VuexORM.install(database),
    createPersistedState({
      key: "storage",
    }),
  ],
  state: {
    currentBoard: KanbanDashboard,
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
    setCurrentBoard(state, board) {
      state.currentBoard = new KanbanDashboard(
        board.id,
        board.name,
        board.description
      );
    },
    renameTask(state, payload) {
      Task.update({
        where: (task) => { return task.id === payload.id; },
        data: { name: payload.name },
      });
    },
    changePriority(state, payload) {
      Task.update({
        where: (task) => { return task.id === payload.id; },
        data: { priority: payload.priority },
      });
    },
    deleteBoard(state, payload) {
      Task.query()
        .where("board_id", payload.boardId)
        .get()
        .forEach((val) => val.$delete());
      Column.query()
        .where("board_id", payload.boardId)
        .get()
        .forEach((val) => val.$delete());
      Board.delete(payload.boardId);
    },
    saveColumn(state, payload) {
      Column.insert({
        data: {
          board_id: state.currentBoard.id,
          name: payload.title,
          description: payload.description,
        },
      });
    },
    editColumn(state, payload) {
      Column.update({
        where: (col) => { return col.id === payload.id; },
        data: {
          name: payload.title,
          description: payload.description,
        },
      });
    },
    deleteColumn(state, payload) {
      Task.query()
        .where("column_id", payload.colId)
        .get()
        .forEach((val) => val.$delete());
      Column.delete(payload.colId);
    },
    saveTask(state, payload) {
      Task.insert({
        data: {
          column_id: payload.column_id,
          board_id: payload.board_id,
          name: payload.name,
        },
      });
    },
    deleteTask(state, payload) {
      Task.delete(payload.taskId);
    },
    initData() {
      if (Board.all().length === 0) {
        Board.insert({
          data: [
            {
              name: "Board #1",
              description: "desc #1",
              createdDateString: new Date().toLocaleDateString(),
            },
            {
              name: "Board #2",
              description: "desc #2",
              createdDateString: new Date().toLocaleDateString(),
            },
          ],
        }).then((data) => {
          const cols = ["To Do", "In Progress", "Done", "Review"];
          cols.forEach((colName) =>
            Column.insert({
              data: {
                board_id: data.boards[0].id,
                name: colName,
              },
            })
          );
        });
      }
    },
  },
  actions: {
    toggleDarkMode({ commit }) {
      commit("toggleDarkMode");
    },
    deleteBoard({ commit }, payload) {
      commit("deleteBoard", payload);
    },
    saveColumn({ commit }, payload) {
      commit("saveColumn", payload);
    },
    editColumn({ commit }, payload) {
      commit("editColumn", payload);
    },
    deleteColumn({ commit }, payload) {
      commit("deleteColumn", payload);
    },
    saveTaskItem({ commit }, payload) {
      commit("saveTask", payload);
    },
    changeTaskName({ commit }, payload) {
      commit("renameTask", payload);
    },
    changePriority({ commit }, payload) {
      commit("changePriority", payload);
    },
    deleteTask({ commit }, payload) {
      commit("deleteTask", payload);
    },
  },
  getters: {
    getCurrentBoard: (state) => state.currentBoard,
  },
  modules: {
    ToastStorage,
    DragAndDropStorage,
    NotificationStorage,
  },
});
