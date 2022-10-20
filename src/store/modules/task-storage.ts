import Task from "@/models/Task";

export default {
  store: {},
  mutations: {
    saveTask(state, payload) {
      Task.insert({
        data: {
          column_id: payload.column_id,
          board_id: payload.board_id,
          name: payload.name,
          priority: payload.priority
        },
      });
    },
    updateTask(state, payload) {
      Task.update({
        where: (task) => {
          return task.id === payload.id;
        },
        data: {
          name: payload.name.trim().replace(/[\n\r]+/g, ''),
          timeMinutes: payload.timeMinutes
        },
      });
    },
    deleteTask(state, payload) {
      Task.delete(payload.taskId);
    },
    changePriority(state, payload) {
      Task.update({
        where: (task) => {
          return task.id === payload.id;
        },
        data: { priority: payload.priority },
      });
    },
    changeTaskHighlightColor(state, payload) {
      Task.update({
        where: (task) => {
          return task.id === payload.id;
        },
        data: {
          highlightColor: payload.highlightColor
        },
      });
    },
  },
  actions: {
    saveTaskItem({ commit }, payload) {
      commit("saveTask", payload);
    },
    changeTaskItem({ commit }, payload) {
      commit("updateTask", payload);
    },
    deleteTask({ commit }, payload) {
      commit("deleteTask", payload);
    },
    changePriority({ commit }, payload) {
      commit("changePriority", payload);
    },
    changeTaskHighlightColor({ commit }, payload) {
      commit("changeTaskHighlightColor", payload);
    },
  },
};
