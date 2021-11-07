<template>
  <Popup
    :id="id"
    title="Add New List"
    @save="save"
  >
    <template v-slot:default>
      <label :for="'input-title-' + id" class="text-secondary small mb-1">
        Title
      </label>
      <b-form-input
        :id="'input-title-' + id"
        title="Title"
        v-model="column.title"
        autofocus
      />
      <label :for="'input-desc-' + id" class="text-secondary small mb-1">
        Description
      </label>
      <b-form-input
        :id="'input-desc-' + id"
        title="Description"
        v-model="column.description"
      />
      <!--
      <b-form-input v-model="data.title" />
      <b-form-input v-model="data.description" />-->
    </template>
  </Popup>
</template>

<script lang="ts">
import Popup from "@/components/popups/Popup.vue";
import KanbanColumn from "@/classes/KanbanColumn";

export default {
  name: "NewColumnPopup",
  components: {
    Popup,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      column: new KanbanColumn(),
    };
  },

  methods: {
    save(): void {
      this.$emit("save", this.column);
      this.clear();
    },
    clear(): void {
      this.column = new KanbanColumn();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
