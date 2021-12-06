<template>
  <div class="row mw-100 py-3 my-3 mx-1 border align-items-center" v-b-hover="toggleShowIcons">
    <div class="col-10">
      <InputField
        v-model="template.name"
        class="w-50"
        title="Template Name"
        required
        :disabled="!edit"
      />
      <BadgeSequence
        class="mt-1"
        v-if="showBadges"
        v-b-hover="showIconsTrue"
        :template-string="
          template.columns !== ''
            ? template.columns
            : 'Click here, in edit mode'
        "
        @click="toggleBadges"
        :disabled="!edit"
      />
      <InputField
        v-else-if="!showBadges && edit"
        class="mt-2"
        v-model="template.columns"
        placeholder="Add list names separated with comma..."
        v-on-clickaway="toggleBadges"
        @enterHit="toggleBadges"
        :disabled="!edit"
      />
    </div>
    <div v-if="showIcons && edit" class="col-1">
      <b-button
        type="button"
        variant="default"
        @click="saveTemplate"
        title="Save"
        ><b-icon-check2
      /></b-button>
      <b-button
        type="button"
        variant="default"
        @click="deleteTemplate(template.id)"
        title="Delete"
        ><b-icon-trash-fill
      /></b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { directive as onClickaway } from "vue-clickaway2";
import BadgeSequence from "../form/BadgeSequence.vue";
import InputField from "@/components/form/InputField.vue";
import Template from "@/models/BoardTemplate";

export default {
  name: "BoardTemplate",
  components: {
    BadgeSequence,
    InputField,
  },
  directives: {
    onClickaway: onClickaway,
  },
  data() {
    return {
      // template: { ...this.templateProp },
      showBadges: true,
      showIcons: false,
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
      this.$store.dispatch("saveBoardTemplate", this.template);
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
