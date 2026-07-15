<script setup lang="ts">
import { useSiteStore } from '~/stores/site'

const site = useSiteStore()
</script>

<template>
  <section id="process" class="section section--ink">
    <v-container>
      <header v-reveal>
        <p class="section-kicker">How it works</p>
        <h2 class="section-title text-balance">From enquiry to delivery in four clear steps</h2>
        <p class="section-copy">
          A simple, repeatable process — designed so first-time buyers and long-term partners both
          know exactly what happens next.
        </p>
      </header>

      <ol class="process mt-10">
        <li
          v-for="(step, i) in site.processSteps"
          :key="step.title"
          v-reveal="i * 110"
          class="process__step"
        >
          <span class="process__number">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="process__title">{{ step.title }}</h3>
          <p class="process__desc">{{ step.description }}</p>
        </li>
      </ol>

      <div class="text-center mt-10" v-reveal>
        <v-btn href="#contact" color="accent" size="large" class="process__cta">
          Start With Step One — Send Your Requirement
          <v-icon icon="mdi-arrow-right" end />
        </v-btn>
      </div>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.process {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (max-width: 959px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 599px) {
    grid-template-columns: 1fr;
  }
}

.process__step {
  position: relative;
  padding: 1.5rem;
  border-radius: var(--gie-radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.045);
}

.process__number {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.9rem;
  font-weight: 800;
  color: var(--gie-accent-soft);
  opacity: 0.9;
}

.process__title {
  margin-top: 0.7rem;
  font-size: 1.04rem;
  font-weight: 700;
  color: #fff;
}

.process__desc {
  margin-top: 0.45rem;
  font-size: 0.9rem;
  line-height: 1.65;
  color: rgba(238, 243, 249, 0.78);
}

.process__cta {
  color: var(--gie-primary-deep) !important;
}
</style>
