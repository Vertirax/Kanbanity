<template>
  <div class="row px-3">
    <b-badge
      class="general-list mr-2 mt-1"
      :data-board-name="template"
      variant="warning"
      v-for="(template, index) in templates"
      :key="index"
      @click="click"
    >
      {{ template }}
    </b-badge>
  </div>
</template>

<script lang="ts">
export default {
  name: "BadgeSequence",
  props: {
    templateString: { type: String, required: true },
  },
  computed: {
    templates(): string[] {
      return this.templateString.split(",").map((template) => template.trim());
    },
  },
  methods: {
    click(): void {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
.badge {
  min-height: 18px;
  min-width: 20px;
}
</style>
