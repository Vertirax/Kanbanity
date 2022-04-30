import Column from "@/models/KanbanColumn";
import Task from "@/models/Task";

export default {
  mutations: {
    saveColumn(state, payload) {
      Column.insert({
        data: {
          board_id: payload.currentBoardId,
          name: payload.name,
          description: payload.description,
        },
      });
    },
    editColumn(state, payload) {
      Column.update({
        where: (col) => {
          return col.id === payload.id;
        },
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
  },
  actions: {
    saveColumn({ commit, rootState }, payload) {
      const currentBoardId = rootState.board.currentBoard.id;
      commit("saveColumn", { ...payload, currentBoardId });
    },
    editColumn({ commit }, payload) {
      commit("editColumn", payload);
    },
    deleteColumn({ commit }, payload) {
      commit("deleteColumn", payload);
    },
  },
  getters: {
    getTotalTimeSpent: () => (columnId: string) => Task.query().where("column_id", columnId).sum("timeMinutes"),
  },
}
