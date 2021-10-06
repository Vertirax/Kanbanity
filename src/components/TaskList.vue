<template>
  <div>
    <div class="task-board" :data-board-name="list.name">
      <input
        type="text"
        class="form-control"
        :value="this.list.name"
        v-if="isEditing"
        @blur="saveTaskListName"
      />
      <div class="board-header">
        <p class="board-name" v-if="!isEditing">{{ list.name }}</p>
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
        <!--<div class="dropdown" v-if="!isEditing">
          <a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fa fa-ellipsis-v options" aria-hidden="true"></i>
          </a>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="" @click.prevent="isEditing = !isEditing">Rename</a>
            <a class="dropdown-item" href="" @click.prevent="deleteWholeTaskList">Delete</a>
          </div>
        </div>-->
      </div>
      <div class="board-content">
        <ul class="task-list">
          <draggable v-model="items" v-bind="dragOptions" class="list-group" :move="onMove">
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
    <Popup
      :id="'popup_' + this.list.id"
      :title="this.list.name"
      :text="this.list.description"
    />
  </div>
</template>

<script lang="ts">
import draggable from "vuedraggable";
import TaskItem from "@/components/TaskItem.vue";
import TaskItemTemplate from "@/components/TaskItemTemplate.vue";
import Task from "@/models/Task";
import Popup from "@/components/popups/Popup.vue";

export default {
  name: "TaskList",
  components: {
    TaskItem,
    draggable,
    TaskItemTemplate,
    Popup,
  },
  props: ["board", "list"],
  data() {
    return {
      drag: false,
      showTemplate: false,
      isEditing: false,
      message: "",
      taskId: "",
      // taskListName: this.list.name,
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: "200",
        ghostClass: "ghost",
        //disabled: false,
        group: "kanban-board-list-items",
        // disabled: this.isEditing || !this.shouldAllowTaskItemsReorder
      };
    },
    items: {
      get(): Task[] {
        return Task.query().where("column_id", this.list.id).get();
      },
      set(value) {
        this.$store.commit("updateItems", value);
      },
    },
    /*shouldAllowTaskItemsReorder() {
      return this.isDesktop || this.isTablet;
    },*/
  },
  methods: {
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
      this.$bvModal.show("popup_" + this.list.id);
    },
    showToast(): void {
      this.$store.dispatch("successToaster", {
        title: this.list.name,
        message: this.message,
      });
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      console.log("relatedElement", relatedElement);
      console.log("draggedElement", draggedElement);
    },
  /*  ...mapActions({
      reorderTaskListItems: "reorderTaskListItems",
      saveTaskListItem: "saveTaskListItem",
      deleteTaskList:"deleteTaskList"
    }),
    addTodoMethod(newTodoItem){
      this.todo_items = [...this.todo_items, newTodoItem]
    },
    saveTaskListName(e){
      this.list.name = e.target.value
      // console.log('this.list.name', this.list.name);
      this.isEditing = !this.isEditing
    },
    removeTemplate(data) {
      // console.log("remove template ", data);
      this.showTemplate = false;
    },*/
    toggleTemplate() {
      this.showTemplate = !this.showTemplate;
    },
    hideTemplate() {
      this.showTemplate = false;
    },
    itemEditing() {
      this.isEditing = true;
    },
    itemEdited() {
      this.isEditing = false;
    },
    itemCancelled() {
      this.isEditing = false;
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
