<template>
  <div>
    <b-modal
      :id="id"
      :title="title"
      :ok-title="okTitle"
      @ok="save"
      @hide="hide"
      @cancel="cancel"
    >
      <slot name="default"></slot>
      <template #modal-footer>
        <slot name="footer"></slot>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { i18n } from "@/i18n";

export default {
  name: "Popup",
  props: {
    id: { type: String, required: true },
    title: { type: String, required: true },
    okTitle: { type: String, default: i18n.t("general.button.save") },
  },
  methods: {
    save(bvModalEvt): void {
      this.$emit("save", bvModalEvt);
    },
    hide(): void {
      this.$emit("hide");
    },
    cancel(): void {
      this.$emit("cancel");
    },
  },
};
</script>
