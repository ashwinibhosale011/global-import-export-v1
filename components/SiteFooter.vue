<script setup lang="ts">
import { useSiteStore } from '~/stores/site'

const site = useSiteStore()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <v-container>
      <v-row>
        <v-col cols="12" md="5">
          <div class="d-flex align-center ga-3">
            <span class="footer__mark" aria-hidden="true">
              <v-icon icon="mdi-earth" size="20" />
            </span>
            <span class="footer__brand">{{ site.businessName }}</span>
          </div>
          <p class="footer__blurb mt-4">
            Premium Indian produce, sourced at origin and delivered export-ready — a disciplined
            trade partner for buyers who value quality, reliability, and clear communication.
          </p>
          <div class="d-flex ga-2 mt-5">
            <v-btn
              v-for="social in site.socials"
              :key="social.label"
              :href="social.href"
              target="_blank"
              rel="noreferrer"
              :icon="social.icon"
              variant="text"
              color="white"
              density="comfortable"
              :aria-label="social.label"
            />
          </div>
        </v-col>

        <v-col cols="6" md="2">
          <h3 class="footer__heading">Explore</h3>
          <ul class="footer__links">
            <li v-for="item in site.nav" :key="item.href">
              <a :href="item.href" class="footer__link">{{ item.label }}</a>
            </li>
          </ul>
        </v-col>

        <v-col cols="6" md="2">
          <h3 class="footer__heading">Contact</h3>
          <ul class="footer__links">
            <li>
              <a :href="site.phoneHref" class="footer__link">{{ site.phoneDisplay }}</a>
            </li>
            <li>
              <a :href="`mailto:${site.email}`" class="footer__link footer__link--wrap">Email us</a>
            </li>
            <li>
              <a :href="site.whatsappHref" target="_blank" rel="noreferrer" class="footer__link">
                WhatsApp
              </a>
            </li>
          </ul>
        </v-col>

        <v-col cols="12" md="3">
          <h3 class="footer__heading">Offices</h3>
          <p v-for="office in site.offices" :key="office.label" class="footer__office">
            <strong>{{ office.label }}</strong><br />
            {{ office.lines[office.lines.length - 1] }}
          </p>
        </v-col>
      </v-row>

      <div class="footer__bottom">
        <p>© {{ year }} {{ site.businessName }}. All rights reserved.</p>
        <a href="#home" class="footer__link">Back to top ↑</a>
      </div>
    </v-container>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background: #0a1a2c;
  color: rgba(238, 243, 249, 0.85);
  padding: clamp(3rem, 6vw, 4.5rem) 0 0;
}

.footer__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: linear-gradient(140deg, var(--gie-primary-deep), #1d5a96);
  color: var(--gie-accent-soft);
}

.footer__brand {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  font-weight: 800;
  color: #fff;
}

.footer__blurb {
  max-width: 420px;
  font-size: 0.92rem;
  line-height: 1.7;
  color: rgba(238, 243, 249, 0.66);
}

.footer__heading {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gie-accent-soft);
  margin-bottom: 1rem;
}

.footer__links {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.footer__link {
  color: rgba(238, 243, 249, 0.8);
  text-decoration: none;
  font-size: 0.92rem;

  &:hover {
    color: var(--gie-accent-soft);
  }
}

.footer__link--wrap {
  word-break: break-all;
}

.footer__office {
  font-size: 0.88rem;
  line-height: 1.6;
  color: rgba(238, 243, 249, 0.66);
  margin-bottom: 0.9rem;

  strong {
    color: rgba(238, 243, 249, 0.92);
  }
}

.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 2.5rem;
  padding: 1.4rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.85rem;
  color: rgba(238, 243, 249, 0.6);
}
</style>
