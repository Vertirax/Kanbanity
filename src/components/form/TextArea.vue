<template>
  <div class="">
    <label v-if="title" :for="id" class="text-secondary small">
      {{ title }}
    </label>
    <b-textarea
      :class="editMode ? '' : 'overflow-hidden'"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :state="state"
      :plaintext="plainText"
      :no-resize="resize"
      :rows="rows"
      :max-rows="maxRows"
      v-model="data"
      @update="emitInput"
    />
  </div>
</template>

<script lang="ts">
import { nanoid } from "nanoid";

export default {
  name: "TextArea",
  props: {
    title: { type: String },
    placeholder: { type: String },
    type: { type: String, default: "text" },
    state: { type: Boolean, default: null },
    plainText: { type: Boolean, default: false },
    editMode: { type: Boolean, default: false },
    resize: { type: Boolean, default: true },
    data: { type: String, required: false },
    rows: { type: String, default: "2" },
    maxRows: { type: String, default: "6" },
  },
  computed: {
    id(): string {
      return "textarea-" + nanoid(10);
    },
    inputValue: {
      get(): string {
        return this.data;
      },
      set(): void {
        this.value = this.data;
      },
    },
  },
  data() {
    return {
      value: "",
    };
  },
  methods: {
    emitInput(): void {
      this.$emit("update", this.data);
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
