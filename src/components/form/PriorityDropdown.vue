<template>
  <div>
    <b-dropdown
      size="lg"
      variant="link"
      toggle-class="text-decoration-none d-flex"
      no-caret
      :disabled="disabled"
    >
      <template #button-content>
        <div class="task-priority" :class="currentPriority">
          {{ currentPriority }} {{ $t("general.enums.priority.title") }}
        </div>
      </template>
      <div v-for="(priority, index) in priorities" :key="index">
        <b-dropdown-item-button
          v-if="currentPriority !== priority"
          :button-class="`task-priority ${priority}`"
          @click="changePriority(priority)"
        >
          {{ priority }} {{ $t("general.enums.priority.title") }}
        </b-dropdown-item-button>
      </div>
    </b-dropdown>
  </div>
</template>

<script lang="ts">
import { Priority } from "@/enums/Priorities";

export default {
  name: "PriorityDropdown",
  props: {
    currentPriority: { type: String, required: true },
    disabled: { type: Boolean, default: false },
  },
  computed: {
    priorities(): Priority[] {
      return Object.values(Priority);
    },
  },
  methods: {
    changePriority(priority: Priority): void {
      this.$emit("change", priority);
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .btn {
  padding: 0;

  .disabled {
    opacity: 1;
  }
}
/deep/ .disabled {
  opacity: 1;
}
/deep/ .dropdown-menu {
  padding: 0;
  border: none;
  text-align: center;
  min-width: 9rem;
}
.dropdown-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.4rem 0.8rem;
}
</style>
