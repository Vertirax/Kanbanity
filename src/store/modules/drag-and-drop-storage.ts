import Column from "@/models/KanbanColumn";
import Task from "@/models/Task";

export default {
  store: {
    itemNewIndex: 0,
  },
  mutations: {
    setItemNewIndex(state, index): void {
      state.itemNewIndex = index;
    },
    updateList(state, list): void {
      // TODO: replace logic with update.
      const query = Column.query().where("board_id", list[0].board_id).get();
      query.map((val) => val.$delete());
      Column.insert({
        data: list,
      });
    },
    dragInColumn(state, item): void {
      const tasks = Task.query().where("column_id", item.element.column_id).get();
      tasks.forEach((val) => val.$delete());
      tasks.splice(item.oldIndex, 1);
      tasks.splice(item.newIndex, 0, item.element);
      Task.insert({ data: tasks });
    },
    dragBetweenColumns(state, payload): void {
      const draggedTask = Task.find(payload.taskId);
      draggedTask["column_id"] = payload.toColumnId;

      const targetColTasks = Task.query().where("column_id", payload.toColumnId).get();
      targetColTasks.splice(payload.itemNewIndex, 0, draggedTask);
      targetColTasks.forEach((val) => val.$delete());

      Task.insert({ data: targetColTasks });
    },
  },
  actions: {
    dragTask({ commit }, payload): void {
      commit("dragBetweenColumns", payload);
    },
    dragInColumn({ commit }, payload): void {
      commit("dragInColumn", payload);
    },
    setItemNewIndex({ commit }, payload: number): void {
      commit("setItemNewIndex", payload);
    }
  },
  getters: {
    getItemNewIndex: (state) => state.itemNewIndex,
  },
};
