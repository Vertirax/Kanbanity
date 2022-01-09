<template>
  <b-card class="col-md-6 col-xl-6 p-2 m-2">
    <b-card-title class="d-flex">
      <span>{{ $t("preferences.board-template.title") }}</span>
      <GeneralButton
        class="ml-auto"
        variant="outline-primary"
        @click="addBoardTemplate"
        :text="$t('preferences.board-template.buttons.add')"
        icon="plus-square"
      />
      <GeneralButton
        class="ml-2"
        variant="outline-primary"
        :pressed="edit"
        @click="toggleEdit"
        icon="pencil-fill"
      />
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
import { mapActions } from "vuex";
import TemplateModel from "@/models/BoardTemplate";
import GeneralButton from "@/components/form/GeneralButton.vue";

export default {
  name: "BoardTemplateCard",
  components: {
    BoardTemplate,
    GeneralButton,
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
