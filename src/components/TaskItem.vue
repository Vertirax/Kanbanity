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
      <GeneralButton
        class="mb-half"
        size="sm"
        icon="clipboard"
        @click="copyTaskName"
      />
      <GeneralButton
        class="mb-half"
        size="sm"
        :icon="editMode ? 'pencil-fill' : 'pencil'"
        @click="toggleEdit"
      />
      <GeneralButton
        class="mb-half"
        size="sm"
        icon="layout-sidebar-reverse"
        :hoverTitle="$t('task-board.task.highlight.title')"
        @click="openHighlightPopup"
      />
      <GeneralButton size="sm" icon="trash" @click="deleteTask" />
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
import GeneralButton from "@/components/form/GeneralButton.vue";
import { i18n } from "@/i18n";

export default {
  name: "TaskItem",
  components: {
    TaskHighlightPopup,
    PriorityDropdown,
    GeneralButton,
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
      if (this.editMode) {
        this.saveTaskName();
      }
      this.editMode = !this.editMode;
    },
    clickAway(): void {
      this.editMode = false;
      this.showIcons = false;
    },
    copyTaskName(): void {
      this.$copyText(this.item.name).then(() =>
        this.$store.dispatch("successToaster", {
          title: i18n.t("task-board.task.title"),
          message: i18n.t("task-board.task.toaster.copy.message"),
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
