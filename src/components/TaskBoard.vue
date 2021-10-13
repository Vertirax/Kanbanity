<template>
  <div style="height: 100%">
    <Navbar buttonType="taskboard" @addNewList="openNewListPopup" />
    <div class="container-fluid main-container scrollable-div">
      <div class="board-wrapper">
        <div class="board-details">
          <div class="project-name mb-2">
            <!-- <h3 v-if="showName">{{getBoardName}}</h3> -->
            <input
              type="text"
              :value="this.$route.params.boardName"
              class="project-name-input form-control"
            />
          </div>
          <!-- <p class="project-description">{{projectDescription}}</p> -->
          <input
            type="text"
            :value="this.$route.params.boardDescription"
            class="project-desc-input form-control"
          />
        </div>
        <draggable
          v-if="lists"
          v-model="lists"
          class="row flex-nowrap"
          v-bind="getDragOptions"
        >
          <TaskList
            v-for="(listItem, index) in lists"
            :key="index"
            :board="getBoard"
            :list="listItem"
          ></TaskList>
        </draggable>
      </div>
    </div>
    <NewColumnPopup
      :id="'new-column-' + currentBoardId"
      @save="addNewList"
    />
  </div>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import TaskList from "@/components/TaskList.vue";
import draggable from "vuedraggable";
import { mapActions, mapGetters, mapState } from "vuex";
import NewColumnPopup from "@/components/popups/NewColumnPopup.vue";
import Column from "@/models/KanbanColumn";
import KanbanColumn from "@/classes/KanbanColumn";

export default {
  name: "TaskBoard",
  components: {
    TaskList,
    draggable,
    Navbar,
    NewColumnPopup,
  },
  data() {
    return {
      projectName: "",
      projectDescription: "",
    };
  },
  computed: {
    ...mapState(["columns", "tasks", "boardName"]),
    lists: {
      get(): Column[] {
        return Column.query()
          .where("board_id", this.$store.state.currentBoardId)
          .get();
      },
      set(value: Column[]): void {
        // column ordering
        this.$store.commit("updateList", value);
      },
    },
    getDragOptions() {
      return {
        animation: "200",
        ghostClass: "ghost",
        handle: ".board-header",
        group: "kanban-board-lists",
      };
    },
    currentBoardId(): string {
      return this.$route.params.currentBoardId;
    },
  /*
    ...mapGetters({
      boards: "allBoards",
      isLoading: "isLoading",
    }),*/
    getBoardName() {
      return "name constant";
      /*let that = this;
      this.boards.find(function(b) {
        if (b.id === that.param) {
          that.currentBoard = b;
          that.projectName = b.name;
          that.projectDescription = b.description;
        }
      });
      return this.projectName;*/
    },

    shouldAllowListOrder() {
      return true;
      // return this.isDesktop || this.isTablet;
    },
    getBoard() {
      return this.$store.state.currentBoardId;
    },
  },
  methods: {
    ...mapActions(["addTaskToBoard", "reorderTaskLists"]),
    /*/ ...mapActions({
      reorderTaskLists: "reorderTaskLists",
      saveTaskBoard: "saveTaskBoard",
    }),*/
    openNewListPopup(): void {
      this.$bvModal.show("new-column-" + this.$store.state.currentBoardId);
    },
    addNewList(payload: KanbanColumn): void {
      Column.insert({
        data: {
          board_id: this.$store.state.currentBoardId,
          name: payload.title,
          description: payload.description,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.board-details {
  .project-name {
    display: flex;
    // justify-content: center;
    align-items: center;

    &:hover {
      .name-edit-icon {
        display: block;
      }
    }
  }
  .name-edit-icon {
    display: none;
    width: 50px;
    text-align: center;
    cursor: pointer;
  }
  .project-name-input,
  .project-desc-input {
    font-size: 20px;
    color: #525f7f;
    border: 1px solid transparent;
    background: transparent;
    width: 50%;
    padding: 0 0 0 10px;
    &:hover {
      border: 1px solid #cad1d7;
    }
    &:focus {
      border: 1px solid #98a8fb;
    }
  }
  .project-desc-input {
    font-size: 15px;
    height: 30px;
  }
}
</style>
