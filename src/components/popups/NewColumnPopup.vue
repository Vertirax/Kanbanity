<template>
  <Popup
    :id="id"
    title="Add New List"
    okTitle="Save"
    @save="save"
  >
    <template v-slot:default>
      <InputField
        class="my-2 py-1"
        title="Title"
        v-model="title"
      />
      <InputField
        class="my-2 py-1"
        title="Description"
        v-model="description"
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
import InputField from "@/components/form/InputField.vue";

export default {
  name: "NewColumnPopup",
  components: {
    InputField,
    Popup,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      //popupId: "edit-popup",
      title: "",
      description: "",
    };
  },

  methods: {
    save(): void {
      this.$emit("save", new KanbanColumn("", this.title, this.description));
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
