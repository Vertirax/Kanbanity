import { Model } from "@vuex-orm/core";
import { nanoid } from "nanoid";
import { Priority } from "@/enums/Priorities";

export default class Task extends Model {
  static entity = "tasks";

  static fields() {
    return {
      id: this.uid(),
      column_id: this.string(null).nullable(),
      name: this.string(""),
      description: this.string(""),
      priority: this.string(Priority.MEDIUM_PRIORITY),
      // board: this.belongsTo(Board, "board_id"),
    };
  }
}
