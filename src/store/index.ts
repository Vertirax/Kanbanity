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
import PreferenceStorage from "@/store/modules/preferences-storage";
import Board from "@/models/Board";
import KanbanDashboard from "@/classes/Board";
import Preferences from "@/models/Preferences";
import KanbanColumn from "@/models/KanbanColumn";
import Notification from "@/models/Notification";
import BoardTemplate from "@/models/BoardTemplate";
import { i18n } from "@/i18n";

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
    storageToExport: "",
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
        board.description,
        board.createdDateString
      );
    },
    setStorageToExport(state) {
      state.storageToExport = `{
        "${Board.entity}": ${JSON.stringify(Board.all())},
        "${KanbanColumn.entity}": ${JSON.stringify(KanbanColumn.all())},
        "${Task.entity}": ${JSON.stringify(Task.all())},
        "${Notification.entity}": ${JSON.stringify(Notification.all())},
        "${BoardTemplate.entity}": ${JSON.stringify(BoardTemplate.all())},
        "${Preferences.entity}": ${JSON.stringify(Preferences.all())}
      }`;
    },
    renameTask(state, payload) {
      Task.update({
        where: (task) => { return task.id === payload.id; },
        data: { name: payload.name },
      });
    },
    saveBoard(state, payload) {
      Board.insert({
        data: {
          name: payload.board.name,
          description: payload.board.description,
          createdDateString: new Date().toLocaleDateString(),
        },
      }).then((response) => {
        if (payload.template.name !== "") {
          payload.template.columns.split(",").map((template) => {
            template = template.trim();
            Column.insert({
              data: {
                board_id: response.boards[0]["id"],
                name: template,
              },
            });
          });
        }
      });
    },
    changePriority(state, payload) {
      Task.update({
        where: (task) => { return task.id === payload.id; },
        data: { priority: payload.priority },
      });
    },
    editBoard(state, payload) {
      Board.update({
        where: (board) => { return board.id === payload.id; },
        data: {
          name: payload.name,
          description: payload.description,
        },
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
          name: payload.name,
          description: payload.description,
        },
      });
    },
    editColumn(state, payload) {
      Column.update({
        where: (col) => { return col.id === payload.id; },
        data: {
          name: payload.name,
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
          priority: payload.priority,
        },
      });
    },
    changeTaskHighlightColor(state, payload) {
      Task.update({
        where: (task) => { return task.id === payload.id; },
        data: {
          highlightColor: payload.highlightColor,
        },
      });
    },
    deleteTask(state, payload) {
      Task.delete(payload.taskId);
    },
    deleteAll({ dispatch }) {
      Promise.all([
        Task.deleteAll(),
        Column.deleteAll(),
        Board.deleteAll(),
      ]).then(() => {
        this.dispatch("successToaster", {
          title: i18n.t("preferences.options.toaster.title"),
          message: i18n.t("preferences.options.toaster.success.delete-all"),
        });
      });
    },
    importStorage(state, payload) {
      const entities = [
        Board.entity,
        KanbanColumn.entity,
        Task.entity,
        Notification.entity,
        BoardTemplate.entity,
      ];
      entities.forEach((entity) => {
        if (payload[entity]) {
          this.dispatch("entities/insert", {
            entity: entity,
            data: payload[entity],
          });
        }
      });
      // TODO: Preferences
    },
    initData() {
      if (Board.query().count() === 0) {
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
                board_id: data.boards[0]["id"],
                name: colName,
              },
            })
          );
        });
      }

      if (Preferences.query().count() === 0) {
        Preferences.new();
      }
    },
  },
  actions: {
    toggleDarkMode({ commit }) {
      commit("toggleDarkMode");
    },
    editBoard({ commit }, payload) {
      commit("editBoard", payload);
    },
    saveBoard({ commit }, payload) {
      commit("saveBoard", payload);
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
    changeTaskHighlightColor({ commit }, payload) {
      commit("changeTaskHighlightColor", payload);
    },
    deleteTask({ commit }, payload) {
      commit("deleteTask", payload);
    },
    importStorage({ commit, dispatch }, payload) {
      commit("importStorage", payload);
      dispatch("successToaster", {
        title: "File Import",
        message: "Successfully imported data!",
      });
    },
  },
  getters: {
    getCurrentBoard: (state) => state.currentBoard,
    getStorageToExport: (state) => state.storageToExport,
    getAllBoards: () => Board.all(),
  },
  modules: {
    ToastStorage,
    DragAndDropStorage,
    NotificationStorage,
    PreferenceStorage,
  },
});
