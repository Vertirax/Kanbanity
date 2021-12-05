// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import BoardTemplate from "@/classes/BoardTemplate";
import Preferences from "@/models/Preferences";
import Template from "@/models/BoardTemplate";

const preferencesTitle = "Preferences";

export default {
  store: {
    boardTemplates: [BoardTemplate],
  },
  mutations: {
    editPreferences(state, payload: BoardTemplate): void {
      // TODO
    },
    addNewTemplate(): void {
      Template.insert({ data: new BoardTemplate() });
    },
    saveTemplate(state, payload: BoardTemplate): void {
      Template.update({
        data: payload,
      }).then(() => {
        this.dispatch("successToaster", {
          title: preferencesTitle,
          message: "Successfully saved Board Template!",
        });
      });
    },
    deleteTemplate({ dispatch }, payload: string): void {
      Template.delete(payload).then(
        () => {
        this.dispatch("successToaster", {
          title: preferencesTitle,
          message: "Successfully deleted Board Template!",
        });
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
  getters: {
    getBoardTemplates: (state) => state.boardTemplates,
  },
};
