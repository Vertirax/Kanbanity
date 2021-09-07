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
        new KanbanColumn("1231231", "asd", "desc")
      ),
    ],
  },
  mutations: {},
  actions: {},
  modules: {},
});
