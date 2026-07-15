<script setup lang="ts">
import { useSiteStore } from '~/stores/site'

const site = useSiteStore()
const drawer = ref(false)
</script>

<template>
  <v-app-bar flat scroll-behavior="elevate" color="surface" height="72" class="site-header">
    <v-container class="d-flex align-center py-0">
      <a href="#home" class="brand" aria-label="Global India Import Export — home">
        <span class="brand__mark" aria-hidden="true">
          <v-icon icon="mdi-earth" size="20" />
        </span>
        <span class="brand__text">
          <span class="brand__name">
            Global India
            <IndiaFlag :width="19" />
          </span>
          <span class="brand__sub">Import Export</span>
        </span>
      </a>

      <v-spacer />

      <nav class="d-none d-md-flex align-center ga-1" aria-label="Primary">
        <v-btn
          v-for="item in site.nav"
          :key="item.href"
          :href="item.href"
          variant="text"
          size="small"
          class="nav-link"
        >
          {{ item.label }}
        </v-btn>
      </nav>

      <v-btn
        :href="site.phoneHref"
        variant="tonal"
        color="primary"
        size="small"
        icon="mdi-phone"
        class="d-none d-md-inline-flex d-lg-none ml-1 nav-phone"
        aria-label="Call us"
      />
      <v-btn
        :href="site.phoneHref"
        variant="tonal"
        color="primary"
        size="small"
        prepend-icon="mdi-phone"
        class="d-none d-lg-inline-flex ml-2 nav-phone"
      >
        {{ site.phoneDisplay }}
      </v-btn>

      <v-btn
        href="#contact"
        color="accent"
        variant="flat"
        class="d-none d-md-inline-flex ml-3 header-cta"
        size="default"
      >
        Get a Quote
      </v-btn>

      <v-app-bar-nav-icon
        class="d-md-none"
        aria-label="Open navigation menu"
        @click="drawer = !drawer"
      />
    </v-container>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="right" temporary width="300">
    <div class="pa-5 d-flex flex-column h-100">
      <div class="d-flex align-center justify-space-between mb-4">
        <span class="font-heading font-weight-bold">Menu</span>
        <v-btn icon="mdi-close" variant="text" aria-label="Close menu" @click="drawer = false" />
      </div>

      <v-list nav density="comfortable">
        <v-list-item
          v-for="item in site.nav"
          :key="item.href"
          :href="item.href"
          :title="item.label"
          rounded="lg"
          @click="drawer = false"
        />
      </v-list>

      <div class="mt-auto d-flex flex-column ga-3">
        <v-btn :href="site.phoneHref" variant="outlined" color="primary" prepend-icon="mdi-phone" block>
          {{ site.phoneDisplay }}
        </v-btn>
        <v-btn href="#contact" color="accent" class="header-cta" block @click="drawer = false">
          Get a Quote
        </v-btn>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<style scoped lang="scss">
.site-header {
  border-bottom: 1px solid var(--gie-line);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  text-decoration: none;
  color: var(--gie-ink);
}

.brand__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(140deg, var(--gie-primary-deep), #1d5a96);
  color: var(--gie-accent-soft);
}

.brand__text {
  display: flex;
  flex-direction: column;
  line-height: 1.05;
}

.brand__name {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  font-size: 1.02rem;
}

.brand__sub {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gie-accent-ink);
}

.nav-link {
  color: var(--gie-ink);
  font-weight: 600;
}

.nav-phone {
  color: var(--gie-primary);
  font-weight: 700;
}

.header-cta {
  color: var(--gie-primary-deep) !important;
  box-shadow: 0 4px 14px rgba(245, 158, 11, 0.45);
  transition: box-shadow 0.25s ease, transform 0.25s ease;

  &:hover {
    box-shadow: 0 6px 20px rgba(245, 158, 11, 0.6);
    transform: translateY(-1px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .header-cta,
  .header-cta:hover {
    transition: none;
    transform: none;
  }
}
</style>
