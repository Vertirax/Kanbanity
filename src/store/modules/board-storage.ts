import KanbanDashboard from "@/classes/Board";
import Column from "@/models/KanbanColumn";
import Task from "@/models/Task";
import Board from "@/models/Board";
import Toast from "@/classes/Toast";

export default {
  state: () => ({ currentBoard: KanbanDashboard }),
  mutations: {
    setCurrentBoard(state, board) {
      state.currentBoard = new KanbanDashboard(
        board.id,
        board.name,
        board.description,
        board.createdDateString
      );
    },
    saveBoard(state, payload) {
      Board.insert({
        data: {
          name: payload.board.name,
          description: payload.board.description,
          createdDateString: new Date().toLocaleDateString(),
        },
      }).then((response) => {
        if (payload.template.name !== "") {
          payload.template.columns.split(",").map((template) => {
            template = template.trim();
            Column.insert({
              data: {
                board_id: response.boards[0]["id"],
                name: template,
              },
            });
          });
        }
      });
    },
    editBoard(state, payload) {
      Board.update({
        where: (board) => {
          return board.id === payload.id;
        },
        data: {
          name: payload.name,
          description: payload.description,
        },
      });
    },
    deleteBoard(state, payload) {
      Promise.all([
        Task.query()
          .where("board_id", payload.boardId)
          .get()
          .forEach((val) => val.$delete()),
        Column.query()
          .where("board_id", payload.boardId)
          .get()
          .forEach((val) => val.$delete()),
        Board.delete(payload.boardId),
      ]).then(() => {
        this.dispatch("successToaster", new Toast(
          "dashboard.title",
          "dashboard.toaster.delete-message"
        ));
      })
    },
  },
  actions: {
    editBoard({ commit }, payload) {
      commit("editBoard", payload);
    },
    saveBoard({ commit }, payload) {
      commit("saveBoard", payload);
    },
    deleteBoard({ commit }, payload) {
      commit("deleteBoard", payload);
    },
  },
  getters: {
    getCurrentBoard: (state) => state.currentBoard,
    getAllBoards: () => Board.all(),
  },
}
