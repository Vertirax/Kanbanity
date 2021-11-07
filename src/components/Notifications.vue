<template>
  <div class="h-100">
    <Navbar @addNewNotification="$bvModal.show(popupId)" />
    <div class="container-fluid main-container">
      <b-alert
        class="mt-3"
        v-model="showDismissibleAlert"
        variant="danger"
        dismissible
      >
        Notifications will only be shown if you give permission to the site!
      </b-alert>

      <div class="row equal my-3 mx-2">
        <NotificationCard
          v-for="notification in notifications"
          :key="notification.id"
          :notification="notification"
        ></NotificationCard>
      </div>
    </div>

    <NotificationPopup :id="popupId" @save="addNotification" />
  </div>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import NotificationCard from "@/components/NotificationCard.vue";
import NotificationModel from "@/models/Notification";
import NotificationPopup from "@/components/popups/NotificationPopup.vue";

export default {
  name: "Notifications",
  components: {
    Navbar,
    NotificationCard,
    NotificationPopup,
  },
  data() {
    return {
      popupId: "add-notification-popup",
      showDismissibleAlert: false,
    };
  },
  computed: {
    notifications(): NotificationModel[] {
      return NotificationModel.all();
    },
  },
  created() {
    Notification.requestPermission().then((value) =>
      value != "granted"
        ? this.onPermissionRejected()
        : this.onPermissionFulFilled()
    );
  },
  methods: {
    addNotification(payload): void {
      this.$store.dispatch("addNotification", payload);
    },
    onPermissionRejected(): void {
      this.showDismissibleAlert = true;
    },
    onPermissionFulFilled(): void {
      this.showDismissibleAlert = false;
    },
  },
};
</script>
