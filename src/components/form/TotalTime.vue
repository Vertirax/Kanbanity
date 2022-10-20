<template>
  <div class="total-time-spent">
    <span v-if="showTitle"
      >{{ $t("task-board.titles.total-time-spent") }}:
    </span>
    <b-icon-clock-history
      v-if="!showTitle"
      :title="$t('task-board.titles.total-time-spent')"
    />
    <span v-if="total.hours > 0">
      {{ total.hours }}{{ $t("task-board.titles.hours") }}</span
    >
    <span v-if="total.minutes > 0">
      {{ total.minutes }}{{ $t("task-board.titles.minutes") }}</span
    >
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    total: { type: Object, required: true },
    showTitle: { type: Boolean, default: false },
  },
});
</script>