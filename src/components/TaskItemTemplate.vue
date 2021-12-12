<template>
  <div>
    <li class="task-item" v-on-clickaway="discardItem">
      <div class="task-item-header row align-items-center px-1">
        <div class="col-6">Task name:</div>
        <PriorityDropdown
          class="ml-auto mr-3"
          :priority="task.priority"
          @change="setPriority"
        />
      </div>
      <div class="task-item-body">
        <!-- <p class="task-title">{{text}}</p> -->
        <InputField
          v-model="task.name"
          ref="taskTitle"
          autofocus
          @enterHit="saveItem"
        />
      </div>
      <div class="task-item-footer">
        <b-button type="button" variant="default" class="btn-sm" @click="saveItem"><b-icon-check2 /></b-button>
        <!-- <div class="comments-attachments">
          <div class="comments">
            <i class="far fa-comment-alt"></i> 1
          </div>
          <div class="attachment">
            <i class="fa fa-paperclip"></i> 2
          </div>
        </div>-->
        <!-- <div class="assigned-users">
          <div class="user-avatar" v-for="(user, id) in item.assignedUsers" :key="id">
            <img :src="user.imgURL" alt />
          </div>
          <div class="add-icon">+</div>
        </div>-->
      </div>
    </li>
  </div>
</template>
<script lang="ts">
import { mapActions } from "vuex";
import { directive as onClickaway } from "vue-clickaway2";
import InputField from "@/components/form/InputField.vue";
import PriorityDropdown from "@/components/form/PriorityDropdown.vue";
import Task from "@/models/Task";
import { Priority } from "@/enums/Priorities";

export default {
  name: "TaskItemTemplate",
  props: ["list"],
  directives: {
    onClickaway: onClickaway,
  },
  components: {
    InputField,
    PriorityDropdown,
  },
  data() {
    return {
      task: new Task(),
    };
  },
  methods: {
    ...mapActions({
      saveTaskItem: "saveTaskItem",
    }),
    saveItem(): void {
      if (this.task.name != "") {
        this.saveTaskItem({
          column_id: this.list.id,
          board_id: this.$store.state.currentBoard.id,
          name: this.task.name,
          priority: this.task.priority,
        });
      }
      this.$emit("toggleTemplate");
    },
    discardItem(): void {
      this.$emit("discardItem");
    },
    setPriority(priority: Priority): void {
      this.task.priority = priority;
    },
  },
};
</script>
<style lang="scss" scoped></style>
