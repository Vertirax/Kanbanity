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
import BoardStorage from "@/store/modules/board-storage";
import ColumnStorage from "@/store/modules/column-storage";
import TaskStorage from "@/store/modules/task-storage";
import Board from "@/models/Board";
import Preferences from "@/models/Preferences";
import KanbanColumn from "@/models/KanbanColumn";
import Notification from "@/models/Notification";
import BoardTemplate from "@/models/BoardTemplate";
import Toast from "@/classes/Toast";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    VuexORM.install(database),
    createPersistedState({
      key: "storage",
    }),
  ],
  state: {
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
    deleteAll() {
      Promise.all([
        Task.deleteAll(),
        Column.deleteAll(),
        Board.deleteAll(),
      ]).then(() => {
        this.dispatch("successToaster", new Toast(
          "preferences.options.toaster.title",
          "preferences.options.toaster.success.delete-all"
        ));
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
      /*
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
      */

      if (Preferences.query().count() === 0) {
        Preferences.new();
      }
    },
  },
  actions: {
    toggleDarkMode({ commit }) {
      commit("toggleDarkMode");
    },
    importStorage({ commit, dispatch }, payload) {
      commit("importStorage", payload);
      dispatch("successToaster", new Toast(
        "preferences.options.toaster.import.title",
        "preferences.options.toaster.import.message"
      ));
    },
  },
  getters: {
    getStorageToExport: (state) => state.storageToExport,
  },
  modules: {
    toast: ToastStorage,
    dnd: DragAndDropStorage,
    notification: NotificationStorage,
    preference: PreferenceStorage,
    board: BoardStorage,
    column: ColumnStorage,
    task: TaskStorage,
  },
});
