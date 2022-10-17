<template>
  <Popup
    :id="id"
    :title="$t('task-board.task.highlight.popup.title')"
    @save="save"
  >
    <template v-slot:default>
      <Title :text="$t('task-board.task.highlight.popup.text')" />
      <Twitter v-model="color" triangle="hide" class="p-0 my-2" />
      <Slider v-model="color" class="pt-3" />
    </template>
    <template v-slot:footer>
      <GeneralButton
        class="mr-auto"
        variant="warning"
        @click="resetColor"
        :text="$t('task-board.task.highlight.popup.reset')"
      />
      <GeneralButton
        variant="secondary"
        @click="hide"
        :text="$t('general.button.cancel')"
      />
      <GeneralButton
        variant="primary"
        @click="save"
        :text="$t('general.button.save')"
      />
    </template>
  </Popup>
</template>

<script lang="ts">
import Popup from "@/components/popups/Popup.vue";
import { Twitter } from "vue-color";
import { Slider } from "vue-color";
import GeneralButton from "@/components/form/GeneralButton.vue";
import Title from "@/components/form/Title.vue";

export default {
  name: "TaskHighlightPopup",
  components: {
    Popup,
    Slider,
    Twitter,
    GeneralButton,
    Title,
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
