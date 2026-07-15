<script setup lang="ts">
import { useSiteStore } from '~/stores/site'
import { useContactStore } from '~/stores/contact'

const site = useSiteStore()
const contact = useContactStore()

// Pre-fill the enquiry form when a buyer clicks a specific product,
// without clobbering anything they may have already typed.
function enquire(productName: string) {
  if (!contact.form.message.trim()) {
    contact.form.message = `Product: ${productName}\nVolume: \nDestination port: `
  }
}
</script>

<template>
  <section id="products" class="section section--tinted">
    <v-container>
      <header v-reveal>
        <p class="section-kicker">Our export range</p>
        <h2 class="section-title text-balance">Export-grade produce, sourced at origin</h2>
        <p class="section-copy">
          Every product is procured directly from trusted growing regions in India, graded to your
          specification, and packed for international transit.
        </p>
      </header>

      <v-row class="mt-6" justify="center">
        <v-col
          v-for="(product, i) in site.products"
          :key="product.name"
          cols="6"
          sm="6"
          md="4"
        >
          <v-card v-reveal="(i % 3) * 80" class="gie-card product-card" flat>
            <div class="product-card__media">
              <v-img
                :src="product.image"
                :alt="`${product.name} — fresh export produce`"
                cover
                class="product-card__img"
              />
              <span class="product-card__name">{{ product.name }}</span>
            </div>
            <v-card-item class="product-card__body">
              <p class="product-card__desc">{{ product.description }}</p>
              <a href="#contact" class="product-card__enquire" @click="enquire(product.name)">
                Get a quote
                <v-icon icon="mdi-arrow-right" size="15" />
              </a>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>

      <div class="text-center mt-8" v-reveal>
        <p class="products-note">
          Looking for a product or grade that isn't listed here? We source to order.
        </p>
        <v-btn href="#contact" color="primary" size="large" class="mt-3">
          Ask About a Product
          <v-icon icon="mdi-arrow-right" end />
        </v-btn>
      </div>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.product-card {
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.product-card__media {
  position: relative;
}

.product-card__img {
  height: 230px;
  transition: transform 0.5s ease;

  @media (max-width: 599px) {
    // Cards sit two-up on phones, so keep the photo shorter.
    height: 140px;
  }
}

.product-card:hover .product-card__img {
  transform: scale(1.04);
}

.product-card__name {
  position: absolute;
  left: 0.9rem;
  bottom: 0.9rem;
  padding: 0.38rem 1rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.94);
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: var(--gie-primary-deep);
  box-shadow: 0 4px 14px rgba(12, 42, 74, 0.18);

  @media (max-width: 599px) {
    left: 0.6rem;
    bottom: 0.6rem;
    max-width: calc(100% - 1.2rem);
    padding: 0.28rem 0.7rem;
    font-size: 0.82rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.product-card__body {
  flex: 1;

  @media (max-width: 599px) {
    padding: 0.75rem 0.85rem 0.85rem;
  }
}

.product-card__desc {
  font-size: 0.94rem;
  line-height: 1.65;
  color: var(--gie-muted);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 599px) {
    font-size: 0.84rem;
    line-height: 1.55;
    -webkit-line-clamp: 3;
  }
}

.product-card__enquire {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 0.7rem;
  // Generous vertical padding keeps the link comfortably tappable.
  padding: 0.35rem 0;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--gie-accent-ink);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.products-note {
  color: var(--gie-muted);
  font-size: 0.98rem;
}

@media (prefers-reduced-motion: reduce) {
  .product-card__img,
  .product-card:hover .product-card__img {
    transform: none;
    transition: none;
  }
}
</style>
