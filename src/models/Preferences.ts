import { Model } from "@vuex-orm/core";
import { nanoid } from "nanoid";
import BoardTemplate from "@/classes/BoardTemplate";

export default class Notification extends Model {
  static entity = "preferences";

  static fields() {
    return {
      id: this.uid(() => nanoid(10)),
      ignoreNewBoardPopup: this.boolean(false),

      templates: this.attr([BoardTemplate]),
    };
  }
}
