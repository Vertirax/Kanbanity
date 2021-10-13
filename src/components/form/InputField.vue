<template>
  <div class="">
    <label v-if="title" :for="`input-${id}`" class="text-secondary small">
      {{ title }}
    </label>
    <b-form-input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :state="state"
      :disabled="disabled"
      v-model="value"
      @input="emitInput"
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
    //value: { type: String, default: "keki" },
    state: { type: Boolean, default: null },
    disabled: { type: Boolean, default: false },
  },
  data() {
    return {
      value: "",
    };
  },
  computed: {
    id(): string {
      return "input-" + nanoid(10);
    },
  },
  methods: {
    emitInput(): void {
      this.$emit("input", this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
label {
  margin-bottom: 0.25rem;
}
input:disabled {
  background-color: inherit;
  color: inherit;
  border: none;
  padding-left: 1px;
}
</style>
