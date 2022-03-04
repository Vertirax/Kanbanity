<template>
  <Popup
    :id="id"
    :title="edit ? $t('dashboard.popup.titles.edit') : $t('dashboard.popup.titles.new')"
    @save="save"
    @cancel="clear"
  >
    <template #default>
      <InputField
        v-model="board.name"
        :title="$t('dashboard.popup.fields.name')"
        autofocus
        required
        :state="sent ? !$v.board.name.$error : null"
      >
        <template #error>
          <b-form-invalid-feedback v-if="!$v.board.name.required">
            {{ $t("general.validation.field.required") }}
          </b-form-invalid-feedback>
        </template>
      </InputField>
      <InputField
        class="mt-2"
        v-model="board.description"
        :title="$t('dashboard.popup.fields.description')"
      />
      <b-dropdown
        v-if="!edit"
        :disabled="!templates.length"
        variant="default"
        class="mt-2"
        :text="
          selectedTemplate.name !== ''
            ? selectedTemplate.name
            : !templates.length
            ? $t('dashboard.popup.template.no-template')
            : $t('dashboard.popup.template.select')
        "
      >
        <b-dropdown-item
          v-for="template in templates"
          :key="template.id"
          @click="selectTemplate(template)"
        >
          {{ template.name }}
        </b-dropdown-item>
      </b-dropdown>
    </template>
  </Popup>
</template>

<script lang="ts">
import Popup from "@/components/popups/Popup.vue";
import Board from "@/classes/Board";
import BoardTemplate from "@/models/BoardTemplate";
import Template from "@/classes/BoardTemplate";
import InputField from "@/components/form/InputField.vue";
import { required } from "vuelidate/lib/validators";

export default {
  name: "DashboardPopup",
  components: {
    Popup,
    InputField,
  },
  props: {
    id: { type: String, required: true },
    edit: { type: Boolean, default: false },
    dashboard: { type: Object, default: () => new Board() },
  },
  data() {
    return {
      board: { ...this.dashboard },
      selectedTemplate: new Template(),
      sent: false,
    };
  },
  methods: {
    save(event): void {
      this.sent = true;
      this.$v.$touch();

      if (!this.$v.$error) {
        this.$emit(this.edit ? "change" : "save", this.board, this.selectedTemplate);
        this.clear();
      } else {
        event.preventDefault();
      }
    },
    clear(): void {
      this.sent = false;
      this.$v.$reset();
      this.edit
        ? (this.board = { ...this.dashboard })
        : (this.board = new Board());
      this.selectedTemplate = new BoardTemplate();
    },
    selectTemplate(template: BoardTemplate): void {
      this.selectedTemplate = template;
    },
  },
  computed: {
    templates(): BoardTemplate[] {
      return BoardTemplate.all().filter((template) => template["name"] !== "");
    },
  },
  watch: {
    dashboard: {
      deep: true,
      handler(): void {
        this.board = { ...this.dashboard };
      },
    },
  },
  validations: {
    board: {
      name: { required },
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .dropdown-toggle {
  padding-left: 0;
}
</style>
