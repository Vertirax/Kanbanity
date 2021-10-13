<template>
  <interpolator :dark="this.$store.state.darkMode" :brightness="brightness" :contrast="contrast" :sepia="sepia">
    <div id="app">
      <router-view />
    </div>
  </interpolator>
</template>

<script lang="ts">
import interpolator from "vue-apply-darkmode/src/vue-apply-darkmode.vue";
import { mapActions } from "vuex";
import KanbanBoard from "@/models/Board";
import Board from "@/models/Board";

export default {
  name: "App",
  components: {
    interpolator,
  },
  methods: {
    ...mapActions({
      fetchData: "fetchData",
    }),
  },
  created() {
    if (Board.all().length === 0) {
      KanbanBoard.insert({
        data: [
          {
            // id: 1,
            name: "Board #1",
            description: "desc #1",
            createdDateString: new Date().toLocaleDateString(),
          },
          {
            // id: 2,
            name: "Board #2",
            description: "desc #2",
            createdDateString: new Date().toLocaleDateString(),
          },
        ],
      });
    }
  },
  data() {
    return {
      contrast: 75,
      sepia: 10,
      brightness: 100,
    };
  },
};
</script>
<style lang="scss">
.vue-apply-darkmode-root {
  height: 100%;
}
</style>
