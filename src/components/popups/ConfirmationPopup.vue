<template>
  <Popup
    :id="id"
    :title="title"
    @save="confirm"
    :okTitle="$t('general.button.yes')"
  >
    <template v-slot:default>
      {{ text }}
    </template>
  </Popup>
</template>

<script lang="ts">
import Popup from "@/components/popups/Popup.vue";

export default {
  name: "ConfirmationPopup",
  components: {
    Popup,
  },
  props: {
    id: { type: String, required: true },
    text: { type: String, required: true },
    title: { type: String, required: true },
  },
  methods: {
    confirm(): void {
      this.$emit("confirm");
    },
  },
};
</script>
