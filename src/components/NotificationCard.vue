<template>
  <b-card
    :title="notification.title"
    class="col-md-6 col-xl-6 p-2 m-2"
    :img-src="notification.iconUrl"
    img-alt=""
    img-right
  >
    <b-card-sub-title>
      <b-badge :variant="notification.active ? 'success' : 'warning'">
        {{ notification.active ? "Active" : "Inactive" }}
      </b-badge>
    </b-card-sub-title>
    <b-card-text class="my-2">
      {{ notification.message }}
    </b-card-text>

    <p><b-icon-clock class="mr-1" />{{ time }}</p>

    <GeneralButton
      class="mt-3"
      size="sm"
      variant="outline-primary"
      @click="openEditNotificationPopup"
      text="Edit"
      icon="box-arrow-up"
    />
    <NotificationPopup
      :id="'edit-notification-popup-' + notification.id"
      :noti="notification"
      @change="editNotification"
      @delete="deleteNotification"
      edit
    />
  </b-card>
</template>

<script lang="ts">
import Notification from "@/classes/Notification";
import NotificationPopup from "@/components/popups/NotificationPopup.vue";
import GeneralButton from "@/components/form/GeneralButton.vue";

export default {
  name: "NotificationCard",
  components: {
    NotificationPopup,
    GeneralButton,
  },
  props: {
    notification: { type: Object, required: true },
  },
  computed: {
    time() {
      return (
        this.notification.hour +
        ":" +
        (this.notification.minute < 10
          ? "0" + this.notification.minute
          : this.notification.minute)
      );
    },
  },
  methods: {
    openEditNotificationPopup(): void {
      this.$bvModal.show("edit-notification-popup-" + this.notification.id);
    },
    editNotification(payload: Notification): void {
      this.$store.dispatch("editNotification", payload);
    },
    deleteNotification(id: string): void {
      this.$store.dispatch("deleteNotification", id).then(
        this.$store.dispatch("successToaster", {
          title: "Notification",
          message: "Successfully deleted Notification!",
        })
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  max-width: 48.5%;
}
.card-img-right {
  margin-top: 1.25rem;
  height: 75px;
  width: auto;
}
</style>
