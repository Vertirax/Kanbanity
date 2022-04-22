<template>
  <div class="main-wrapper">
    <Navbar>
      <template #addButton>
        <GeneralButton
          variant="primary"
          :text="$t('dashboard.buttons.add')"
          @click="openPopup"
        />
      </template>
    </Navbar>
    <div class="container-fluid main-container">
      <div class="equal my-3 mx-2" :class="boards.length > 0 ? 'row' : ''">
        <div
          class="col-xs-12 col-sm-6 col-md-4 col-xl-3 d-flex pb-3"
          v-for="board in boards"
          :key="board.id"
        >
          <router-link
            class="project-card"
            to="task-board"
            @click.native="setCurrentBoard(board)"
          >
            <div class="card w-100 h-100 board-item shadow-sm--hover shadow-sm">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <h5 class="card-title flex-nowrap">{{ board.name }}</h5>
                  <div>
                    <b-dropdown
                      id="dropdown"
                      size="xl"
                      variant="link"
                      toggle-class="text-decoration-none"
                      no-caret
                      dropleft
                      offset="30"
                    >
                      <template #button-content>
                        <b-icon-three-dots-vertical variant="dark" />
                      </template>
                      <b-dropdown-item @click="openPopup(board.id)">
                        <b-icon-pencil-fill class="mr-3" />
                        {{ $t("general.button.edit") }}
                      </b-dropdown-item>
                      <b-dropdown-item @click="deleteBoard(board.id)">
                        <b-icon-trash-fill class="mr-3" />
                        {{ $t("general.button.delete") }}
                      </b-dropdown-item>
                    </b-dropdown>
                  </div>
                </div>
                <p class="card-text text-truncate">{{ board.description }}</p>
              </div>
              <div class="card-footer bg-transparent">
                <div class="details-wrapper">
                  <div class="board-info">
                    <p class="card-text">
                      <b-icon-layout-sidebar-inset
                        :title="$t('dashboard.card.cols')"
                      />
                      {{ columnCount(board.id) }} |
                      <b-icon-list-task :title="$t('dashboard.card.tasks')" />
                      {{ taskCount(board.id) }}
                    </p>
                  </div>
                  <div class="date">
                    <p
                      class="text-muted"
                      :title="$t('dashboard.card.created-date')"
                    >
                      {{ board.createdDateString }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
          <DashboardPopup
            :id="popupId + board.id"
            :dashboard="board"
            edit
            @change="editBoard"
          />
        </div>
      </div>
    </div>
    <DashboardPopup :id="popupId" @save="saveBoard" />
  </div>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import Navbar from "@/components/Navbar.vue";
import Task from "@/models/Task";
import Column from "@/models/KanbanColumn";
import KanbanDashboard from "@/classes/Board";
import DashboardPopup from "@/components/popups/DashboardPopup.vue";
import BoardTemplate from "@/classes/BoardTemplate";
import GeneralButton from "@/components/form/GeneralButton.vue";

export default {
  name: "Dashboard",
  components: {
    Navbar,
    DashboardPopup,
    GeneralButton,
  },
  data() {
    return {
      popupId: "dashboard-popup",
    };
  },
  mounted() {
    this.setCurrentBoard(new KanbanDashboard());
  },
  computed: {
    ...mapGetters({ boards: "getAllBoards" }),
  },
  methods: {
    setCurrentBoard(board): void {
      this.$store.commit("setCurrentBoard", board);
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
    openPopup(id: string): void {
      this.$bvModal.show(id ? this.popupId + id : this.popupId);
    },
    editBoard(board: KanbanDashboard): void {
      this.$store.dispatch("editBoard", board);
    },
    saveBoard(board: KanbanDashboard, template: BoardTemplate): void {
      this.$store.dispatch("saveBoard", { board, template });
    },
  },
};
</script>

<style lang="scss" scoped>
.row {
  position: relative;
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
  z-index: 9;
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
