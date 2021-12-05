import { Model } from "@vuex-orm/core";
import { nanoid } from "nanoid";

export default class BoardTemplate extends Model {
  static entity = "board_templates";

  static fields() {
    return {
      id: this.uid(() => nanoid(10)),
      name: this.string(""),
      columns: this.string(""),
    };
  }
}
