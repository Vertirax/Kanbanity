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
        <div class="dropdown" v-if="!isEditing">
          <a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fa fa-ellipsis-v options" aria-hidden="true"></i>
          </a>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="" @click.prevent="isEditing = !isEditing">Rename</a>
            <a class="dropdown-item" href="" @click.prevent="deleteWholeTaskList">Delete</a>
          </div>
        </div>
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
        <a class="add-task-btn" @click="createNewTask(0)">
          Add task
          <span>+</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import draggable from "vuedraggable";
import TaskItem from "@/components/TaskItem.vue";
import KanbanItem from "@/classes/KanbanItem";
import { Priority } from "@/enums/Priorities";
import TaskItemTemplate from "@/components/TaskItemTemplate.vue";

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
      items: [
        new KanbanItem(
          "534",
          "[KB-001][B420]Creating Kanban app",
          "desc",
          Priority.HIGH_PRIORITY
        ),
        new KanbanItem(
          "726",
          "[KB-002][B4]Making Kanban app work",
          "desc2",
          Priority.MEDIUM_PRIORITY
        ),
      ],
      // taskListName: this.list.name,
    };
  },
  created() {
    // Bus.$on("remove-template", this.removeTemplate);
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
    /*items: {
      get() {
        return this.list.items;
      },
      set(reorderedListItems) {
        const payload = {
          boardId: this.board.id,
          listId: this.list.id,
          items: reorderedListItems
        };
        this.reorderTaskListItems(payload);
      }
    },
    shouldAllowTaskItemsReorder() {
      return this.isDesktop || this.isTablet;
    },*/
  },
  /*methods: {
    ...mapActions({
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
    },
    createNewTask() {
      // console.log('list ', )
      this.showTemplate = true;

      // this.saveTaskListItem({
      //   boardId: this.$route.params.id,
      //   listId:this.list.id,
      //   item:{id:5},
      //   name:"hello"}
      // )
    },
    itemEditing() {
      this.isEditing = true;
    },
    itemEdited() {
      this.isEditing = false;
    },
    itemCancelled() {
      this.isEditing = false;
    }
  }*/
};
</script>
<style lang="scss">
.sortable-chosen.ghost .task-item {
  background: repeating-linear-gradient(
    145deg,
    transparent,
    transparent 5px,
    #e8eaf1 5px,
    #e8eaf1 10px
  );
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
