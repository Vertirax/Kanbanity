<template>
  <Popup
    :id="id"
    title="Add New List"
    @save="save"
  >
    <template v-slot:default>
      <InputField v-model="column.title" title="Title" autofocus />
      <InputField v-model="column.description" title="Description" />
    </template>
  </Popup>
</template>

<script lang="ts">
import Popup from "@/components/popups/Popup.vue";
import KanbanColumn from "@/classes/KanbanColumn";
import InputField from "@/components/form/InputField.vue";

export default {
  name: "NewColumnPopup",
  components: {
    Popup,
    InputField,
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
