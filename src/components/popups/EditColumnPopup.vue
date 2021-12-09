<template>
  <Popup
    :id="id"
    :title="title"
    @save="save"
  >
    <template v-slot:default>
      <InputField v-model="data.title" title="Title" autofocus />
      <InputField v-model="data.description" title="Description" />
    </template>
  </Popup>
</template>

<script lang="ts">
import Popup from "@/components/popups/Popup.vue";
import KanbanColumn from "@/classes/KanbanColumn";
import InputField from "@/components/form/InputField.vue";

// TODO: merge with newColPopup
export default {
  name: "EditColumnPopup",
  components: {
    Popup,
    InputField,
  },
  props: {
    id: { type: String, required: true },
    title: { type: String, required: true },
    data: { type: KanbanColumn },
  },
  data() {
    return {
      listName: "",
      listDescription: "",
    };
  },
  methods: {
    save(): void {
      this.$emit("save", this.data);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
