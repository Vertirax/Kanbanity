<template>
  <Popup
    :id="id"
    :title="
      edit
        ? $t('task-board.popup.titles.edit')
        : $t('task-board.popup.titles.new')
    "
    @save="save"
    @cancel="clear"
  >
    <template #default>
      <InputField
        v-model="column.name"
        :title="$t('task-board.popup.fields.name')"
        autofocus
        required
        :state="sent ? !$v.column.name.$error : null"
        @enter="save"
      >
        <template #error>
          <b-form-invalid-feedback v-if="!$v.column.name.required">
            {{ $t("general.validation.field.required") }}
          </b-form-invalid-feedback>
        </template>
      </InputField>
      <InputField
        class="mt-2"
        v-model="column.description"
        :title="$t('task-board.popup.fields.description')"
        @enter="save"
      />
    </template>
  </Popup>
</template>

<script lang="ts">
import Popup from "@/components/popups/Popup.vue";
import Column from "@/models/KanbanColumn";
import InputField from "@/components/form/InputField.vue";
import { required } from "vuelidate/lib/validators";

export default {
  name: "ColumnPopup",
  components: {
    Popup,
    InputField,
  },
  props: {
    id: { type: String, required: true },
    edit: { type: Boolean, default: false },
    list: { type: Object, default: () => new Column() },
  },
  data() {
    return {
      column: { ...this.list },
      sent: false,
    };
  },
  methods: {
    save(event): void {
      this.sent = true;
      this.$v.$touch();

      if (!this.$v.$error) {
        this.$emit("save", this.column);
        this.clear();
        this.$bvModal.hide(this.id);
      } else {
        event?.preventDefault();
      }
    },
    clear(): void {
      this.sent = false;
      this.$v.$reset();
      this.edit
        ? (this.column = { ...this.list })
        : (this.column = new Column());
    },
  },
  watch: {
    list: {
      deep: true,
      handler(): void {
        this.column = { ...this.list };
      },
    },
  },
  validations: {
    column: {
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
