import Vue from "vue";
import Vuex from "vuex";
import VuexORM from "@vuex-orm/core";
import database from "@/database";
import createPersistedState from "vuex-persistedstate";

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
