<script setup lang="ts">
import { useSiteStore } from '~/stores/site'

const site = useSiteStore()

// Rotating hero banner — same three images as the original site, crossfaded.
const ROTATE_MS = 6000
const current = ref(0)
let timer: number | undefined

function goTo(index: number) {
  current.value = (index + site.heroSlides.length) % site.heroSlides.length
}

function startRotation() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = window.setInterval(() => goTo(current.value + 1), ROTATE_MS)
}

function selectSlide(index: number) {
  goTo(index)
  // Restart the clock so a manual pick isn't instantly rotated away.
  if (timer !== undefined) {
    window.clearInterval(timer)
    timer = undefined
    startRotation()
  }
}

onMounted(startRotation)
onUnmounted(() => {
  if (timer !== undefined) window.clearInterval(timer)
})

const trustChips: { label: string; icon?: string; flag?: boolean }[] = [
  { flag: true, label: 'Proudly exporting from India' },
  { icon: 'mdi-history', label: '15+ years in trade' },
  { icon: 'mdi-handshake-outline', label: '500+ active buyers' },
  { icon: 'mdi-map-marker-multiple-outline', label: 'Offices in India & UAE' },
]
</script>

<template>
  <section id="home" class="hero">
    <div class="hero__slides" aria-hidden="true">
      <img
        v-for="(slide, i) in site.heroSlides"
        :key="slide.src"
        :src="slide.src"
        :alt="slide.alt"
        class="hero__bg"
        :class="{ 'hero__bg--active': i === current }"
        :fetchpriority="i === 0 ? 'high' : undefined"
      />
    </div>
    <div class="hero__overlay" aria-hidden="true" />

    <HeroRouteMap class="hero__map d-none d-md-block" />

    <v-container class="hero__content">
      <div class="hero__copy" v-reveal>
        <p class="section-kicker hero__kicker">{{ site.tagline }}</p>
        <h1 class="hero__title text-balance">
          Fresh Indian produce, <span class="hero__highlight">export-ready</span> for markets in
          50+ countries.
        </h1>
        <p class="hero__sub">
          {{ site.businessName }} sources vegetables and fruits directly from Indian growing
          regions, grades every lot to your specification, and handles the documentation — so
          your consignment keeps moving.
        </p>

        <div class="hero__actions">
          <v-btn href="#contact" color="accent" size="x-large" class="hero__cta">
            Get a Quote
            <v-icon icon="mdi-arrow-right" end />
          </v-btn>
          <v-btn
            :href="site.phoneHref"
            size="x-large"
            variant="outlined"
            class="hero__cta-secondary"
            prepend-icon="mdi-phone"
          >
            {{ site.phoneDisplay }}
          </v-btn>
        </div>

        <p class="hero__registered">
          <v-icon icon="mdi-shield-check-outline" size="17" />
          Registered exporter — {{ site.credentials.slice(0, 3).join(' · ') }}
        </p>

        <ul class="hero__chips" aria-label="Company highlights">
          <li v-for="chip in trustChips" :key="chip.label" class="hero__chip">
            <IndiaFlag v-if="chip.flag" :width="20" />
            <v-icon v-else :icon="chip.icon" size="18" />
            <span>{{ chip.label }}</span>
          </li>
        </ul>
      </div>
    </v-container>

    <div class="hero__dots" role="group" aria-label="Hero image selector">
      <button
        v-for="(slide, i) in site.heroSlides"
        :key="slide.src"
        type="button"
        class="hero__dot"
        :class="{ 'hero__dot--active': i === current }"
        :aria-label="`Show banner image ${i + 1}`"
        :aria-pressed="i === current"
        @click="selectSlide(i)"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  min-height: min(92vh, 860px);
  display: flex;
  align-items: center;
  overflow: hidden;
  scroll-margin-top: 84px;
  background: var(--gie-primary-deep);
}

.hero__slides,
.hero__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.hero__bg {
  object-fit: cover;
  opacity: 0;
  transform: scale(1.02);
  transition: opacity 1.1s ease;
}

.hero__bg--active {
  opacity: 1;
  animation: hero-drift 7s ease-out forwards;
}

@keyframes hero-drift {
  from {
    transform: scale(1.02);
  }
  to {
    transform: scale(1.09);
  }
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(100deg, rgba(7, 22, 38, 0.94) 0%, rgba(7, 22, 38, 0.74) 45%, rgba(7, 22, 38, 0.32) 100%);
}

.hero__map {
  position: absolute;
  top: 50%;
  right: -3%;
  width: 56%;
  transform: translateY(-50%);
  z-index: 0;
  // Fade the map out toward the headline so text stays readable.
  mask-image: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.85) 32%, #000 60%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.85) 32%, #000 60%);
}

.hero__content {
  position: relative;
  z-index: 1;
  padding-top: clamp(6rem, 12vh, 8rem);
  padding-bottom: clamp(4.5rem, 9vh, 6rem);
}

.hero__copy {
  max-width: 680px;
}

.hero__kicker {
  color: var(--gie-accent-soft);
}

.hero__title {
  margin-top: 1rem;
  font-size: clamp(2.2rem, 5vw, 3.9rem);
  font-weight: 800;
  line-height: 1.08;
  color: #ffffff;
}

.hero__highlight {
  color: var(--gie-accent-soft);
}

.hero__sub {
  margin-top: 1.35rem;
  max-width: 560px;
  font-size: clamp(1.02rem, 1.4vw, 1.15rem);
  line-height: 1.75;
  color: rgba(240, 245, 251, 0.9);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 2.1rem;
}

.hero__cta {
  color: var(--gie-primary-deep) !important;
}

.hero__cta-secondary {
  color: #ffffff !important;
  border-color: rgba(255, 255, 255, 0.55) !important;
}

.hero__registered {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1.1rem 0 0;
  font-size: 0.88rem;
  font-weight: 600;
  color: rgba(240, 245, 251, 0.85);

  .v-icon {
    color: var(--gie-accent-soft);
  }
}

.hero__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 1rem;
  margin: 1.9rem 0 0;
  padding: 0;
  list-style: none;
}

.hero__chip {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(7, 22, 38, 0.45);
  backdrop-filter: blur(6px);
  color: #eef3f9;
  font-size: 0.86rem;
  font-weight: 600;

  .v-icon {
    color: var(--gie-accent-soft);
  }
}

.hero__dots {
  position: absolute;
  bottom: 1.4rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  display: flex;
  gap: 0.55rem;
}

.hero__dot {
  width: 10px;
  height: 10px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
  transition: background 0.25s ease, width 0.25s ease;

  &:focus-visible {
    outline: 2px solid var(--gie-accent);
    outline-offset: 3px;
  }
}

.hero__dot--active {
  width: 26px;
  background: var(--gie-accent);
  border-color: var(--gie-accent);
}

@media (prefers-reduced-motion: reduce) {
  .hero__bg {
    transition: none;
    transform: none;
  }

  .hero__bg--active {
    animation: none;
  }

  .hero__dot {
    transition: none;
  }
}
</style>
