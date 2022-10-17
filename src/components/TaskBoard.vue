<template>
  <div class="h-100">
    <Navbar>
      <template #addButton>
        <GeneralButton
          variant="primary"
          :text="$t('task-board.buttons.add')"
          @click="openNewListPopup"
        />
      </template>
    </Navbar>
    <div class="container-fluid main-container scrollable-div">
      <div class="board-wrapper">
        <div class="row">
          <div class="col-10">
            <b-icon
              role="button"
              v-b-toggle.collapse
              :icon="isCollapsed ? 'chevron-down' : 'chevron-right'"
            />
            <b-collapse
              class="board-details pl-1"
              id="collapse"
              v-model="isCollapsed"
            >
              <div class="project-name mb-2 row">
                <b-input
                  type="text"
                  :value="currentBoard.name"
                  class="project-name-input col-6"
                  disabled
                />
              </div>
              <div class="row" v-if="currentBoard.description !== ''">
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
          </div>
          <div
            class="col-2 total-time-spent"
            v-if="totalBoardTime.hours > 0 || totalBoardTime.minutes > 0"
          >
            {{ $t("task-board.titles.total-time-spent") }}:
            <span v-if="totalBoardTime.hours > 0">
              {{ totalBoardTime.hours
              }}{{ $t("task-board.titles.hours") }}</span
            >
            <span v-if="totalBoardTime.minutes > 0">
              {{ totalBoardTime.minutes
              }}{{ $t("task-board.titles.minutes") }}</span
            >
          </div>
        </div>
        <HelperAlert
          v-if="showAlert"
          :text="$t('task-board.alert')"
          :show="lists.length === 0"
        />
        <draggable
          v-if="lists"
          v-model="lists"
          class="row flex-nowrap"
          v-bind="getDragOptions"
        >
          <TaskList
            v-for="list in lists"
            :key="list.id"
            :board="currentBoard.id"
            :list="list"
          ></TaskList>
        </draggable>
      </div>
    </div>
    <ColumnPopup :id="newColumnPopupId" @save="addNewList" />
  </div>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import TaskList from "@/components/TaskList.vue";
import draggable from "vuedraggable";
import { mapActions, mapGetters } from "vuex";
import Column from "@/models/KanbanColumn";
import ColumnPopup from "@/components/popups/ColumnPopup.vue";
import GeneralButton from "@/components/form/GeneralButton.vue";
import HelperAlert from "@/components/utility/HelperAlert.vue";
import TimeMixin from "@/mixins/TimeMixin";

export default {
  name: "TaskBoard",
  components: {
    TaskList,
    draggable,
    Navbar,
    ColumnPopup,
    GeneralButton,
    HelperAlert,
  },
  mixins: [TimeMixin],
  data() {
    return {
      newColumnPopupId: "new-column-popup",
      isCollapsed: true,
    };
  },
  computed: {
    ...mapGetters({
      currentBoard: "getCurrentBoard",
      showAlert: "getShowHelperAlertPreference",
    }),
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
    addNewList(payload: Column): void {
      this.saveColumn(payload);
    },
  },
  created() {
    if (
      this.currentBoard === undefined ||
      Object.keys(this.currentBoard).length === 0
    ) {
      this.$router.push("/");
    }
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
