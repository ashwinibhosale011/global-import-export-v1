<script setup lang="ts">
import { useSiteStore } from '~/stores/site'

const site = useSiteStore()
</script>

<template>
  <section id="about" class="section">
    <v-container>
      <v-row align="center" class="flex-column-reverse flex-md-row">
        <v-col cols="12" md="6">
          <div v-reveal>
            <p class="section-kicker">About {{ site.businessName }}</p>
            <h2 class="section-title text-balance">
              A trade partner built for long-term relationships
            </h2>
            <p class="section-copy">
              {{ site.businessName }} was established to bridge Indian farms and global markets.
              For over 15 years, we have specialised in premium vegetables, fruits, and food
              products — connecting growers and producers with international buyers.
            </p>
            <p class="section-copy mt-4">
              We work on a simple principle: fair trade, honest communication, and produce that
              meets international quality standards before it ever leaves India. Today that
              approach supports more than 500 clients across 50+ countries, from our offices in
              Pune, India and Ras Al Khaimah, UAE.
            </p>
          </div>

          <v-row class="mt-6" dense>
            <v-col cols="12" sm="6">
              <v-card v-reveal="120" class="gie-card mv-card pa-5" flat>
                <v-icon icon="mdi-flag-outline" size="24" class="mv-card__icon" />
                <h3 class="mv-card__title">Our Mission</h3>
                <p class="mv-card__text">
                  To be the leading bridge between global markets and premium Indian produce —
                  ensuring quality, sustainability, and mutual growth.
                </p>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6">
              <v-card v-reveal="220" class="gie-card mv-card pa-5" flat>
                <v-icon icon="mdi-eye-outline" size="24" class="mv-card__icon" />
                <h3 class="mv-card__title">Our Vision</h3>
                <p class="mv-card__text">
                  Quality produce reaching every corner of the globe, through trade relationships
                  built on trust and excellence.
                </p>
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="6">
          <figure v-reveal="100" class="about-media">
            <v-img
              src="/Team/Team.jpg"
              alt="The Global India Import Export team"
              class="about-media__img"
              cover
              aspect-ratio="1.15"
            />
            <figcaption class="about-media__caption">
              <v-icon icon="mdi-account-group-outline" size="18" />
              The team behind every consignment
            </figcaption>
          </figure>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.mv-card {
  background: #fff;
}

.mv-card__icon {
  color: var(--gie-primary);
}

.mv-card__title {
  margin-top: 0.7rem;
  font-size: 1rem;
  font-weight: 700;
  color: var(--gie-ink);
}

.mv-card__text {
  margin-top: 0.45rem;
  font-size: 0.88rem;
  line-height: 1.65;
  color: var(--gie-muted);
}

.about-media {
  position: relative;
  margin: 0;
}

.about-media__img {
  border-radius: var(--gie-radius-lg);
  box-shadow: var(--gie-shadow-card);
}

.about-media__caption {
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1rem;
  border-radius: 999px;
  background: rgba(12, 42, 74, 0.75);
  backdrop-filter: blur(6px);
  color: #eef3f9;
  font-size: 0.84rem;
  font-weight: 600;

  .v-icon {
    color: var(--gie-accent-soft);
  }
}
</style>
