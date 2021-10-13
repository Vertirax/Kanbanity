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
                @click="changePriority"
              >{{ item.priority }} Priority</div>
            </template>

            <b-dropdown-item-button button-class="task-priority Low my-1">Low Priority</b-dropdown-item-button>
            <b-dropdown-item-button button-class="task-priority High">High Priority</b-dropdown-item-button>
          </b-dropdown>
        </div>
        <div class="task-item-body">
          <!--<InputField class="task-title" :data="this.item.name" :disabled="!editMode"></InputField>-->
          <TextArea
            class="task-title"
            :data="this.item.name"
            :plainText="!editMode"
            :editMode="editMode"
            rows="1"
            max-rows="5"
            @update="saveTaskNameTemp"
          ></TextArea>
          <!--<p class="task-title" @click="openTaskDetailPopoup(item)">{{ this.item.name }}</p>
          <-- <textarea type="text" class="form-control task-title" :value="task.title" rows="2"></textarea> -->
        </div>
      </div>
      <!--<div class="task-item-footer">
      </div>-->
      <div v-if="showIcons" class="col-1 pl-3">
        <b-button type="button" variant="default" class="btn-sm my-1" @click="copyTaskName"><b-icon-clipboard/></b-button>
        <b-button type="button" variant="default" class="btn-sm my-1" @click="toggleEdit">
          <b-icon-pencil-fill v-if="editMode" @click="saveTaskName"/>
          <b-icon-pencil v-else />
        </b-button>
        <b-button type="button" variant="default" class="btn-sm my-1" @click="deleteTask"><b-icon-trash/></b-button>
      </div>
    </li>
  </div>
</template>

<script lang="ts">
import TaskDetailPopup from "@/components/popups/TaskDetailPopup.vue";
import TextArea from "@/components/form/TextArea.vue";

export default {
  name: "TaskItem",
  props: ["item", "list", "board"],
  components: {
    TextArea,
    // eslint-disable-next-line vue/no-unused-components
    TaskDetailPopup,
  },
  data() {
    return {
      showTaskPriorityDropdown: false,
      showTaskPriority: true,
      showIcons: false,
      editMode: false,
      updatedTaskNameTemp: "",
    };
  },
  watch: {},
  methods: {
    asd(): void {
      /*Notification.requestPermission().then(
        new Notification("Title", {
          icon: "https://cdn.onlinewebfonts.com/svg/img_2382.png",
          body: "Noti body",
        })
      );*/
    },
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
        name: this.updatedTaskNameTemp,
      });
    },
    saveTaskNameTemp(name): void {
      this.updatedTaskNameTemp = name;
    },
    deleteTask(): void {
      this.$emit("deleteTask", this.item.id);
    },
    changePriority() {
      /*this.showTaskPriorityDropdown = !this.showTaskPriorityDropdown;
      this.showTaskPriority = !this.showTaskPriority;
      this.$nextTick(() => {
        const input = this.$refs.vueDropdown.$el.querySelector("input");
        input.focus();
      });*/
    },
    setNewPriority(e) {
      // this.showTaskPriorityDropdown = !this.showTaskPriorityDropdown;
      // this.showTaskPriority = !this.showTaskPriority;
    },
    openTaskDetailPopoup(item: any) {
      // console.log("clicked");
      //Bus.$emit("open-task-detail-popup", item);
    },
  },
};
</script>
<style scoped lang="scss">
::v-deep .btn {
  padding: 0;

  .disabled {
    opacity: 1;
  }
}
::v-deep .disabled {
  opacity: 1;
}
::v-deep .dropdown-menu {
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
