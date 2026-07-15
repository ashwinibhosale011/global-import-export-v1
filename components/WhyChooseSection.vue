<script setup lang="ts">
import { useSiteStore } from '~/stores/site'

const site = useSiteStore()
</script>

<template>
  <section id="why-us" class="section">
    <v-container>
      <header v-reveal>
        <p class="section-kicker">Why buyers work with us</p>
        <h2 class="section-title text-balance">
          One accountable partner from farm gate to destination port
        </h2>
        <p class="section-copy">
          Importing fresh produce shouldn't mean chasing multiple vendors. We keep sourcing,
          quality, paperwork, and dispatch under one roof — so you always know where your
          consignment stands.
        </p>
      </header>

      <v-row class="mt-6" dense>
        <v-col v-for="(pillar, i) in site.pillars" :key="pillar.title" cols="12" sm="6" md="3">
          <v-card v-reveal="(i % 4) * 80" class="gie-card pillar-card pa-5" flat>
            <span class="pillar-card__icon">
              <v-icon :icon="pillar.icon" size="26" />
            </span>
            <h3 class="pillar-card__title">{{ pillar.title }}</h3>
            <p class="pillar-card__desc">{{ pillar.description }}</p>
          </v-card>
        </v-col>
      </v-row>

      <div class="credentials mt-10" v-reveal aria-label="Business registrations">
        <span class="credentials__label">
          <v-icon icon="mdi-shield-check-outline" size="18" />
          Registered &amp; documented business
        </span>
        <ul class="credentials__list">
          <li v-for="credential in site.credentials" :key="credential" class="credentials__item">
            {{ credential }}
          </li>
        </ul>
      </div>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.pillar-card {
  background: #fff;
}

.pillar-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: rgba(18, 58, 99, 0.08);
  color: var(--gie-primary);
}

.pillar-card__title {
  margin-top: 1.1rem;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--gie-ink);
}

.pillar-card__desc {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.65;
  color: var(--gie-muted);
}

.credentials {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.75rem;
  padding: 1.1rem 1.5rem;
  border-radius: var(--gie-radius-lg);
  border: 1px dashed rgba(18, 58, 99, 0.35);
  background: rgba(245, 158, 11, 0.06);
}

.credentials__label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gie-primary);
}

.credentials__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.credentials__item {
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  background: #fff;
  border: 1px solid var(--gie-line);
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--gie-ink);
}
</style>
