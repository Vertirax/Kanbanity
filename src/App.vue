<template>
  <interpolator
    :dark="darkMode"
    :brightness="brightness"
    :contrast="contrast"
    :sepia="sepia"
  >
    <div id="app">
      <router-view />
    </div>
  </interpolator>
</template>

<script lang="ts">
import interpolator from "vue-apply-darkmode/src/vue-apply-darkmode.vue";
import NotificationModel from "@/models/Notification";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    interpolator,
  },
  created() {
    this.$store.commit("initData");
    this.checkNotifications();
    this.scheduleNotificationChecks();
    if (Notification.permission === "granted") {
      window.setInterval(() => {
        this.checkNotifications();
      }, 60000);
    }
  },
  data() {
    return {
      contrast: 75,
      sepia: 10,
      brightness: 100,
    };
  },
  computed: {
    ...mapGetters({ darkMode: "getDarkMode" }),
  },
  methods: {
    scheduleNotificationChecks() {
      const now = new Date();
      const timeToNextTick =
        (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
      setTimeout(() => {
        this.checkNotifications();
        this.scheduleNotificationChecks();
      }, timeToNextTick);
    },
    checkNotifications(): void {
      const date = new Date();
      const notifications = NotificationModel.query()
        .where(
          (notification) =>
            notification.active &&
            notification.hour === date.getHours() &&
            notification.minute === date.getMinutes()
        )
        .get();
      notifications.forEach((notification) => {
        new Notification(notification["title"], {
          icon: notification["iconUrl"],
          body: notification["message"],
        });
      });
    },
  },
};
</script>
<style lang="scss">
.vue-apply-darkmode-root {
  height: 100%;
}
</style>
