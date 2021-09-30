import { Model } from "@vuex-orm/core";
import { nanoid } from "nanoid";
import Task from "@/models/Task";

export default class KanbanColumn extends Model {
  static entity = "columns";

  static fields() {
    return {
      id: this.uid(),
      board_id: this.string(null).nullable(),
      name: this.string(""),
      description: this.string(""),
      tasks: this.hasMany(Task, "column_id"),
      // board: this.belongsTo(Board, "board_id"),
    };
  }
}
