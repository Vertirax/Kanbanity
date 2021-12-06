<template>
  <b-card class="col-md-6 col-xl-6 p-2 m-2">
    <b-card-title class="d-flex">
      <span>Manage Board Templates</span>

      <slot name="title-right" />

      <b-button variant="outline-primary" class="ml-auto" @click="addBoardTemplate">
        <b-icon-plus-square />
        Add Template
      </b-button>
      <b-button variant="outline-primary" class="ml-2" :pressed="edit" @click="toggleEdit">
        <b-icon-pencil-fill />
      </b-button>
    </b-card-title>

    <BoardTemplate
      class="my-2"
      :edit="edit"
      v-for="template in templates"
      :key="template.id"
      :template="template"
    />
  </b-card>
</template>

<script lang="ts">
import BoardTemplate from "@/components/preferences/BoardTemplate.vue";
import { mapActions, mapGetters } from "vuex";
import TemplateModel from "@/models/BoardTemplate";

export default {
  name: "BoardTemplateCard",
  components: {
    BoardTemplate,
  },
  data() {
    return {
      edit: false,
    };
  },
  computed: {
    templates() {
      return TemplateModel.all();
    },
  },
  methods: {
    ...mapActions({
      addTemplate: "addBoardTemplate",
    }),
    ...mapGetters({
      // templates: "getBoardTemplates",
    }),
    toggleEdit(): void {
      this.edit = !this.edit;
    },
    addBoardTemplate(): void {
      this.addTemplate();
      this.edit = true;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
