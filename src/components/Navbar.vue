<template>
  <b-navbar
    :class="toggleDarkMode ? 'bg-dark-mode' : 'bg-gradient-primary-custom'"
    toggleable="lg"
    sticky
  >
    <router-link to="/">
      <b-button variant="default" class="btn mr-3">
        <b-icon-columns-gap />
        Dashboard
      </b-button>
    </router-link>
    <!--<input
        type="text"
        class="form-control search-task"
        placeholder="Search for tasks.."
      />-->
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <a class="nav-item my-auto">
          <b-form-checkbox class="nav-link pl-5" switch v-model="toggleDarkMode">Darkmode</b-form-checkbox>
        </a>
        <b-nav-item>
          <router-link to="/notifications">
            <a class="nav-link">
              Notifications
            </a>
          </router-link>
        </b-nav-item>
        <b-nav-item v-if="this.$route.name === 'dashboard'">
          <b-button variant="primary" @click="addNewBoard">New Board</b-button>
        </b-nav-item>
        <b-nav-item v-if="this.$route.name === 'task-board'">
          <b-button variant="primary" @click="addNewList">New List</b-button>
        </b-nav-item>
        <b-nav-item v-if="this.$route.name === 'notifications'">
          <b-button variant="primary" @click="addNewNotification">New Notification</b-button>
        </b-nav-item>

        <!--
        <li class="nav-item">
            <b-button variant="default" class="btn mr-3 nav-link">
              <b-icon-gear/>
              Settings
            </b-button>
          </li>
        -->
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script lang="ts">
import Board from "@/models/Board";

export default {
  name: "Navbar",
  components: {},
  props: ["buttonType", "currentBoard"],
  computed: {
    toggleDarkMode: {
      get() {
        return this.$store.state.darkMode;
      },
      set() {
        this.$store.dispatch("toggleDarkMode");
      },
    },
  },
  methods: {
    addNewBoard(e: any): void {
      Board.insert({
        data: {
          name: "New Board",
          description: "description",
          createdDateString: new Date().toLocaleDateString(),
        },
      });
    },
    addNewList(): void {
      this.$emit("addNewList");
    },
    addNewNotification(): void {
      this.$emit("addNewNotification");
    },
  },
};
</script>
<style lang="scss" scoped>
.add-board-link {
  display: flex;
  align-items: center;
}
.navbar {
  width: 100%;
  min-height: 70px;
  height: auto;
}
.search-task::placeholder {
  color: #e8e8e8;
}
</style>
