<template>
  <Popup
    :id="id"
    :title="title"
    @save="save"
  >
    <template v-slot:default>
      <label :for="'input-title-' + id" class="text-secondary small mb-1">
        Title
      </label>
      <b-form-input
        :id="'input-title-' + id"
        title="Title"
        v-model="data.title"
        autofocus
      />
      <label :for="'input-desc-' + id" class="text-secondary small mb-1">
        Description
      </label>
      <b-form-input
        :id="'input-desc-' + id"
        title="Description"
        v-model="data.description"
      />
      <!--<InputField
        title="Description"
        v-model="data.description"
      />-->
    </template>
  </Popup>
</template>

<script lang="ts">
import Popup from "@/components/popups/Popup.vue";
import KanbanColumn from "@/classes/KanbanColumn";

export default {
  name: "EditColumnPopup",
  components: {
    Popup,
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
      this.$emit("save", new KanbanColumn(this.data.id, this.data.title, this.data.description));
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
