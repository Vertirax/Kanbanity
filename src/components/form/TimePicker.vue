<template>
  <div>
    <label v-if="title" :for="id" class="text-secondary small mb-1">
      {{ title }}<span v-if="required" class="form-required">*</span>
    </label>
    <b-form-timepicker
      :id="id"
      :size="smallSized ? 'sm' : 'md'"
      :now-button="nowButton"
      reset-button
      locale="hu"
      v-model="time"
      :required="required"
      :state="state"
      :disabled="disabled"
      :autofocus="autofocus"
      :label-no-time-selected="nowButton ? $t('general.label-no-time-selected') : ''"
      :minutes-step="minuteStep ? minuteStep : 1"
      :reset-value="resetValue ? '00:00:00' : ''"
      @input="emitInput"
    ></b-form-timepicker>
  </div>
</template>

<script lang="ts">
import { nanoid } from "nanoid";

export default {
  name: "TimePicker",
  props: {
    title: { type: String },
    value: { type: String },
    minuteStep: { type: Number },
    state: { type: Boolean, default: null },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    autofocus: { type: Boolean, default: false },
    nowButton: { type: Boolean, default: true },
    smallSized: { type: Boolean, default: false },
    resetValue: { type: Boolean, default: false },
  },
  data() {
    return {
      time: this.value,
    };
  },
  computed: {
    id(): string {
      return "time-picker-" + nanoid(10);
    },
  },
  methods: {
    emitInput(): void {
      this.$emit("input", this.time);
    },
  },
};
</script>
