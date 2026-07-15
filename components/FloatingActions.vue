<script setup lang="ts">
import { useSiteStore } from '~/stores/site'

const site = useSiteStore()
</script>

<template>
  <!-- Desktop: floating WhatsApp button -->
  <a
    :href="site.whatsappHref"
    target="_blank"
    rel="noreferrer"
    class="wa-fab d-none d-md-flex"
    aria-label="Chat with us on WhatsApp"
  >
    <v-icon icon="mdi-whatsapp" size="28" />
  </a>

  <!-- Mobile: sticky bottom action bar -->
  <nav class="action-bar d-md-none" aria-label="Quick contact actions">
    <a :href="site.phoneHref" class="action-bar__btn">
      <v-icon icon="mdi-phone" size="20" />
      <span>Call</span>
    </a>
    <a :href="site.whatsappHref" target="_blank" rel="noreferrer" class="action-bar__btn">
      <v-icon icon="mdi-whatsapp" size="20" />
      <span>WhatsApp</span>
    </a>
    <a href="#contact" class="action-bar__btn action-bar__btn--primary">
      <v-icon icon="mdi-file-document-edit-outline" size="20" />
      <span>Get a Quote</span>
    </a>
  </nav>
</template>

<style scoped lang="scss">
.wa-fab {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: 1005;
  align-items: center;
  justify-content: center;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: #25d366;
  color: #fff;
  box-shadow: 0 12px 30px rgba(12, 42, 74, 0.35);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 18px 38px rgba(12, 42, 74, 0.45);
  }
}

.action-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1005;
  display: flex;
  background: #ffffff;
  border-top: 1px solid var(--gie-line);
  box-shadow: 0 -8px 24px rgba(12, 42, 74, 0.12);
  padding-bottom: env(safe-area-inset-bottom);
}

.action-bar__btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  padding: 0.9rem 0.5rem;
  font-size: 0.86rem;
  font-weight: 700;
  color: var(--gie-primary);
  text-decoration: none;

  & + & {
    border-left: 1px solid var(--gie-line);
  }
}

.action-bar__btn--primary {
  background: var(--gie-primary);
  color: #fff;
}

@media (prefers-reduced-motion: reduce) {
  .wa-fab,
  .wa-fab:hover {
    transform: none;
    transition: none;
  }
}
</style>
