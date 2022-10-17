import BoardTemplate from "@/classes/BoardTemplate";
import Template from "@/models/BoardTemplate";
import Toast from "@/classes/Toast";
import Preferences from "@/models/Preferences";

const preferencesTitle = "preferences.options.toaster.title";

export default {
  store: {
    boardTemplates: [BoardTemplate],
  },
  mutations: {
    addNewTemplate(): void {
      Template.insert({ data: new BoardTemplate() });
    },
    saveTemplate(state, payload: BoardTemplate): void {
      Template.update({
        data: payload,
      }).then(() => {
        this.dispatch("successToaster", new Toast(
          preferencesTitle,
          "preferences.options.toaster.success.save"
        ));
      });
    },
    deleteTemplate(state, payload: string): void {
      Template.delete(payload).then(
        () => {
          this.dispatch("successToaster", new Toast(
            preferencesTitle,
            "preferences.options.toaster.success.delete"
          ));
        });
    },
    changeShowHelperAlert(state, payload: boolean): void {
      this.getters.getPreferences.$update({ showHelperAlert: payload })
    },
    changeShowConfirmationPopup(state, payload: boolean): void {
      this.getters.getPreferences.$update({ showConfirmationPopup: payload })
    }
  },
  actions: {
    addBoardTemplate({ commit }): void {
      commit("addNewTemplate");
    },
    saveBoardTemplate({ commit }, payload): void {
      commit("saveTemplate", payload);
    },
    deleteBoardTemplate({ commit }, id: string): void {
      commit("deleteTemplate", id);
    },
    changeShowHelperAlert({ commit }, payload: boolean): void {
      commit("changeShowHelperAlert", payload);
    },
    changeShowConfirmationPopup({ commit }, payload: boolean): void {
      commit("changeShowConfirmationPopup", payload);
    }
  },
  getters: {
    getPreferences: () => Preferences.query().first(),
    getShowHelperAlertPreference: (state, getters) => getters.getPreferences.showHelperAlert,
    getShowConfirmationPopup: (state, getters) => getters.getPreferences.showConfirmationPopup,
  },
};
