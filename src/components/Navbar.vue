<template>
  <b-navbar
    :class="toggleDarkMode ? 'bg-dark-mode' : 'bg-gradient-primary-custom'"
    toggleable="lg"
    sticky
  >
    <router-link to="/">
      <GeneralButton icon="columns-gap" :text="$t('general.menu.dashboard')" />
    </router-link>
    <!--<input
        type="text"
        class="form-control search-task"
        placeholder="Search for tasks.."
      />-->
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <router-link to="/preferences">
        <GeneralButton icon="sliders" :text="$t('general.menu.preferences')" />
      </router-link>
      <b-navbar-nav class="ml-auto">
        <a class="nav-item my-auto">
          <b-form-checkbox class="nav-link pl-5" switch v-model="toggleDarkMode">{{ $t("general.button.darkmode") }}</b-form-checkbox>
        </a>
        <b-nav-item>
          <router-link to="/notifications">
            <a class="nav-link">{{ $t("general.menu.notifications") }} </a>
          </router-link>
        </b-nav-item>
        <slot name="addButton" />
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script lang="ts">
import GeneralButton from "@/components/form/GeneralButton.vue";

export default {
  name: "Navbar",
  components: { GeneralButton },
  props: ["currentBoard"],
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
