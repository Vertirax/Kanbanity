<template>
  <div>
    <li class="task-item" @focusout="discardItem">
      <div class="task-item-header">
        <!-- <div class="task-priority" :class="priority">{{priority}} Priority</div> -->
      </div>
      <div class="task-item-body">
        <!-- <p class="task-title">{{text}}</p> -->
        <label>Task name:</label>
        <b-form-input
          id="input"
          type="text"
          class="form-control"
          ref="taskTitle"
          v-model="taskName"
          autofocus
          @keyup.enter="saveItem"
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
import { nanoid } from "nanoid";
import Task from "@/models/Task";
import { Priority } from "@/enums/Priorities";

export default {
  name: "TaskItemTemplate",
  props: ["list"],
  components: {},
  data() {
    return {
      priority: "Low",
      taskName: "",
    };
  },
  mounted() {
    // this.$refs.taskTitle.focus();
    // console.log("list ", this.list);
  },
  methods: {
    ...mapActions({
      saveTaskListItem: "saveTaskListItem",
    }),
    saveItem() {
      if (this.taskName != "") {
        Task.insert({
          data: {
            column_id: this.list.id,
            board_id: this.$store.state.currentBoardId,
            name: this.taskName,
            priority: Priority.MEDIUM_PRIORITY,
          },
        });
      }
      this.$emit("toggleTemplate");
    },
    discardItem() {
      this.$emit("discardItem");
    },
  },
};
</script>
<style lang="scss" scoped></style>
