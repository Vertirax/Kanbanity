<template>
  <div class="row mw-100 py-3 my-3 mx-1 border align-items-center" v-b-hover="toggleShowIcons">
    <div class="col-10">
      <InputField
        v-model="boardTemplate.name"
        class="w-50"
        :title="$t('preferences.board-template.name')"
        required
        :disabled="!edit"
      />
      <BadgeSequence
        class="mt-1"
        v-if="showBadges"
        v-b-hover="showIconsTrue"
        :template-string="
          boardTemplate.columns !== ''
            ? boardTemplate.columns
            : $t('preferences.board-template.badges.initial')
        "
        @click="toggleBadges"
        :disabled="!edit"
      />
      <InputField
        v-else-if="!showBadges && edit"
        class="mt-2"
        v-model="boardTemplate.columns"
        :placeholder="$t('preferences.board-template.badges.placeholder')"
        v-on-clickaway="toggleBadges"
        @enterHit="toggleBadges"
        :disabled="!edit"
      />
    </div>
    <div v-if="showIcons && edit" class="col-1">
      <GeneralButton :hoverTitle="$t('general.button.save')" icon="check2" @click="saveTemplate" />
      <GeneralButton
        :hoverTitle="$t('general.button.delete')"
        icon="trash-fill"
        @click="deleteTemplate(boardTemplate.id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { directive as onClickaway } from "vue-clickaway2";
import BadgeSequence from "@/components/form/BadgeSequence.vue";
import InputField from "@/components/form/InputField.vue";
import Template from "@/models/BoardTemplate";
import GeneralButton from "@/components/form/GeneralButton.vue";

export default {
  name: "BoardTemplate",
  components: {
    BadgeSequence,
    InputField,
    GeneralButton,
  },
  directives: {
    onClickaway: onClickaway,
  },
  data() {
    return {
      showBadges: true,
      showIcons: false,
      boardTemplate: {...this.template},
    };
  },
  props: {
    edit: { type: Boolean, required: true },
    template: { type: Template, required: true },
  },
  methods: {
    toggleBadges(): void {
      if (this.edit) {
        this.showBadges = !this.showBadges;
      }
      this.showIconsTrue();
    },
    toggleShowIcons(): void {
      if (this.showBadges) {
        this.showIcons = !this.showIcons;
      }
    },
    showIconsTrue(): void {
      this.showIcons = true;
    },
    saveTemplate(): void {
      this.$store.dispatch("saveBoardTemplate", this.boardTemplate);
    },
    deleteTemplate(id: string): void {
      this.$store.dispatch("deleteBoardTemplate", id);
    },
    click(): void {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
.border {
  border-radius: 0.25rem;
}
</style>
