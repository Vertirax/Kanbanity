<template>
  <Popup
    :id="id"
    :title="edit ? 'Edit Notification' : 'Add New Notification'"
    @save="save"
    @cancel="clear"
  >
    <template v-slot:default>
      <InputField
        v-model="notification.title"
        title="Title"
        autofocus
        required
        :state="sent ? !$v.notification.title.$error : null"
      >
        <template #error>
          <b-form-invalid-feedback v-if="!$v.notification.title.required">
            Value is required
          </b-form-invalid-feedback>
        </template>
      </InputField>
      <InputField
        v-model="notification.message"
        title="Message"
        required
        :state="sent ? !$v.notification.message.$error : null"
      >
        <template #error>
          <b-form-invalid-feedback v-if="!$v.notification.message.required">
            Value is required
          </b-form-invalid-feedback>
        </template>
      </InputField>
      <TimePicker v-model="time" title="Time" required />
      <InputField v-model="notification.iconUrl" title="Icon URL" />
      <Title v-if="edit" :forId="'checkbox-active-' + id" text="Active" />
      <b-form-checkbox v-if="edit" :id="'checkbox-active-' + id" size="lg" v-model="notification.active"></b-form-checkbox>
    </template>

    <template v-slot:footer v-if="edit">
      <GeneralButton
        class="mr-auto"
        variant="danger"
        icon="trash-fill"
        text="Delete"
        @click="$emit('delete', notification.id)"
      />
      <GeneralButton variant="secondary" text="Cancel" @click="hide" />
      <GeneralButton variant="primary" text="Save" @click="save" />
    </template>
  </Popup>
</template>

<script lang="ts">
import Popup from "@/components/popups/Popup.vue";
import NotificationModel from "@/models/Notification";
import InputField from "@/components/form/InputField.vue";
import TimePicker from "@/components/form/TimePicker.vue";
import { required } from "vuelidate/lib/validators";
import GeneralButton from "@/components/form/GeneralButton.vue";
import Title from "@/components/form/Title.vue";

export default {
  name: "NotificationPopup",
  components: {
    Popup,
    InputField,
    TimePicker,
    GeneralButton,
    Title,
  },
  props: {
    id: { type: String, required: true },
    edit: { type: Boolean, default: false },
    noti: { type: Object, default: () => new NotificationModel() },
  },
  data() {
    return {
      notification: { ...this.noti },
      sent: false,
    };
  },
  computed: {
    time: {
      get(): string {
        return this.notification.hour + ":" + this.notification.minute;
      },
      set(value: string): void {
        this.notification.hour = value ? value.split(":")[0] : 0;
        this.notification.minute = value ? value.split(":")[1] : 0;
      },
    },
  },
  methods: {
    save(event): void {
      this.sent = true;
      this.$v.$touch();

      if (!this.$v.$error) {
        this.notification.hour = this.time.split(":")[0];
        this.notification.minute = this.time.split(":")[1];
        this.hide();
        this.$emit(this.edit ? "change" : "save", this.notification);
      } else {
        event.preventDefault();
      }
    },
    clear(): void {
      this.sent = false;
      this.$v.$reset();

      if (this.edit) {
        this.notification = { ...this.noti };
      } else {
        this.notification = new NotificationModel();
        this.time = "";
      }
    },
    hide(): void {
      this.$bvModal.hide(this.id);
      this.$nextTick(() => this.clear());
    },
  },
  validations: {
    notification: {
      title: { required },
      message: { required },
    },
  },
};
</script>
