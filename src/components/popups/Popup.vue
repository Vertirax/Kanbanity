<template>
  <div>
    <b-modal
      :id="id"
      :title="title"
      :ok-title="okTitle"
      @ok="save"
      @hide="hide"
    >
      <slot name="default"></slot>
      <template #modal-footer>
        <slot name="footer"></slot>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
export default {
  name: "Popup",
  props: {
    id: { type: String, required: true },
    title: { type: String, required: true },
    okTitle: { type: String, default: "Save" },
  },
  methods: {
    save(): void {
      this.$emit("save");
    },
    hide(): void {
      this.$emit("hide");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
