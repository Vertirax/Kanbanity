<template>
  <div>
    <li class="task-item row mx-1 align-items-center" v-b-hover="toggleShowIcons" :class="editMode ? 'highlighted' : ''">
      <div class="col-10">
        <div class="task-item-header">
          <b-dropdown
            size="lg"
            variant="link"
            toggle-class="text-decoration-none"
            no-caret
            :disabled="!editMode"
          >
            <template #button-content>
              <div
                class="task-priority"
                :class="item.priority"
              >
                {{ item.priority }} Priority
              </div>
            </template>
            <b-dropdown-item-button
              v-if="item.priority !== lowPriority"
              button-class="task-priority Low mb-half"
              @click="changePriority(lowPriority)"
            >
              Low Priority
            </b-dropdown-item-button>
            <b-dropdown-item-button
              v-if="item.priority !== mediumPriority"
              button-class="task-priority Medium mb-half"
              @click="changePriority(mediumPriority)"
            >
              Medium Priority
            </b-dropdown-item-button>
            <b-dropdown-item-button
              v-if="item.priority !== highPriority"
              button-class="task-priority High"
              @click="changePriority(highPriority)"
            >
              High Priority
            </b-dropdown-item-button>
          </b-dropdown>
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
      <!--<div class="task-item-footer">
      </div>-->
      <div v-if="showIcons || editMode" class="col-1 pl-3">
        <b-button type="button" variant="default" class="btn-sm my-1" @click="copyTaskName"><b-icon-clipboard/></b-button>
        <b-button type="button" variant="default" class="btn-sm my-1" @click="toggleEdit">
          <b-icon-pencil-fill v-if="editMode" @click="saveTaskName" />
          <b-icon-pencil v-else />
        </b-button>
        <b-button type="button" variant="default" class="btn-sm my-1" @click="deleteTask"><b-icon-trash/></b-button>
      </div>
    </li>
  </div>
</template>

<script lang="ts">
import { Priority } from "@/enums/Priorities";
import Task from "@/models/Task";

export default {
  name: "TaskItem",
  props: {
    item: { type: Task, required: true },
  },
  components: {},
  data() {
    return {
      showTaskPriorityDropdown: false,
      showTaskPriority: true,
      showIcons: false,
      editMode: false,
      lowPriority: Priority.LOW_PRIORITY,
      mediumPriority: Priority.MEDIUM_PRIORITY,
      highPriority: Priority.HIGH_PRIORITY,
    };
  },
  watch: {},
  methods: {
    toggleShowIcons(): void {
      this.showIcons = !this.showIcons;
    },
    toggleEdit(): void {
      this.editMode = !this.editMode;
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
    changePriority(priority: string): void {
      this.$store.dispatch("changePriority", {
        id: this.item.id,
        priority: priority,
      });
    },
  },
};
</script>
<style scoped lang="scss">
/deep/ .btn {
  padding: 0;

  .disabled {
    opacity: 1;
  }
}
/deep/ .disabled {
  opacity: 1;
}
/deep/ .dropdown-menu {
  padding: 0;
  border: none;
  text-align: center;
  min-width: 9rem;
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
.custom-v-select {
  font-size: 14px;
}
.dropdown-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.4rem 0.8rem;
}
</style>
