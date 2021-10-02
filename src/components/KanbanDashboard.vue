<template>
  <div class="main-wrapper">
    <Navbar buttonType="dashboard" />
    <div class="container-fluid main-container">
      <div class="row equal">
        <div
          class="col-xs-12 col-sm-6 col-md-4 col-xl-3 d-flex pb-3"
          v-for="board in boards"
          :key="board.id"
        >
          <router-link
            class="project-card"
            :to="{ name: 'task-board', params: { currentBoardId: board.id } }"
            @click.native="setCurrentBoardId(board.id)"
          >
            <div class="card w-100 h-100 board-item shadow-sm--hover shadow-sm">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <h5 class="card-title flex-nowrap">{{ board.name }}</h5>
                </div>
                <p class="card-text text-truncate">{{ board.description }}</p>
              </div>
              <div class="card-footer bg-transparent">
                <div class="details-wrapper">
                  <div class="board-info">
                    <!--<p class="card-text">Lists : 0 | Items : 0</p>-->
                  </div>
                  <div class="date">
                    <!--<p class="text-muted">22 July 2019</p>-->
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <Twitter v-model="colors" triangle="hide"></Twitter>
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
import { Twitter } from "vue-color";

export default {
  name: "Dashboard",
  components: {
    Navbar,
    Twitter,
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
  methods: {
    ...mapActions({
      setActiveTaskBoard: "setActiveTaskBoard",
      archiveTaskBoard: "archiveTaskBoard",
      restoreTaskBoard: "restoreTaskBoard",
    }),
    setCurrentBoardId(id: string) {
      this.$store.commit("setCurrentBoardId", id);
    },
    /*totalItems(lists) {
      let count = 0;
      lists.forEach((element) => {
        console.log(element);
        if (element.items) count += element.items.length;
      });
      return count;
    },
    handleArchiveTaskBoard(board) {
      this.archiveTaskBoard({ boardId: board.id });
    },
    handleRestoreTaskBoard(board) {
      this.restoreTaskBoard({ boardId: board.id });
    },
  },
  /*async created() {
    await this.setActiveTaskBoard({
      board: null,
    });*/
  },
  mounted() {
    // console.log(this.$store.state.boards.columns);
  },
};
</script>

<style lang="scss" scoped>
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
