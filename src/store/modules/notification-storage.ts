import Notification from "@/models/Notification";
import NotificationClass from "@/classes/Notification";

export default {
  store: {},
  mutations: {
    addNewNotification(state, payload: NotificationClass): void {
      Notification.insert({ data: payload });
    },
    editNotification(state, payload: NotificationClass): void {
      Notification.update({
        data: payload,
      });
    },
    deleteNotification(state, payload: string): void {
      Notification.delete(payload);
    },
  },
  actions: {
    addNotification({ commit }, payload): void {
      commit("addNewNotification", payload);
    },
    editNotification({ commit }, payload): void {
      commit("editNotification", payload);
    },
    deleteNotification({ commit }, id: string): void {
      commit("deleteNotification", id);
    },
  },
  getters: {
    getAllNotifications: () => Notification.all(),
  },
};
