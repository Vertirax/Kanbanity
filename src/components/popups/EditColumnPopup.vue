<template>
  <Popup
    :id="id"
    :title="title"
    @save="save"
  >
    <template v-slot:default>
      <InputField
        title="Title"
        :v-model="data.title"
      />
      <InputField
        title="Description"
        v-model="data.description"
      />
    </template>
  </Popup>
</template>

<script lang="ts">
import Popup from "@/components/popups/Popup.vue";
import KanbanColumn from "@/classes/KanbanColumn";
import InputField from "@/components/form/InputField.vue";

export default {
  name: "EditColumnPopup",
  components: {
    InputField,
    Popup,
  },
  props: {
    id: { type: String, required: true },
    title: { type: String, required: true },
    data: { type: KanbanColumn },
  },
  data() {
    return {
      //popupId: "edit-popup",
    };
  },

  methods: {
    save(): void {
      console.log(this.id, this.data.title, this.data.description);
      this.$emit("save", new KanbanColumn(this.id, this.data.title, this.data.description));
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
