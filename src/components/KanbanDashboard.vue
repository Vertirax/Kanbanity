<template>
  <div class="main-wrapper">
    <Navbar buttonType="dashboard" />
    <div class="container-fluid main-container">
      <div class="row equal my-3 mx-2" style="position: relative; z-index: unset">
        <div
          class="col-xs-12 col-sm-6 col-md-4 col-xl-3 d-flex pb-3"
          v-for="board in boards"
          :key="board.id"
        >
          <router-link
            class="project-card"
            :to="{
              name: 'task-board',
              params: {
                currentBoardId: board.id,
                boardName: board.name,
                boardDescription: board.description,
              },
            }"
            @click.native="setCurrentBoardId(board.id)"
          >
            <div class="card w-100 h-100 board-item shadow-sm--hover shadow-sm">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <h5 class="card-title flex-nowrap">{{ board.name }}</h5>
                  <div>
                    <b-dropdown id="dropdown" size="xl" variant="link" toggle-class="text-decoration-none" no-caret>
                      <template #button-content>
                        <b-icon-three-dots-vertical variant="dark" />
                      </template>
                      <b-dropdown-item><b-icon-pencil-fill class="mr-3"/>Edit</b-dropdown-item>
                      <b-dropdown-item @click="deleteBoard(board.id)"><b-icon-trash-fill class="mr-3"/>Delete</b-dropdown-item>
                    </b-dropdown>
                  </div>
                </div>
                <p class="card-text text-truncate">{{ board.description }}</p>
              </div>
              <div class="card-footer bg-transparent">
                <div class="details-wrapper">
                  <div class="board-info">
                    <!--<p class="card-text">Lists : {{ columnCount(board.id) }} | Items : {{ taskCount(board.id) }}</p>-->
                    <p class="card-text"><b-icon-layout-sidebar-inset/> {{ columnCount(board.id) }} | <b-icon-list-task/> {{ taskCount(board.id) }}</p>
                  </div>
                  <div class="date">
                    <p class="text-muted">{{ board.createdDateString }}</p>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <!--<Twitter v-model="colors" triangle="hide"></Twitter>-->
      <!--<div class="row">
        <div class="col-md-12">
          <div>
            <draggable class="board-wrapper" >
              <TaskBoard
                v-for="(board, key) in xboards"
                :board="board"
                :key="key"
              />
            </draggable>
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from "vuex";
import Navbar from "@/components/Navbar.vue";
import Boards from "@/models/Board";
import Task from "@/models/Task";
import Column from "@/models/KanbanColumn";

export default {
  name: "Dashboard",
  components: {
    Navbar,
  },
  data() {
    return {
      // boards: {},
      colors: {
        hex: "#FF6900",
      },
    };
  },
  computed: {
    ...mapGetters({
      // unarchivedBoards: "unarchivedBoards",
      // archivedBoards: "archivedBoards",
    }),
    boards() {
      return Boards.all();
    },
    // ...mapState(["boards"]),
  },
  mounted() {
    this.setCurrentBoardId("");
  },
  methods: {
    ...mapActions({
      setActiveTaskBoard: "setActiveTaskBoard",
      archiveTaskBoard: "archiveTaskBoard",
      restoreTaskBoard: "restoreTaskBoard",
    }),
    setCurrentBoardId(id: string): void {
      this.$store.commit("setCurrentBoardId", id);
    },
    deleteBoard(id: string): void {
      this.$store.dispatch("deleteBoard", { boardId: id });
    },
    columnCount(boardId: string): number {
      return Column.query().where("board_id", boardId).count();
    },
    taskCount(boardId: string): number {
      return Task.query().where("board_id", boardId).count();
    },
  },
};
</script>

<style lang="scss" scoped>

.row {
  position: relative;
  z-index: 1;
}
.col-xs-12 {
  z-index: 200;
}

a:hover {
  text-decoration: none;
}
.card {
  transition: transform 0.25s ease;

  .card-footer {
    margin-top: 2rem;
  }
}
.card:hover {
  transform: scale(1.1);
}
.project-card {
  display: block;
  width: 100%;
}
.details-wrapper {
  display: flex;
  justify-content: space-between;
  .board-info p,
  .date p {
    font-size: 13px;
  }
}
</style>
