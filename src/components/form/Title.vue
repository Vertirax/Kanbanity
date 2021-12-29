<template>
  <label :for="forId" class="text-secondary small mb-1">
    {{ text }}
  </label>
</template>

<script lang="ts">
export default {
  name: "Title",
  props: {
    text: { type: String, required: true },
    forId: { type: String },
  },
};
</script>
