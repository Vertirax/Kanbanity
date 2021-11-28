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
        Message
      </label>
      <b-form-input
        :id="'input-description-' + id"
        title="Description"
        v-model="board.description"
        required
      />
    </template>
  </Popup>
</template>

<script lang="ts">
import Popup from "@/components/popups/Popup.vue";
import Board from "@/classes/Board";

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
    };
  },

  methods: {
    save(): void {
      this.$emit(this.edit ? "change" : "save", this.board).then(() =>
        this.$nextTick(() => this.clear())
      );
    },
    clear(): void {
      this.edit
        ? (this.board = { ...this.dashboard })
        : (this.board = new Board());
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
