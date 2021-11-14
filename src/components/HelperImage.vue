<template>
  <div class="helper-arrow">
    <svg xmlns="http://www.w3.org/2000/svg" class="float-right" :width=width :height=height fill="currentColor" preserveAspectRatio="xMinYMin meet" viewBox="0 0 57 47">
      <path style="fill-rule:evenodd;" d="M 1.328125 37.238281 C 30.101562 53.292969 46.316406 45.53125 49.976562 13.957031 L 56.96875 14.089844 L 46.859375 1.679688 C 41.394531 10.402344 38.664062 14.765625 38.664062 14.765625 C 42.753906 14.542969 44.9375 14.351562 45.21875 14.195312 C 41.261719 38.308594 26.628906 45.988281 1.328125 37.238281 "/>
    </svg>
    <p class="h1 font-italic absolute-text user-select-none">{{ text }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: "HelperImage",
  props: {
    text: { type: String, required: true },
    width: { type: String, default: "25%" },
    height: { type: String, default: "25%" },
  },
};
</script>

<style lang="scss" scoped>
.absolute-text {
  position: absolute;
  bottom: 47.5%;
  right: 27.5%;
}
</style>
