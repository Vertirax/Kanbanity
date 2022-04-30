import BoardTemplate from "@/classes/BoardTemplate";
import Template from "@/models/BoardTemplate";
import Toast from "@/classes/Toast";

const preferencesTitle = "preferences.options.toaster.title";

export default {
  store: {
    boardTemplates: [BoardTemplate],
  },
  mutations: {
    /*editPreferences(state, payload: BoardTemplate): void {
      // TODO
    },*/
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
  },
};
