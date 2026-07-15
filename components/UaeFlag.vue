<script setup lang="ts">
// Inline SVG UAE flag — same reasoning as IndiaFlag.vue: flag emoji
// renders as plain letters on Windows browsers.
withDefaults(defineProps<{ width?: number }>(), { width: 21 })
</script>

<template>
  <svg
    :width.attr="width"
    :height.attr="Math.round(width * (2 / 3))"
    viewBox="0 0 30 20"
    class="uae-flag"
    role="img"
    aria-label="Flag of the United Arab Emirates"
  >
    <rect width="30" height="6.667" fill="#00843d" />
    <rect y="6.667" width="30" height="6.667" fill="#ffffff" />
    <rect y="13.333" width="30" height="6.667" fill="#000000" />
    <rect width="8" height="20" fill="#ce1126" />
  </svg>
</template>

<style scoped lang="scss">
.uae-flag {
  display: inline-block;
  vertical-align: middle;
  border-radius: 3px;
  box-shadow: 0 0 0 1px rgba(19, 32, 46, 0.12);
  flex-shrink: 0;
}
</style>
