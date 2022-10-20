<template>
  <label
    :for="forId"
    class="text-secondary small"
    :class="[{ 'font-italic': italic }, noPadding ? 'mb-0' : 'mb-1']"
  >
    {{ text }}
  </label>
</template>

<script lang="ts">
export default {
  name: "Title",
  props: {
    text: { type: String, required: true },
    forId: { type: String },
    italic: { type: Boolean, default: false },
    noPadding: { type: Boolean, default: false },
  },
};
</script>
