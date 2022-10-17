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
        :disabled="isTemplatesEmpty"
      />
    </b-card-title>
    <HelperAlert
      v-if="showAlert"
      :text="$t('preferences.board-template.alert')"
      :show="isTemplatesEmpty"
    />
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
import GeneralButton from "@/components/form/GeneralButton.vue";
import HelperAlert from "@/components/utility/HelperAlert.vue";

export default {
  name: "BoardTemplateCard",
  components: {
    BoardTemplate,
    GeneralButton,
    HelperAlert,
  },
  data() {
    return {
      edit: false,
    };
  },
  computed: {
    ...mapGetters({ showAlert: "getShowHelperAlertPreference" }),
    templates() {
      return TemplateModel.all();
    },
    isTemplatesEmpty() {
      return this.templates.length === 0;
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

