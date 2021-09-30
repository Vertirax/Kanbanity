import { Model } from "@vuex-orm/core";
import KanbanColumn from "./KanbanColumn";
import { nanoid } from "nanoid";

export default class Board extends Model {
  static entity = "boards";

  static fields() {
    return {
      id: this.uid(),
      name: this.string(""),
      description: this.string(""),
      columns: this.hasMany(KanbanColumn, "board_id"),
    };
  }
}
