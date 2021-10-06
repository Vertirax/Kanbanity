import { BToast } from "bootstrap-vue";

export default {
  store: {},
  actions: {
    successToaster({ dispatch }, payload: any): void {
      payload.variant = "success";

      dispatch("showToaster", payload);
    },
    showToaster({ dispatch }, payload: any): void {
      new BToast().$bvToast.toast(payload.message, {
        title: payload.title,
        variant: payload.variant,
        autoHideDelay: 3500,
        toaster: "b-toaster-bottom-right",
        solid: true,
      });
    },
  },
};
