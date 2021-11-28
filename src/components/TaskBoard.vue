<template>
  <div class="h-100">
    <Navbar @addNewList="openNewListPopup" />
    <div class="container-fluid main-container scrollable-div">
      <div class="board-wrapper">
        <b-icon v-b-toggle.collapse :icon="isCollapsed ? 'chevron-down' : 'chevron-up'"/>
        <b-collapse class="board-details pl-1" id="collapse" v-model="isCollapsed">
          <div class="project-name mb-2 row">
            <b-input
              type="text"
              :value="currentBoard.name"
              class="project-name-input col-6"
              disabled
            />
          </div>
          <div class="row">
            <b-input
              type="text"
              :value="currentBoard.description"
              class="project-desc-input col-6"
              disabled
            />
          </div>
          <div class="row">
            <b-input
              type="text"
              :value="currentBoard.createdDateString"
              class="project-desc-input col-6"
              disabled
            />
          </div>
        </b-collapse>
        <draggable
          v-if="lists"
          v-model="lists"
          class="row flex-nowrap"
          v-bind="getDragOptions"
        >
          <TaskList
            v-for="(listItem, index) in lists"
            :key="index"
            :board="currentBoard.id"
            :list="listItem"
          ></TaskList>
        </draggable>
      </div>
      <HelperImage v-if="lists.length === 0" text="Add a list to track your work!" />
    </div>
    <NewColumnPopup
      :id="newColumnPopupId"
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
import HelperImage from "@/components/HelperImage.vue";
import Column from "@/models/KanbanColumn";
import KanbanColumn from "@/classes/KanbanColumn";

export default {
  name: "TaskBoard",
  components: {
    TaskList,
    draggable,
    Navbar,
    NewColumnPopup,
    HelperImage,
  },
  data() {
    return {
      newColumnPopupId: "new-column-popup",
      isCollapsed: true,
    };
  },
  computed: {
    ...mapState(["columns", "tasks", "boardName"]),
    ...mapGetters({ currentBoard: "getCurrentBoard" }),
    lists: {
      get(): Column[] {
        return Column.query().where("board_id", this.currentBoard.id).get();
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
  },
  methods: {
    ...mapActions(["saveColumn"]),
    openNewListPopup(): void {
      this.$bvModal.show(this.newColumnPopupId);
    },
    addNewList(payload: KanbanColumn): void {
      this.saveColumn(payload);
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .absolute-text {
  bottom: 40%;
}
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
