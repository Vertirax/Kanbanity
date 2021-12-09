<template>
  <Popup
    :id="id"
    :title="edit ? 'Edit Board' : 'Add New Board'"
    @save="save"
    @hide="clear"
  >
    <template v-slot:default>
      <InputField v-model="board.name" title="Title" autofocus required />
      <InputField v-model="board.description" title="Description" required />
      <b-dropdown
        v-if="!edit"
        :text="
          selectedTemplate.name !== ''
            ? selectedTemplate.name
            : !templates.length
            ? 'No Template Available'
            : 'Select Template'
        "
        :disabled="!templates.length"
        variant="default"
        class="mt-2"
      >
        <b-dropdown-item
          v-for="template in templates"
          :key="template.id"
          @click="selectTemplate(template)"
        >
          {{ template.name }}
        </b-dropdown-item>
      </b-dropdown>
    </template>
  </Popup>
</template>

<script lang="ts">
import Popup from "@/components/popups/Popup.vue";
import Board from "@/classes/Board";
import BoardTemplate from "@/models/BoardTemplate";
import Template from "@/classes/BoardTemplate";
import InputField from "@/components/form/InputField.vue";

export default {
  name: "DashboardPopup",
  components: {
    Popup,
    InputField,
  },
  props: {
    id: { type: String, required: true },
    edit: { type: Boolean, default: false },
    dashboard: { type: Object, default: () => new Board() },
  },
  data() {
    return {
      board: { ...this.dashboard },
      selectedTemplate: new Template(),
    };
  },
  methods: {
    save(): void {
      this.$emit(this.edit ? "change" : "save", this.board, this.selectedTemplate);
      this.clear();
    },
    clear(): void {
      this.edit
        ? (this.board = { ...this.dashboard })
        : (this.board = new Board());
      this.selectedTemplate = new BoardTemplate();
    },
    selectTemplate(template: BoardTemplate): void {
      this.selectedTemplate = template;
    },
  },
  computed: {
    templates(): BoardTemplate[] {
      // eslint-disable-next-line
      // @ts-ignore
      return BoardTemplate.all().filter((template) => template.name !== "");
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .dropdown-toggle {
  padding-left: 0;
}
</style>
