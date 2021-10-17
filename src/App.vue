<template>
  <interpolator
    :dark="this.$store.state.darkMode"
    :brightness="brightness"
    :contrast="contrast"
    :sepia="sepia"
  >
    <div id="app">
      <router-view />
    </div>
  </interpolator>
</template>

<script lang="ts">
import interpolator from "vue-apply-darkmode/src/vue-apply-darkmode.vue";

export default {
  name: "App",
  components: {
    interpolator,
  },
  created() {
    this.$store.commit("initData");
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
