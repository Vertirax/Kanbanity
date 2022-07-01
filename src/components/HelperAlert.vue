<template>
  <div class="w-100">
    <b-alert
      class="mt-5 p-4 w-50 text-center mx-auto"
      variant="primary"
      :show="show"
    >
      {{ text }}
    </b-alert>
  </div>
</template>
<script lang="ts">
export default {
  name: "Title",
  props: {
    text: { type: String, required: true },
    show: { type: Boolean, required: true },
  },
};
</script>
