import { Model } from "@vuex-orm/core";
import { nanoid } from "nanoid";

export default class Preferences extends Model {
  static entity = "preferences";

  static fields() {
    return {
      id: this.uid(() => nanoid(10)),
      showHelperAlert: this.boolean(true),
      showConfirmationPopup: this.boolean(true),
      ignoreNewBoardPopup: this.boolean(false),
    };
  }
}
