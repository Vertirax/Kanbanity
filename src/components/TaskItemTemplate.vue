<template>
  <div>
    <li class="task-item" v-on-clickaway="discardItem">
      <div class="task-item-header">
        <!-- <div class="task-priority" :class="priority">{{priority}} Priority</div> -->
      </div>
      <div class="task-item-body">
        <!-- <p class="task-title">{{text}}</p> -->
        <label>Task name:</label>
        <InputField
          v-model="taskName"
          ref="taskTitle"
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
import { directive as onClickaway } from "vue-clickaway2";
import InputField from "@/components/form/InputField.vue";

export default {
  name: "TaskItemTemplate",
  props: ["list"],
  directives: {
    onClickaway: onClickaway,
  },
  components: {
    InputField,
  },
  data() {
    return {
      priority: "Low",
      taskName: "",
    };
  },
  methods: {
    ...mapActions({
      saveTaskItem: "saveTaskItem",
    }),
    saveItem(): void {
      if (this.taskName != "") {
        this.saveTaskItem({
          column_id: this.list.id,
          board_id: this.$store.state.currentBoard.id,
          name: this.taskName,
        });
      }
      this.$emit("toggleTemplate");
    },
    discardItem(): void {
      this.$emit("discardItem");
    },
  },
};
</script>
<style lang="scss" scoped></style>
