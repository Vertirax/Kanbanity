import { Model } from "@vuex-orm/core";
import { nanoid } from "nanoid";
import { Priority } from "@/enums/Priorities";

export default class Task extends Model {
  static entity = "tasks";

  static fields() {
    return {
      id: this.uid(() => nanoid(10)),
      column_id: this.string(null).nullable(),
      board_id: this.string(null).nullable(),
      name: this.string(""),
      description: this.string(""),
      priority: this.string(Priority.MEDIUM),
      highlightColor: this.string(null).nullable(),
    };
  }
}
