<template>
  <Popup
    :id="id"
    :title="edit ? 'Edit Board' : 'Add New Board'"
    @save="save"
    @hide="clear"
  >
    <template v-slot:default>
      <label :for="'input-title-' + id" class="text-secondary small mb-1">
        Title
      </label>
      <b-form-input
        :id="'input-title-' + id"
        title="Title"
        v-model="board.name"
        autofocus
        required
      />
      <label :for="'input-description-' + id" class="text-secondary small mb-1">
        Description
      </label>
      <b-form-input
        :id="'input-description-' + id"
        title="Description"
        v-model="board.description"
        required
      />
      <b-dropdown
        v-if="!edit"
        :text="
          selectedTemplate.name !== ''
            ? selectedTemplate.name
            : 'Select Template'
        "
        variant="default"
        class="m-2"
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

export default {
  name: "DashboardPopup",
  components: {
    Popup,
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
</style>
