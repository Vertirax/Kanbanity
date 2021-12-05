// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
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
      /*Task.update({
        where: payload.taskId,
        data: { column_id: payload.toColumnId },
      });
      Task.update({
        where: (task) => { return task.id === payload.taskId; },
        data: { column_id: payload.toColumnId },
      });*/
      const draggedTask = Task.find(payload.taskId);
      draggedTask.column_id = payload.toColumnId;
      const targetColTasks = Task.query().where("column_id", payload.toColumnId).get();
      targetColTasks.splice(payload.itemNewIndex, 0, draggedTask);
      targetColTasks.forEach((val) => val.$delete());
      Task.insert({ data: targetColTasks });

      // TODO: replace logic with update.
      /*const task = Task.find(payload.taskId);
      Task.insert({
        data: {
          column_id: payload.toColumnId,
          board_id: task.board_id,
          name: task.name,
          description: task.description,
          priority: task.priority,
        },
      });
      Task.delete(payload.taskId);*/
    },
  },
  actions: {
    dragTask({ commit }, payload): void {
      commit("dragBetweenColumns", payload);
    },
  },
  getters: {
    getItemNewIndex: (state) => state.itemNewIndex,
  },
};
