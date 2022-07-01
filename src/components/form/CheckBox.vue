
<template>
  <div
    :class="
      oneRow
        ? 'd-flex align-items-center flex-row-reverse justify-content-end'
        : ''
    "
  >
    <Title :forId="id" :text="title" :noPadding="noPadding" />
    <b-form-checkbox
      size="lg"
      :id="id"
      :disabled="disabled"
      @change="emitChange"
      :checked="value"
    ></b-form-checkbox>
  </div>
</template>
<script lang="ts">
import Title from "@/components/form/Title.vue";
import { nanoid } from "nanoid";

export default {
  name: "CheckBox",
  components: {
    Title,
  },
  props: {
    title: { type: String },
    noPadding: { type: Boolean, default: false },
    oneRow: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    value: { type: Boolean, required: true },
  },
  computed: {
    id(): string {
      return "checkbox-" + nanoid(10);
    },
  },
  methods: {
    emitChange(value): void {
      this.$emit("change", value);
    },
  },
};
</script>