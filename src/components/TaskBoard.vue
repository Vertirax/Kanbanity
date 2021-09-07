<template>
  <div style="height: 100%">
    <Navbar buttonType="taskboard" />
    <div class="container-fluid main-container scrollable-div">
      <div class="board-wrapper">
        <div class="board-details">
          <div class="project-name mb-2">
            <!-- <h3 v-if="showName">{{getBoardName}}</h3> -->
            <input
              type="text"
              :value="getBoardName"
              class="project-name-input form-control"
              @blur="editProjectName"
            />
          </div>
          <!-- <p class="project-description">{{projectDescription}}</p> -->
          <input
            type="text"
            :value="projectDescription"
            class="project-desc-input form-control"
            @blur="editProjectDescription"
          />
        </div>
        <draggable
          v-model="lists"
          class="row flex-nowrap"
          v-bind="getDragOptions"
        >
          <TaskList
            v-for="(listItem, index) in this.lists"
            :key="index"
            :board="getBoard"
            :list="listItem"
          ></TaskList>
        </draggable>
      </div>
    </div>
    <TaskDetailPopup />
  </div>
</template>

<script lang="ts">
import TaskItem from "@/components/TaskItem.vue";
import Navbar from "@/components/Navbar.vue";
import TaskList from "@/components/TaskList.vue";
import store from "./../store/index";
import draggable from "vuedraggable";
import { mapActions, mapGetters } from "vuex";
import TaskDetailPopup from "./popups/TaskDetailPopup.vue";
import KanbanColumn from "@/classes/KanbanColumn";

export default {
  name: "TaskBoard",
  props: ["board"],
  components: {
    // eslint-disable-next-line vue/no-unused-components
    TaskItem,
    TaskList,
    draggable,
    Navbar,
    TaskDetailPopup,
  },
  data() {
    return {
      projectName: "",
      projectDescription: "",
      currentBoard: "",
      lists: [
        new KanbanColumn("1283", "name", "desc"),
        new KanbanColumn("2746", "name2", "desc2"),
      ],
    };
  },
  created() {
    // console.log(this.$store.state.boards);
  },
  /*computed: {
    ...mapGetters({
      boards: "allBoards",
      isLoading: "isLoading",
    }),
    /*getBoardName() {
      let that = this;
      this.boards.find(function(b) {
        if (b.id === that.param) {
          that.currentBoard = b;
          that.projectName = b.name;
          that.projectDescription = b.description;
        }
      });
      return this.projectName;
    },
    getDragOptions() {
      return {
        animation: "200",
        ghostClass: "ghost",
        handle: ".board-header",
        group: "kanban-board-lists",
      };
    },

    param() {
      return this.$route.params.id;
    },
    shouldAllowListOrder() {
      return this.isDesktop || this.isTablet;
    },
    getBoard() {
      return this.boards.find((b) => b.id === this.param);
    },
    lists: {
      get() {
        console.log(this.getBoard.lists);
        return this.getBoard.lists;
      },
      async set(value) {
        await this.reorderTaskLists({
          boardId: this.param,
          lists: value
        });
      }
    }
  },
  methods: {
    // ...mapActions(["addTaskToBoard", "reorderTaskLists"]),
    ...mapActions({
      reorderTaskLists: "reorderTaskLists",
      setActiveTaskBoard: "setActiveTaskBoard",
      saveTaskBoard: "saveTaskBoard",
    }),
    editProjectName(e){
      this.currentBoard.name = e.target.value.trim();
      this.saveTaskBoard(this.currentBoard);
    },
    editProjectDescription(e){
      this.currentBoard.description = e.target.value.trim();
      this.saveTaskBoard(this.currentBoard);
    },
    createNewTask(key) {
      let newTask = {
        title: "",
        priority: "Low",
        comments: [],
        attachments: [],
        assignedUsers: [],
      };
      this.addTaskToBoard({ key, newTask });
    },
  },*/
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
    font-size: 24px;
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
