<script setup lang="ts">
import { useSiteStore } from '~/stores/site'

const site = useSiteStore()
</script>

<template>
  <section class="stats-band" aria-label="Company figures and service area">
    <v-container>
      <div class="stats-band__grid">
        <div
          v-for="(stat, i) in site.stats"
          :key="stat.label"
          v-reveal="i * 90"
          class="stats-band__item"
        >
          <span class="stats-band__value">{{ stat.value }}</span>
          <span class="stats-band__label">{{ stat.label }}</span>
        </div>
      </div>

      <p class="stats-band__area" v-reveal="360">
        <v-icon icon="mdi-map-marker-radius-outline" size="18" />
        Exporting from <strong>Pune, India</strong> — Gulf office in
        <strong>Ras Al Khaimah, UAE</strong> — serving buyers worldwide
      </p>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.stats-band {
  background: linear-gradient(120deg, var(--gie-primary-deep), var(--gie-primary));
  padding: clamp(2.2rem, 4vw, 3rem) 0;
}

.stats-band__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 959px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stats-band__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  text-align: center;
}

.stats-band__value {
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(1.9rem, 3.4vw, 2.6rem);
  font-weight: 800;
  color: #ffffff;
}

.stats-band__label {
  font-size: 0.88rem;
  font-weight: 500;
  color: rgba(232, 239, 248, 0.85);
}

.stats-band__area {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 1.9rem 0 0;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  text-align: center;
  font-size: 0.92rem;
  color: rgba(232, 239, 248, 0.85);

  strong {
    color: #ffffff;
    font-weight: 700;
  }

  .v-icon {
    color: var(--gie-accent-soft);
  }
}
</style>
