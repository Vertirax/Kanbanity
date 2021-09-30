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
        <div>
          <b-dropdown id="dropdown" size="xl" variant="link" toggle-class="text-decoration-none" no-caret>
            <template #button-content>
              <b-icon-three-dots-vertical></b-icon-three-dots-vertical>
            </template>
            <b-dropdown-item href="#"><b-icon-pencil-fill></b-icon-pencil-fill>Edit</b-dropdown-item>
            <b-dropdown-item href="#"><b-icon-trash-fill></b-icon-trash-fill>Delete</b-dropdown-item>
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
          <draggable v-model="items" v-bind="dragOptions" class="list-group">
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
              />
            </transition-group>
          </draggable>
          <TaskItemTemplate v-if="showTemplate" :list="list" />
        </ul>
      </div>
      <div class="board-footer">
        <a class="add-task-btn" @click="createNewTask">
          Add task
          <b-icon-plus></b-icon-plus>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import draggable from "vuedraggable";
import TaskItem from "@/components/TaskItem.vue";
import TaskItemTemplate from "@/components/TaskItemTemplate.vue";
import {nanoid} from "nanoid";
import Task from "@/models/Task";

export default {
  components: {
    TaskItem,
    draggable,
    TaskItemTemplate,
  },
  props: ["board", "list"],
  data() {
    return {
      drag: false,
      showTemplate: false,
      isEditing: false,
      // taskListName: this.list.name,
    };
  },
  computed: {
    defaultItem() {
      return {
        id: "",
        text: "",
      };
    },
    dragOptions() {
      return {
        animation: "200",
        ghostClass: "ghost",
        group: "kanban-board-list-items",
        // disabled: this.isEditing || !this.shouldAllowTaskItemsReorder
      };
    },
    items(): Task[] {
      return Task.query().where("column_id", this.list.id).get();
    },
    /*shouldAllowTaskItemsReorder() {
      return this.isDesktop || this.isTablet;
    },*/
  },
  methods: {
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
    deleteWholeTaskList(){
      // console.log(this.list);
      const payload = {
          boardId: this.board.id,
          listId: this.list.id
        };
      this.deleteTaskList(payload)
    },
    removeTemplate(data) {
      // console.log("remove template ", data);
      this.showTemplate = false;
    },*/
    createNewTask() {
      Task.insert({
        data: {
          column_id: this.list.id,
          name: "Task #" + nanoid(),
          description: "desc1",
          // assignee: Board.find(this.$store.state.currentBoardId),
        },
      }).then(() => console.log(this.$store.state.entities.tasks));
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
  min-height: 20px;
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
