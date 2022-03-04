<template>
  <interpolator
    :dark="this.$store.state.darkMode"
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

export default {
  name: "App",
  components: {
    interpolator,
  },
  created() {
    this.$store.commit("initData");
    // this.checkNotifications();
    if (Notification.permission === "granted") {
      // setTimeOut til next full minute???
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
  methods: {
    checkNotifications(): void {
      const date = new Date();
      let notifications = NotificationModel.query()
        .where(
          (notification) =>
            notification.active === true &&
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
