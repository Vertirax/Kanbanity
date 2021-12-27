import { Model } from "@vuex-orm/core";
import { nanoid } from "nanoid";

export default class Board extends Model {
  static entity = "boards";

  static fields() {
    return {
      id: this.uid(() => nanoid(10)),
      name: this.string(""),
      description: this.string(""),
      createdDateString: this.string(""),
    };
  }
}
