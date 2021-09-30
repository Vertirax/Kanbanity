<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { mapActions } from "vuex";
import KanbanBoard from "@/models/Board";

export default {
  name: "app",
  methods: {
    ...mapActions({
      fetchData: "fetchData",
    }),
  },
  created() {
    KanbanBoard.insert({
      data: [
        {
          // id: 1,
          name: "Board #1",
          description: "desc #1",
        },
        {
          // id: 2,
          name: "Board #2",
          description: "desc #2",
        },
      ],
    });
  },
  data() {
    return {
      //
    };
  },
};
</script>
<style lang="scss">
</style>
