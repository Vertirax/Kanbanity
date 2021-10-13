<template>
  <Popup
    :id="id"
    :title="title"
    okTitle="Save"
    @save="save"
  >
    <template v-slot:default>
      <InputField
        class="my-2 py-1"
        title="Title"
        v-model="data.title"
      />
      <InputField
        class="my-2 py-1"
        title="Description"
        v-model="data.description"
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
      console.log(this.colData);
      this.$emit("save", new KanbanColumn(this.id, this.data.title, this.data.description));
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
