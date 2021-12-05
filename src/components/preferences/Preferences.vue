<template>
  <div class="h-100">
    <Navbar />
    <div class="container-fluid main-container">
      <div class="row equal my-3 mx-2">
        <OptionsCard />
        <BoardTemplateCard />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import BoardTemplateCard from "@/components/preferences/BoardTemplateCard.vue";
import OptionsCard from "@/components/preferences/OptionsCard.vue";

export default {
  name: "Preferences",
  components: {
    Navbar,
    BoardTemplateCard,
    OptionsCard,
  },
};
</script>

<style lang="scss" scoped>
</style>
