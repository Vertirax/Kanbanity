<template>
  <Popup
    :id="id"
    title="Change Highlight Color"
    @save="save"
  >
    <template v-slot:default>
      <span class="text-secondary small">Select a color or specify one to highlight the selected task</span>
      <Twitter v-model="color" triangle="hide" class="p-0 my-2" />
      <Slider v-model="color" class="pt-3" />
    </template>
    <template v-slot:footer>
      <b-button variant="warning" @click="resetColor" class="mr-auto">Reset Highlight</b-button>
      <b-button variant="secondary" @click="hide">Cancel</b-button>
      <b-button variant="primary" @click="save">Save</b-button>
    </template>
  </Popup>
</template>

<script lang="ts">
import Popup from "@/components/popups/Popup.vue";
import { Twitter } from "vue-color";
import { Slider } from "vue-color";

export default {
  name: "TaskHighlightPopup",
  components: {
    Popup,
    Slider,
    Twitter,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      color: {
        hex: "#FF6900",
      },
    };
  },

  methods: {
    save(): void {
      this.$emit("save", this.color.hex);
      this.hide();
    },
    hide(): void {
      this.$bvModal.hide(this.id);
    },
    resetColor(): void {
      this.$emit("save", null);
      this.hide();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
