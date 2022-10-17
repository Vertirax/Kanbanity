<template>
  <div class="h-100">
    <Navbar>
      <template #addButton>
        <GeneralButton
          variant="primary"
          :text="$t('notifications.buttons.add')"
          @click="$bvModal.show(popupId)"
        />
      </template>
    </Navbar>
    <div class="container-fluid main-container">
      <b-alert
        class="mt-3"
        v-model="showDismissibleAlert"
        variant="danger"
        dismissible
      >
        {{ $t("notifications.permission-alert") }}
      </b-alert>

      <div class="row equal my-3 mx-2">
        <HelperAlert
          v-if="showAlert"
          :text="$t('notifications.alert')"
          :show="notifications.length === 0"
        />
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
import NotificationCard from "@/components/notifications/NotificationCard.vue";
import NotificationPopup from "@/components/popups/NotificationPopup.vue";
import GeneralButton from "@/components/form/GeneralButton.vue";
import { mapGetters } from "vuex";
import HelperAlert from "@/components/utility/HelperAlert.vue";

export default {
  name: "Notifications",
  components: {
    Navbar,
    NotificationCard,
    NotificationPopup,
    GeneralButton,
    HelperAlert,
  },
  data() {
    return {
      popupId: "add-notification-popup",
      showDismissibleAlert: false,
    };
  },
  computed: {
    ...mapGetters({
      notifications: "getAllNotifications",
      showAlert: "getShowHelperAlertPreference",
    }),
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
