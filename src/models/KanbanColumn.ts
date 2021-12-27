import { Model } from "@vuex-orm/core";
import { nanoid } from "nanoid";

export default class KanbanColumn extends Model {
  static entity = "columns";

  static fields() {
    return {
      id: this.uid(() => nanoid(10)),
      board_id: this.string(null).nullable(),
      name: this.string(""),
      description: this.string(""),
    };
  }
}
