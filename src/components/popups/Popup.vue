<template>
  <div>
    <b-modal
      :id="id"
      :title="title"
      :ok-title="okTitle"
      @ok="save"
    >
      <slot name="default"></slot>
    </b-modal>
  </div>
</template>

<script lang="ts">
export default {
  name: "Popup",
  props: {
    // data: {},
    id: { type: String, required: true },
    title: { type: String, required: true },
    okTitle: { type: String, default: "OK" },
  },
  methods: {
    save(): void {
      this.$emit("save");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
