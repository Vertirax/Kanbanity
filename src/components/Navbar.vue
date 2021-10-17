<template>
  <div>
    <nav
      class="navbar navbar-expand-lg"
      :class="toggleDarkMode ? 'bg-dark-mode navbar-dark' : 'bg-gradient-primary-custom'"
    >
      <div class="container-fluid">
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
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar-primary"
          aria-controls="navbar-primary"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar-primary">
          <ul class="navbar-nav ml-lg-auto">
            <li class="nav-item">
              <b-form-checkbox class="nav-link px-3" switch v-model="toggleDarkMode">Darkmode</b-form-checkbox>
            </li>
            <!--<li class="nav-item">
              <b-button variant="default" class="btn mr-3 nav-link">
                <b-icon-gear/>
                Settings
              </b-button>
            </li>-->
            <li class="nav-item add-board-link">
              <b-button
                v-if="this.$route.name === 'dashboard'"
                variant="primary"
                @click="addNewBoard"
              >
                New Board
              </b-button>
              <b-button
                v-if="this.$route.name === 'task-board'"
                variant="primary"
                @click="addNewList"
              >
                New List
              </b-button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script lang="ts">
import Board from "@/models/Board";

export default {
  name: "Navbar",
  components: {},
  props: ["buttonType", "currentBoard"],
  data() {
    return {
      // navBtnType: this.buttonType,
    };
  },
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
    addNewList() {
      this.$emit("addNewList");
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
  position: fixed;
  width: 100%;
  height: 70px;
  z-index: 100;
}
.search-task::placeholder {
  color: #e8e8e8;
}
</style>
