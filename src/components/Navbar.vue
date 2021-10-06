<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-gradient-primary-custom">
      <div class="container-fluid">
        <router-link to="/">
          <b-button variant="default" class="btn mr-3">
            <b-icon-columns-gap/>
            Dashboard
          </b-button>
        </router-link>
        <input
          type="text"
          class="form-control search-task"
          placeholder="Search for tasks.."
        />
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
              <b-form-checkbox class="nav-link pr-3" switch v-model="toggleDarkMode">Darkmode</b-form-checkbox>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Discover
                <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" @click="addNewBoard">Profile</a>
            </li>
            <li class="nav-item add-board-link">
              <div class="dropdown">
                <button
                  class="btn btn-icon btn-3 btn-secondary"
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  @click="addNewList"
                >
                  <span class="btn-inner--text">New</span>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a
                    class="dropdown-item"
                    href="#"
                    v-if="buttonType === 'dashboard'"
                    @click="addNewBoard"
                  >New Board</a>
                  <a
                    class="dropdown-item"
                    href="#"
                    v-if="buttonType === 'taskboard'"
                    @click="addNewList"
                  >New List</a>
                  <a class="dropdown-item" href="#" @click="openTeamPopoup">Team</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!--<NewBoardPopup />
    <TeamPopup />-->
  </div>
</template>
<script lang="ts">
import Board from "@/models/Board";
import Task from "@/models/Task";
import Column from "@/models/KanbanColumn";

export default {
  name: "Navbar",
  components: {
    /*NewBoardPopup,
    TeamPopup,*/
  },
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
    addNewBoard(e: any) {
      Task.query().where("board_id", "$uid1").deleteAll();
      Column.query().where("board_id", "$uid1").deleteAll();
      Board.find("$uid1").$delete();
    },
    addNewList() {
      this.$emit("addNewList");
    },
    openTeamPopoup(e: any) {
      // e.preventDefault();
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
