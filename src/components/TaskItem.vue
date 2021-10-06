<template>
  <div>
    <li class="task-item row mx-1 align-items-center" v-b-hover="toggleShowIcons"> <!--v-b-hover="toggleShowIcons"-->
      <div class="col-10">
        <div class="task-item-header">
          <div
            class="task-priority"
            :class="item.priority"
            v-if="showTaskPriority"
            @click="changePriority"
          >{{ item.priority }} Priority</div>
          <v-select
            v-model="item.priority"
            ref="vueDropdown"
            :options="['Low', 'Medium', 'High']"
            v-if="showTaskPriorityDropdown"
            @search:blur="setNewPriority"
            :clearable="false"
            :closeOnSelect="true"
            class="custom-v-select"
          ></v-select>
        </div>
        <div class="task-item-body">
          <p class="task-title" @click="openTaskDetailPopoup(item)">{{ this.item.name }}</p>
          <!-- <textarea type="text" class="form-control task-title" :value="task.title" rows="2"></textarea> -->
        </div>
      </div>
      <!--
      <div class="task-item-footer">
        <div class="comments-attachments">
          <div class="comments">
            <i class="far fa-comment-alt"></i> 1
          </div>
          <div class="attachment">
            <i class="fa fa-paperclip"></i> 2
          </div>
        </div>
        <div class="assigned-users">
          <div class="user-avatar" v-for="(user, id) in item.assignedUsers" :key="id">
            <img :src="user.imgURL" alt />
          </div>
          <div class="dropdown">
            <div
              class="add-icon"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >+</div>
            <div class="dropdown-menu assignee-selection" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" @click="assignUser(user)" v-for="(user, id) in item.assignedUsers" :key="id">
                <div class="user-avatar">
                  <img :src="user.imgURL" alt />
                </div>
                <p class="user-name">{{ user.name }}</p>
              </a>
            </div>
          </div>
        </div>
      </div>-->
      <div v-if="showIcons" class="col-1 pl-2">
        <b-button type="button" variant="default" class="btn-sm" @click="copyTaskName"><b-icon-clipboard/></b-button>
        <b-button type="button" variant="default" class="btn-sm" @click="asd"><b-icon-pencil /></b-button>
        <b-button type="button" variant="default" class="btn-sm" @click="deleteTask"><b-icon-trash /></b-button>
      </div>
    </li>
  </div>
</template>

<script lang="ts">
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import TaskDetailPopup from "@/components/popups/TaskDetailPopup.vue";

export default {
  name: "TaskItem",
  props: ["item", "list", "board"],
  components: {
    "v-select": vSelect,
    // eslint-disable-next-line vue/no-unused-components
    TaskDetailPopup,
  },
  data() {
    return {
      showTaskPriorityDropdown: false,
      showTaskPriority: true,
      showIcons: false,
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
    copyTaskName(): void {
      this.$copyText(this.item.name).then(() =>
        this.$store.dispatch("successToaster", {
          title: "Task",
          message: "The selected task's name has been copied successfully!",
        })
      );
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
      console.log("clicked");
      //Bus.$emit("open-task-detail-popup", item);
    },
  },
};
</script>
<style scoped lang="scss" >
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
