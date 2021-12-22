<template>
  <li
    class="task-item row mx-1 align-items-center"
    v-b-hover="toggleShowIcons"
    v-on-clickaway="clickAway"
    :class="editMode ? 'highlighted' : ''"
    :style="shadows"
  >
    <div class="col-10">
      <div class="task-item-header row ml-0">
        <PriorityDropdown
          :disabled="!editMode"
          :priority="item.priority"
          @change="changePriority"
        />
      </div>
      <div class="task-item-body">
        <b-textarea
          class="task-title"
          :class="editMode ? 'cursor-text' : 'overflow-hidden'"
          :id="'textarea-' + item.id"
          type="text"
          no-resize
          rows="2"
          max-rows="6"
          :plaintext="!editMode"
          v-model="item.name"
        />
        <!--<InputField class="task-title" :data="this.item.name" :disabled="!editMode"></InputField>-->
        <!--<TextArea
          class="task-title"
          :data="this.item.name"
          :plainText="!editMode"
          :editMode="editMode"
          rows="1"
          max-rows="5"
          @update="saveTaskNameTemp"
        ></TextArea>-->
        <!--<p class="task-title" @click="openTaskDetailPopoup(item)">{{ this.item.name }}</p>
        <-- <textarea type="text" class="form-control task-title" :value="task.title" rows="2"></textarea> -->
      </div>
    </div>
    <div v-if="showIcons || editMode" class="col-1 pl-3">
      <b-button type="button" variant="default" class="btn-sm mb-1" @click="copyTaskName">
        <b-icon-clipboard/>
      </b-button>
      <b-button type="button" variant="default" class="btn-sm mb-1" @click="toggleEdit">
        <b-icon-pencil-fill v-if="editMode" @click="saveTaskName" />
        <b-icon-pencil v-else />
      </b-button>
      <b-button type="button" variant="default" title="Highlight Task" class="btn-sm mb-1" @click="openHighlightPopup">
        <b-icon-layout-sidebar-reverse />
      </b-button>
      <b-button type="button" variant="default" class="btn-sm" @click="deleteTask">
        <b-icon-trash />
      </b-button>
    </div>
    <TaskHighlightPopup :id="colorPopupId + item.id" @save="changeHighlightColor"/>
  </li>
</template>

<script lang="ts">
import { Priority } from "@/enums/Priorities";
import Task from "@/models/Task";
import { directive as onClickaway } from "vue-clickaway2";
import PriorityDropdown from "@/components/form/PriorityDropdown.vue";
import TaskHighlightPopup from "@/components/popups/TaskHighlightPopup.vue";

export default {
  name: "TaskItem",
  components: {
    TaskHighlightPopup,
    PriorityDropdown,
  },
  props: {
    item: { type: Task, required: true },
  },
  directives: {
    onClickaway: onClickaway,
  },
  data() {
    return {
      showTaskPriority: true,
      showIcons: false,
      editMode: false,
      colorPopupId: "highlight-color-popup",
    };
  },
  computed: {
    shadows(): string {
      return "box-shadow: ".concat(
        this.editMode && this.item.highlightColor
          ? this.item.highlightColor +
              " 10px 0px 0px 0px, ".concat(
                "#ffc107 10px 0px 0px 0.15rem, #ffc107 0px 0px 0px 0.15rem;"
              )
          : this.editMode
          ? "#ffc107 0px 0px 0px 0.15rem;"
          : this.item.highlightColor
          ? this.item.highlightColor + " 10px 0px 0px 0px;"
          : "none"
      );
    },
  },
  methods: {
    toggleShowIcons(): void {
      this.showIcons = !this.showIcons;
    },
    toggleEdit(): void {
      this.editMode = !this.editMode;
    },
    clickAway(): void {
      this.editMode = false;
      this.showIcons = false;
    },
    copyTaskName(): void {
      this.$copyText(this.item.name).then(() =>
        this.$store.dispatch("successToaster", {
          title: "Task",
          message: "The selected task's name has been copied successfully!",
        })
      );
    },
    saveTaskName(): void {
      this.$store.dispatch("changeTaskName", {
        id: this.item.id,
        name: this.item.name,
      });
    },
    deleteTask(): void {
      this.$emit("deleteTask", this.item.id);
    },
    changePriority(priority: Priority): void {
      this.$store.dispatch("changePriority", {
        id: this.item.id,
        priority: priority,
      });
    },
    openHighlightPopup(): void {
      this.$bvModal.show(this.colorPopupId + this.item.id);
    },
    changeHighlightColor(color: string): void {
      this.$store.dispatch("changeTaskHighlightColor", {
        id: this.item.id,
        highlightColor: color,
      });
    },
  },
};
</script>
<style scoped lang="scss">
/deep/ .btn {
  padding: 0;
}
.col-1,
.col-10 {
  padding-left: 0;
  padding-right: 0;
  min-height: 95px;
}
.add-icon {
  margin-left: 20px;
  cursor: pointer;
}
</style>
