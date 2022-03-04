<template>
  <label :for="forId" class="text-secondary small mb-1" :class="italic ? 'font-italic': ''">
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
  },
};
</script>
