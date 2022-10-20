<template>
  <b-dropdown
    size="xl"
    variant="link"
    toggle-class="text-decoration-none"
    no-caret
    :dropleft="dropLeft"
    :offset="offset"
  >
    <template #button-content>
      <b-icon-three-dots-vertical variant="dark" />
    </template>
    <b-dropdown-item @click="$emit('edit')">
      <b-icon-pencil-fill class="mr-3" />
      {{ $t("general.button.edit") }}
    </b-dropdown-item>
    <b-dropdown-item @click="$emit('delete')">
      <b-icon-trash-fill class="mr-3" />
      {{ $t("general.button.delete") }}
    </b-dropdown-item>
  </b-dropdown>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    offset: { type: Number, default: 0 },
    dropLeft: { type: Boolean, default: false },
  },
});
</script>