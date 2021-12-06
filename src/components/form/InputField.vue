<template>
  <div>
    <label v-if="title" :for="id" class="text-secondary small mb-1">
      {{ title }}
    </label>
    <b-form-input
      :class="disabled ? 'pl-2' : ''"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :state="state"
      :disabled="disabled"
      v-model="inputValue"
      :required="required"
      @input="emitInput"
      @keyup.enter="emitEnter"
    />
  </div>
</template>

<script lang="ts">
import { nanoid } from "nanoid";

export default {
  name: "InputField",
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    title: { type: String },
    placeholder: { type: String },
    type: { type: String, default: "text" },
    value: { type: String },
    state: { type: Boolean, default: null },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
  },
  data() {
    return {
      inputValue: this.value,
    };
  },
  computed: {
    id(): string {
      return "input-" + nanoid(10);
    },
  },
  methods: {
    emitInput(): void {
      this.$emit("input", this.inputValue);
    },
    emitEnter(): void {
      this.$emit("enterHit");
    },
  },
};
</script>

<style lang="scss" scoped>
input:disabled {
  background-color: #f4f3f3;
  color: inherit;
  border: none;
  padding-left: 1px;
}
</style>
