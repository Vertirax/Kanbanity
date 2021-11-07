import { Model } from "@vuex-orm/core";
import { nanoid } from "nanoid";

export default class Notification extends Model {
  static entity = "notifications";

  static fields() {
    return {
      id: this.uid(() => nanoid(10)),
      title: this.string(""),
      message: this.string(""),
      iconUrl: this.string(""),
      hour: this.number(null),
      minute: this.number(null),
      active: this.boolean(true),
    };
  }
}
