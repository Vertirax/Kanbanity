<template>
  <div>
    <b-dropdown
      size="lg"
      variant="link"
      toggle-class="text-decoration-none"
      no-caret
      :disabled="disabled"
    >
      <template #button-content>
        <div class="task-priority" :class="priority">
          {{ priority }} Priority
        </div>
      </template>
      <b-dropdown-item-button
        v-if="priority !== lowPriority"
        button-class="task-priority Low mb-half"
        @click="changePriority(lowPriority)"
      >
        Low Priority
      </b-dropdown-item-button>
      <b-dropdown-item-button
        v-if="priority !== mediumPriority"
        button-class="task-priority Medium mb-half"
        @click="changePriority(mediumPriority)"
      >
        Medium Priority
      </b-dropdown-item-button>
      <b-dropdown-item-button
        v-if="priority !== highPriority"
        button-class="task-priority High"
        @click="changePriority(highPriority)"
      >
        High Priority
      </b-dropdown-item-button>
    </b-dropdown>
  </div>
</template>

<script lang="ts">
import { Priority } from "@/enums/Priorities";

export default {
  name: "PriorityDropdown",
  data() {
    return {
      lowPriority: Priority.LOW,
      mediumPriority: Priority.MEDIUM,
      highPriority: Priority.HIGH,
    };
  },
  props: {
    priority: { type: String, required: true },
    disabled: { type: Boolean, default: false },
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
