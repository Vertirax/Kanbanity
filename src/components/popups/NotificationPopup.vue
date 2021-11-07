<template>
  <Popup
    :id="id"
    :title="edit ? 'Edit Notification' : 'Add New Notification'"
    @save="save"
  >
    <template v-slot:default>
      <label :for="'input-title-' + id" class="text-secondary small mb-1">
        Title
      </label>
      <b-form-input
        :id="'input-title-' + id"
        title="Title"
        v-model="notification.title"
        autofocus
        required
      />
      <label :for="'input-mess-' + id" class="text-secondary small mb-1">
        Message
      </label>
      <b-form-input
        :id="'input-mess-' + id"
        title="Message"
        v-model="notification.message"
        required
      />
      <label :for="'input-iconUrl-' + id" class="text-secondary small mb-1">
        Icon URL
      </label>
      <b-form-input
        :id="'input-iconUrl-' + id"
        title="Icon URL"
        v-model="notification.iconUrl"
      />
      <label :for="'input-time-' + id" class="text-secondary small mb-1">
        Time
      </label>
      <b-form-timepicker
        :id="'timepicker-buttons-' + notification.id"
        now-button
        reset-button
        locale="hu"
        v-model="time"
        required
      ></b-form-timepicker>
      <label v-if="edit" :for="'checkbox-active-' + id" class="text-secondary small mb-1">
        Active
      </label>
      <b-form-checkbox v-if="edit" :id="'checkbox-active-' + id" size="lg" v-model="notification.active"></b-form-checkbox>
    </template>

    <template v-slot:footer v-if="edit">
      <b-button variant="danger" @click="$emit('delete', notification.id)" class="mr-auto">
        <b-icon-trash-fill />
        Delete
      </b-button>
      <b-button variant="secondary" @click="hide">Cancel</b-button>
      <b-button variant="primary" @click="save">Save</b-button>
    </template>
  </Popup>
</template>

<script lang="ts">
import Popup from "@/components/popups/Popup.vue";
import NotificationModel from "@/models/Notification";

export default {
  name: "NotificationPopup",
  components: {
    Popup,
  },
  props: {
    id: { type: String, required: true },
    edit: { type: Boolean, default: false },
    noti: { type: Object, default: () => new NotificationModel() },
  },
  data() {
    return {
      notification: { ...this.noti },
    };
  },
  computed: {
    time: {
      get(): string {
        return this.notification.hour + ":" + this.notification.minute;
      },
      set(value: string): void {
        this.notification.hour = value.split(":")[0];
        this.notification.minute = value.split(":")[1];
      },
    },
  },
  methods: {
    save(): void {
      this.notification.hour = this.time.split(":")[0];
      this.notification.minute = this.time.split(":")[1];
      this.$emit(this.edit ? "change" : "save", this.notification);
      this.hide();
      if (!this.edit) {
        this.clear();
      }
    },
    clear(): void {
      this.notification = new NotificationModel();
      this.time = "";
    },
    hide(): void {
      this.$bvModal.hide(this.id);
    },
  },
};
</script>
