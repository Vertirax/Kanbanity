<template>
  <div>
    <div class="task-board" :data-board-name="list.name">
      <input
        type="text"
        class="form-control"
        :value="list.name"
        v-if="isEditing"
        @blur="saveTaskListName"
      />
      <div class="board-header">
        <p class="board-name mx-1" v-if="!isEditing">{{ list.name }}</p>
        <!--<b-icon-info-circle v-b-tooltip variant="info" class="h5" :title="list.description"></b-icon-info-circle>-->
        <div>
          <b-dropdown id="dropdown" size="xl" variant="link" toggle-class="text-decoration-none" no-caret>
            <template #button-content>
              <b-icon-three-dots-vertical variant="dark" />
            </template>
            <b-dropdown-item @click="openPopup"><b-icon-pencil-fill class="mr-3"/>Edit</b-dropdown-item>
            <b-dropdown-item @click="deleteColumn"><b-icon-trash-fill class="mr-3"/>Delete</b-dropdown-item>
          </b-dropdown>
        </div>
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
                :item="item"
                :list="list"
                :board="board"
                :key="item.id"
                @deleteTask="deleteTask"
              />
            </transition-group>
          </draggable>
          <TaskItemTemplate v-if="showTemplate" :list="list" @toggleTemplate="toggleTemplate" @discardItem="hideTemplate"/>
        </ul>
      </div>
      <div class="board-footer">
        <a class="add-task-btn" @click="toggleTemplate">
          Add task
          <b-icon-plus />
        </a>
      </div>
    </div>
    <EditColumnPopup
      :id="editColumnPopupId"
      :title="'Edit Column ' + list.name"
      :data="colData"
      @save="editColumn"
    /><!--`type-${type}`-->
  </div>
</template>

<script lang="ts">
import draggable from "vuedraggable";
import TaskItem from "@/components/TaskItem.vue";
import TaskItemTemplate from "@/components/TaskItemTemplate.vue";
import Task from "@/models/Task";
import EditColumnPopup from "@/components/popups/EditColumnPopup.vue";
import KanbanColumn from "@/classes/KanbanColumn";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "TaskList",
  components: {
    TaskItem,
    draggable,
    TaskItemTemplate,
    EditColumnPopup,
  },
  props: ["board", "list"],
  data() {
    return {
      drag: false,
      showTemplate: false,
      isEditing: false,
      hideDraggableList: false,
      message: "",
      taskId: "",
      fromColumnId: "",
      toColumnId: "",
      editColumnPopupId: "edit-popup" + this.list.id,
      // taskListName: this.list.name,
    };
  },
  computed: {
    ...mapGetters({ newIndex: "getItemNewIndex" }),
    dragOptions() {
      return {
        animation: "200",
        ghostClass: "ghost",
        group: "kanban-board-list-items",
        //disabled: false,
        // disabled: this.isEditing || !this.shouldAllowTaskItemsReorder
      };
    },
    items: {
      get(): Task[] {
        return Task.query().where("column_id", this.list.id).get();
      },
      set(value): void {
        // 'added' and 'removed' are present on dnd to other columns, 'moved' within column
        if (value.moved) {
          this.$store.commit("dragInColumn", value.moved);
        } else if (value.added) {
          this.$store.commit("setItemNewIndex", value.added.newIndex);
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
    /*shouldAllowTaskItemsReorder() {
      return this.isDesktop || this.isTablet;
    },*/
  },
  methods: {
    ...mapActions({
      dragEvent: "dragTask",
    }),
    deleteColumn(): void {
      this.$store.dispatch("deleteColumn", { colId: this.list.id }).then(() => {
        this.message = `The selected column named '${this.list.name}' has been deleted successfully!`;
        this.showToast();
      });
    },
    deleteTask(taskId: string): void {
      this.$store.dispatch("deleteTask", { taskId: taskId }).then(() => {
        this.message = "The selected task has been deleted successfully!";
        this.showToast();
      });
    },
    openPopup(): void {
      this.$bvModal.show(this.editColumnPopupId);
    },
    showToast(): void {
      this.$store.dispatch("successToaster", {
        title: this.list.name,
        message: this.message,
      });
    },
    editColumn(e: KanbanColumn): void {
      if (e.title !== "") {
        this.$store.dispatch("editColumn", e);
      }
    },
    onMove({ relatedContext, draggedContext }): void {
      this.taskId = draggedContext?.element?.id;
      this.toColumnId = relatedContext?.component?.$attrs?.colId;
    },
    onEnd(id: string): void {
      this.fromColumnId = id;
      if (this.taskId && this.fromColumnId && this.fromColumnId !== this.toColumnId) {
        this.dragEvent({
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
    /*
    saveTaskListName(e){
      this.list.name = e.target.value
      // console.log('this.list.name', this.list.name);
      this.isEditing = !this.isEditing
    },*/
    toggleTemplate(): void {
      this.showTemplate = !this.showTemplate;
    },
    hideTemplate(): void {
      this.showTemplate = false;
    },
    itemEditing(): void {
      this.isEditing = true;
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
