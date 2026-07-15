<script setup lang="ts">
// Inline SVG Indian flag — a flag emoji renders as plain "IN" text on
// Windows browsers, so the tricolor is drawn explicitly.
withDefaults(defineProps<{ width?: number }>(), { width: 21 })

// Chakra spokes as one path: binding x2/y2 on <line> elements makes Vue
// patch read-only SVG DOM props during hydration and log warnings.
const spokes = Array.from({ length: 24 }, (_, i) => {
  const a = (i * 15 * Math.PI) / 180
  return `M15 10 L${(15 + 2.6 * Math.cos(a)).toFixed(3)} ${(10 + 2.6 * Math.sin(a)).toFixed(3)}`
}).join(' ')
</script>

<template>
  <svg
    :width.attr="width"
    :height.attr="Math.round(width * (2 / 3))"
    viewBox="0 0 30 20"
    class="india-flag"
    role="img"
    aria-label="Flag of India"
  >
    <rect width="30" height="20" fill="#ffffff" />
    <rect width="30" height="6.667" fill="#ff9933" />
    <rect y="13.333" width="30" height="6.667" fill="#138808" />
    <g fill="none" stroke="#054187" stroke-width="0.5">
      <circle cx="15" cy="10" r="2.6" />
      <path :d.attr="spokes" stroke-width="0.35" />
    </g>
  </svg>
</template>

<style scoped lang="scss">
.india-flag {
  display: inline-block;
  vertical-align: middle;
  border-radius: 3px;
  box-shadow: 0 0 0 1px rgba(19, 32, 46, 0.12);
  flex-shrink: 0;
}
</style>
