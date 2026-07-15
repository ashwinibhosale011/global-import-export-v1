<script setup lang="ts">
// Decorative world map with animated export routes out of India.
// Pure inline SVG + CSS so it costs no network requests and inherits
// the hero's navy/amber palette.

// MDI glyph paths (mdi-airplane / mdi-ferry), drawn on a 24x24 grid.
const PLANE_D =
  'M20.56,3.91C21.15,4.5 21.15,5.45 20.56,6.03L16.67,9.92L18.79,19.11L17.38,20.53L13.5,13.1L9.6,17L9.96,19.47L8.89,20.53L7.13,17.35L3.94,15.58L5,14.5L7.5,14.87L11.37,11L3.94,7.09L5.36,5.68L14.55,7.8L18.44,3.91C19,3.33 20,3.33 20.56,3.91Z'
const SHIP_D =
  'M6,6H18V9.96L12,8L6,9.96M3.94,19H4C5.6,19 7,18.12 8,17C9,18.12 10.4,19 12,19C13.6,19 15,18.12 16,17C17,18.12 18.4,19 20,19H20.05L21.95,12.31C22.03,12.06 22,11.78 21.89,11.54C21.76,11.3 21.55,11.12 21.29,11.04L20,10.62V6C20,4.89 19.1,4 18,4H15V1H9V4H6A2,2 0 0,0 4,6V10.62L2.71,11.04C2.45,11.12 2.24,11.3 2.11,11.54C2,11.78 1.97,12.06 2.05,12.31L3.94,19Z'

// Route destinations (Europe, East Asia by air; Gulf, Australia by sea).
const destinations = [
  { x: 470, y: 90 },
  { x: 795, y: 95 },
  { x: 548, y: 200 },
  { x: 748, y: 300 },
]
</script>

<template>
  <div class="route-map" aria-hidden="true">
    <svg viewBox="0 0 900 450" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id="gie-map-dots" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.35" fill="#ffffff" />
        </pattern>
      </defs>

      <!-- Simplified continents, rendered as a dot grid -->
      <g class="route-map__land" fill="url(#gie-map-dots)">
        <!-- North America -->
        <path
          d="M45,75 L130,52 L200,62 L238,90 L246,122 L222,150 L236,176 L212,206 L226,226 L204,230 L176,196 L128,170 L80,150 L54,112 Z"
        />
        <!-- Greenland -->
        <path d="M278,42 L330,34 L342,64 L302,80 L274,62 Z" />
        <!-- South America -->
        <path
          d="M236,240 L272,234 L300,264 L296,310 L272,358 L256,396 L244,360 L228,300 L220,264 Z"
        />
        <!-- Europe -->
        <path d="M428,72 L462,52 L500,58 L522,76 L512,100 L480,116 L444,120 L424,96 Z" />
        <!-- Africa -->
        <path
          d="M434,150 L490,138 L530,164 L546,200 L530,250 L506,300 L480,322 L464,290 L444,240 L424,186 Z"
        />
        <!-- Asia (with the Indian peninsula dipping south) -->
        <path
          d="M520,60 L620,42 L724,52 L792,78 L812,110 L772,140 L730,150 L702,176 L676,202 L658,192 L646,216 L634,178 L590,160 L544,130 L514,100 Z"
        />
        <!-- Australia -->
        <path d="M744,290 L800,284 L822,314 L796,346 L750,340 L734,314 Z" />
      </g>

      <!-- Trade routes out of India -->
      <g class="route-map__routes" fill="none" stroke-linecap="round">
        <path class="route-map__route" d="M645,170 Q550,40 470,90" />
        <path class="route-map__route" d="M645,170 Q720,80 795,95" />
        <path class="route-map__route route-map__route--sea" d="M648,198 Q600,255 548,200" />
        <path class="route-map__route route-map__route--sea" d="M650,200 Q700,275 748,300" />
      </g>

      <!-- Destination ports/airports -->
      <g class="route-map__stops">
        <circle
          v-for="d in destinations"
          :key="`${d.x}-${d.y}`"
          :cx.attr="d.x"
          :cy.attr="d.y"
          r="3.2"
        />
      </g>

      <!-- Origin: India -->
      <g class="route-map__origin">
        <circle class="route-map__pulse" cx="645" cy="178" r="7" />
        <circle class="route-map__core" cx="645" cy="178" r="4" />
      </g>

      <!-- Moving craft -->
      <g class="route-map__plane">
        <path :d="PLANE_D" transform="translate(-9,-9) scale(0.75)" />
      </g>
      <g class="route-map__ship">
        <path :d="SHIP_D" transform="translate(-8,-10) scale(0.7)" />
      </g>
    </svg>
  </div>
</template>

<style scoped lang="scss">
.route-map {
  pointer-events: none;

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
}

.route-map__land {
  opacity: 0.32;
}

.route-map__route {
  stroke: var(--gie-accent-soft);
  stroke-width: 1.7;
  stroke-dasharray: 3 7;
  opacity: 0.85;
  animation: route-march 1.4s linear infinite;
}

.route-map__route--sea {
  stroke: rgba(255, 255, 255, 0.75);
  animation-duration: 1.8s;
}

@keyframes route-march {
  to {
    stroke-dashoffset: -10;
  }
}

.route-map__stops circle {
  fill: var(--gie-accent-soft);
  stroke: rgba(255, 255, 255, 0.8);
  stroke-width: 1;
}

.route-map__core {
  fill: var(--gie-accent);
  stroke: #ffffff;
  stroke-width: 1.4;
}

.route-map__pulse {
  fill: none;
  stroke: var(--gie-accent-soft);
  stroke-width: 1.6;
  transform-origin: 645px 178px;
  animation: origin-pulse 2.6s ease-out infinite;
}

@keyframes origin-pulse {
  0% {
    transform: scale(0.6);
    opacity: 0.9;
  }
  100% {
    transform: scale(2.4);
    opacity: 0;
  }
}

.route-map__plane path,
.route-map__ship path {
  fill: #ffe4ad;
}

.route-map__plane {
  offset-path: path('M645,170 Q550,40 470,90');
  offset-rotate: auto 45deg;
  animation: craft-travel 9s linear infinite;
}

.route-map__ship {
  offset-path: path('M650,200 Q700,275 748,300');
  offset-rotate: 0deg;
  animation: craft-travel 13s linear infinite;
}

@keyframes craft-travel {
  0% {
    offset-distance: 0%;
    opacity: 0;
  }
  6% {
    opacity: 1;
  }
  94% {
    opacity: 1;
  }
  100% {
    offset-distance: 100%;
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .route-map__route,
  .route-map__pulse {
    animation: none;
  }

  .route-map__pulse {
    opacity: 0.4;
  }

  .route-map__plane,
  .route-map__ship {
    animation: none;
    offset-distance: 55%;
  }
}
</style>
