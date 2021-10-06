<template>
  <div>
    <b-modal
      size="size"
      :id="id"
      :title="title"
    >
      <div>{{ text }}</div>
    </b-modal>
  </div>
</template>

<script lang="ts">
export default {
  name: "Popup",
  props: {
    data: {},
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "Default Title",
    },
    text: {
      type: String,
    },
    size: {
      type: String,
      default: "lg",
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
