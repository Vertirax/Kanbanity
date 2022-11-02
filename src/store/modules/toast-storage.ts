import { BToast } from "bootstrap-vue";
import Toast from "@/classes/Toast";
import { i18n } from "@/i18n";

export default {
  store: {},
  actions: {
    successToaster({ dispatch }, payload: Toast): void {
      payload.variant = "success";

      dispatch("showToaster", payload);
    },
    errorToaster({ dispatch }, payload: Toast): void {
      payload.variant = "danger";

      dispatch("showToaster", payload);
    },
    // eslint-disable-next-line
    showToaster({ dispatch }, payload: Toast): void {
      new BToast().$bvToast.toast(i18n.t(payload.message).toString(), {
        title: i18n.t(payload.title).toString(),
        variant: payload.variant,
        autoHideDelay: 3500,
        toaster: "b-toaster-bottom-right",
        solid: true,
      });
    },
  },
};
