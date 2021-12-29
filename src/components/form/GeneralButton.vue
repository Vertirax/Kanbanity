<template>
  <div>
    <Title
      v-if="title"
      :forId="id"
      :class="[!oneLineTitle ? 'col-12 p-0' : '']"
      :text="title"
    />
    <b-button
      :id="id"
      type="button"
      :variant="variant"
      :title="hoverTitle"
      :disabled="disabled"
      :pressed="pressed"
      :size="size"
      @click="emitClick"
    >
      <b-icon v-if="icon" :icon="icon" />
      {{ text }}
    </b-button>
  </div>
</template>

<script lang="ts">
import { nanoid } from "nanoid";
import Title from "@/components/form/Title.vue";

export default {
  name: "GeneralButton",
  components: { Title },
  props: {
    title: { type: String },
    text: { type: String },
    icon: { type: String },
    size: { type: String },
    hoverTitle: { type: String },
    variant: { type: String, default: "default" },
    disabled: { type: Boolean, default: false },
    pressed: { type: Boolean, default: false },
    oneLineTitle: { type: Boolean, default: false },
  },
  computed: {
    id(): string {
      return "button-" + nanoid(10);
    },
  },
  methods: {
    emitClick(): void {
      this.$emit("click");
    },
  },
};
</script>
