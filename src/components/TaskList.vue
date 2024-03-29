<template>
  <div>
    <div class="task-board" :data-board-name="list.name">
      <div class="board-header">
        <p class="board-name mx-1 mw-50">{{ list.name }}</p>
        <TotalTime
          class="ml-auto"
          v-if="totalColTime.hours > 0 || totalColTime.minutes > 0"
          :total="totalColTime"
        />
        <ActionDropdown @edit="openPopup" @delete="deleteColumn" />
      </div>
      <div class="board-content">
        <ul class="task-list">
          <draggable
            v-if="!hideDraggableList"
            :list="items"
            v-bind="dragOptions"
            v-bind:colId="colData.id"
            group="kanban-board-list-items"
            class="list-group"
            :move="onMove"
            @end="onEnd(colData.id)"
            @remove="removeFlicker"
            :v-bind:col="items"
            @change="items = $event"
          >
            <transition-group
              type="transition"
              :name="!drag ? 'flip-list' : null"
            >
              <TaskItem
                v-for="item in items"
                :task="item"
                :list="list"
                :board="board"
                :key="item.id"
                @deleteTask="deleteTask"
              />
            </transition-group>
          </draggable>
          <TaskItemTemplate
            v-if="showTemplate"
            :list="list"
            @toggleTemplate="toggleTemplate"
            @discardItem="hideTemplate"
          />
        </ul>
      </div>
      <div class="board-footer">
        <a class="add-task-btn" @click="toggleTemplate">
          {{ $t("task-board.task.add") }}<b-icon-plus />
        </a>
      </div>
    </div>
    <ColumnPopup :id="editColumnPopupId" :list="list" @save="editColumn" edit />
  </div>
</template>

<script lang="ts">
import draggable from "vuedraggable";
import TaskItem from "@/components/TaskItem.vue";
import TaskItemTemplate from "@/components/TaskItemTemplate.vue";
import Task from "@/models/Task";
import Column from "@/models/KanbanColumn";
import KanbanColumn from "@/classes/KanbanColumn";
import { mapActions, mapGetters } from "vuex";
import ColumnPopup from "@/components/popups/ColumnPopup.vue";
import TimeMixin from "@/mixins/TimeMixin";
import Toast from "@/classes/Toast";
import ActionDropdown from "@/components/form/ActionDropdown.vue";
import TotalTime from "@/components/form/TotalTime.vue";

export default {
  name: "TaskList",
  components: {
    TaskItem,
    draggable,
    TaskItemTemplate,
    ColumnPopup,
    ActionDropdown,
    TotalTime,
  },
  props: ["board", "list"],
  mixins: [TimeMixin],
  data() {
    return {
      drag: false,
      showTemplate: false,
      hideDraggableList: false,
      taskId: "",
      fromColumnId: "",
      toColumnId: "",
      editColumnPopupId: "edit-column-popup-" + this.list.id,
    };
  },
  computed: {
    ...mapGetters({
      newIndex: "getItemNewIndex",
    }),
    dragOptions() {
      return {
        animation: "200",
        ghostClass: "ghost",
        group: "kanban-board-list-items",
      };
    },
    items: {
      get(): Task[] {
        return Task.query().where("column_id", this.list.id).get();
      },
      // eslint-disable-next-line
      set(value: any): void {
        // 'added' and 'removed' are present on dnd to other columns, 'moved' within column
        if (value.moved) {
          this.dragInColumn(value.moved);
        } else if (value.added) {
          this.setItemNewIndex(value.added.newIndex);
        }
      },
    },
    colData(): KanbanColumn {
      return new KanbanColumn(
        this.list.id,
        this.list.name,
        this.list.description
      );
    },
  },
  methods: {
    ...mapActions(["dragTask", "dragInColumn", "setItemNewIndex"]),
    deleteColumn(): void {
      this.$store.dispatch("deleteColumn", { colId: this.list.id }).then(() => {
        this.showToast("task-board.toaster.delete");
      });
    },
    deleteTask(taskId: string): void {
      this.$store.dispatch("deleteTask", { taskId: taskId }).then(() => {
        this.showToast("task-board.task.toaster.delete.message");
      });
    },
    openPopup(): void {
      this.$bvModal.show(this.editColumnPopupId);
    },
    showToast(message: string): void {
      this.$store.dispatch(
        "successToaster",
        new Toast("task-board.title", message)
      );
    },
    editColumn(e: Column): void {
      this.$store.dispatch("editColumn", e);
    },
    onMove({ relatedContext, draggedContext }): void {
      this.taskId = draggedContext?.element?.id;
      this.toColumnId = relatedContext?.component?.$attrs?.colId;
    },
    onEnd(id: string): void {
      this.fromColumnId = id;
      if (
        this.taskId &&
        this.fromColumnId &&
        this.fromColumnId !== this.toColumnId
      ) {
        this.dragTask({
          taskId: this.taskId,
          fromColumnId: this.fromColumnId,
          toColumnId: this.toColumnId,
          itemNewIndex: this.newIndex,
        });
      }
    },
    removeFlicker(): void {
      this.hideDraggableList = true;
      this.$nextTick(() => {
        this.$nextTick(() => {
          this.hideDraggableList = false;
        });
      });
    },
    toggleTemplate(): void {
      this.showTemplate = !this.showTemplate;
    },
    hideTemplate(): void {
      this.showTemplate = false;
    },
  },
};
</script>
<style lang="scss">
p {
  margin-bottom: 0;
}
.sortable-chosen.ghost .task-item {
  background: #e8eaf1;
  border: 2px solid#e2e2e2;
}
.flip-list-move {
  transition: transform 0.2s;
}
.no-move {
  transition: transform 0s;
}
.list-group {
  min-height: 30px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
.task-board {
  .board-header {
    .options {
      padding: 5px 5px;
    }
    .dropdown-menu {
      min-width: 10rem;
    }
  }
}
</style>
