<script setup lang="ts">
import { useSiteStore } from '~/stores/site'
import { useContactStore } from '~/stores/contact'

const site = useSiteStore()
const contact = useContactStore()

const formRef = ref()

const rules = {
  required: (v: string) => !!v?.trim() || 'This field is required.',
  email: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email address.',
}

async function onSubmit() {
  const { valid } = await formRef.value.validate()
  if (!valid) return
  await contact.submit()
}
</script>

<template>
  <section id="contact" class="section contact-section">
    <v-container>
      <header v-reveal>
        <p class="section-kicker">Get a quote</p>
        <h2 class="section-title text-balance">
          Tell us what you need — we'll take it from there
        </h2>
        <p class="section-copy">
          Share your product, volume, and destination, and our team will respond with the right
          next step for your business. Prefer to talk? Call or message us on WhatsApp.
        </p>
      </header>

      <v-row class="mt-6">
        <v-col cols="12" md="6">
          <v-card v-reveal class="gie-card form-card pa-6 pa-sm-8" flat>
            <template v-if="!contact.submitted">
              <div class="form-head">
                <span class="form-head__mark" aria-hidden="true">
                  <v-icon icon="mdi-file-document-edit-outline" size="22" />
                </span>
                <div>
                  <h3 class="form-title">Request a quote</h3>
                  <p class="form-hint">
                    Tell us the product, volume, and destination — we'll reply by email.
                  </p>
                </div>
              </div>
              <v-form ref="formRef" class="mt-6" @submit.prevent="onSubmit">
                <v-text-field
                  v-model="contact.form.name"
                  label="Your name"
                  prepend-inner-icon="mdi-account-outline"
                  :rules="[rules.required]"
                  autocomplete="name"
                />
                <v-text-field
                  v-model="contact.form.email"
                  label="Email address"
                  type="email"
                  prepend-inner-icon="mdi-email-outline"
                  :rules="[rules.required, rules.email]"
                  autocomplete="email"
                  class="mt-2"
                />
                <v-text-field
                  v-model="contact.form.phone"
                  label="Phone / WhatsApp (optional)"
                  type="tel"
                  prepend-inner-icon="mdi-phone-outline"
                  autocomplete="tel"
                  class="mt-2"
                />
                <v-textarea
                  v-model="contact.form.message"
                  label="Your requirement"
                  placeholder="Product, grade, volume, destination port…"
                  prepend-inner-icon="mdi-package-variant-closed"
                  rows="4"
                  :rules="[rules.required]"
                  class="mt-2"
                />

                <v-alert
                  v-if="contact.error"
                  type="error"
                  variant="tonal"
                  density="comfortable"
                  class="mb-4"
                >
                  {{ contact.error }}
                </v-alert>

                <v-btn
                  type="submit"
                  color="accent"
                  size="x-large"
                  block
                  class="form-submit"
                  :loading="contact.isSubmitting"
                >
                  Send Enquiry
                  <v-icon icon="mdi-send" end />
                </v-btn>

                <p class="form-assurance">
                  <span><v-icon icon="mdi-clock-fast" size="16" /> Reply within 24 hours</span>
                  <span><v-icon icon="mdi-lock-outline" size="16" /> Your details stay private</span>
                </p>
              </v-form>
            </template>

            <div v-else class="text-center py-8">
              <v-icon icon="mdi-check-circle-outline" size="56" color="success" />
              <h3 class="form-title mt-4">Thank you — your enquiry is on its way.</h3>
              <p class="mt-3 form-success-copy">
                We've received your message and will get back to you by email. For anything
                urgent, reach us on WhatsApp or by phone.
              </p>
              <v-btn variant="text" color="primary" class="mt-4" @click="contact.reset()">
                Send another enquiry
              </v-btn>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <div class="d-flex flex-column ga-4">
            <v-card v-reveal="100" class="gie-card contact-card contact-card--feature pa-6" flat>
              <h3 class="contact-card__title">
                <v-icon icon="mdi-phone-in-talk-outline" size="20" />
                Talk to us directly
              </h3>
              <a :href="site.phoneHref" class="contact-card__phone mt-3">
                {{ site.phoneDisplay }}
              </a>
              <div class="d-flex flex-wrap ga-3 mt-5">
                <v-btn
                  :href="site.phoneHref"
                  color="accent"
                  variant="flat"
                  class="feature-cta"
                  prepend-icon="mdi-phone"
                >
                  Call Now
                </v-btn>
                <v-btn
                  :href="site.whatsappHref"
                  target="_blank"
                  rel="noreferrer"
                  color="#25D366"
                  variant="flat"
                  prepend-icon="mdi-whatsapp"
                >
                  Chat on WhatsApp
                </v-btn>
              </div>
              <a :href="`mailto:${site.email}`" class="contact-card__email mt-5">
                <v-icon icon="mdi-email-outline" size="18" />
                {{ site.email }}
              </a>
            </v-card>

            <v-card
              v-for="(office, i) in site.offices"
              :key="office.label"
              v-reveal="180 + i * 90"
              class="gie-card contact-card office-card pa-5"
              flat
            >
              <div class="office-card__head">
                <span class="office-card__flag" aria-hidden="true">
                  <IndiaFlag v-if="office.country === 'in'" :width="30" />
                  <UaeFlag v-else :width="30" />
                </span>
                <div>
                  <h3 class="office-card__label">{{ office.label }}</h3>
                  <p class="contact-card__company">{{ office.company }}</p>
                </div>
              </div>
              <div class="office-card__address mt-3">
                <p v-for="line in office.lines" :key="line" class="contact-card__line">
                  {{ line }}
                </p>
              </div>
              <v-btn
                :href="site.mapsUrl(office.mapsQuery)"
                target="_blank"
                rel="noreferrer"
                variant="tonal"
                color="primary"
                size="small"
                class="mt-4"
                prepend-icon="mdi-map-outline"
              >
                View on Google Maps
              </v-btn>
            </v-card>

            <v-card v-reveal="360" class="gie-card contact-card pa-5" flat>
              <h3 class="contact-card__title">
                <v-icon icon="mdi-share-variant-outline" size="20" />
                Follow our trade activity
              </h3>
              <div class="d-flex ga-2 mt-4">
                <v-btn
                  v-for="social in site.socials"
                  :key="social.label"
                  :href="social.href"
                  target="_blank"
                  rel="noreferrer"
                  :icon="social.icon"
                  variant="tonal"
                  color="primary"
                  :aria-label="social.label"
                />
              </div>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.contact-section {
  background:
    radial-gradient(circle at 8% 0%, rgba(245, 158, 11, 0.1), transparent 42%),
    radial-gradient(circle at 100% 100%, rgba(18, 58, 99, 0.1), transparent 48%),
    linear-gradient(180deg, #ffffff 0%, var(--gie-ivory) 100%);
}

.form-card {
  position: relative;
  overflow: hidden;

  // Amber top bar to pull the eye to the primary conversion action.
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--gie-accent), var(--gie-accent-soft));
  }
}

.form-head {
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
}

.form-head__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: linear-gradient(140deg, var(--gie-primary-deep), #1d5a96);
  color: var(--gie-accent-soft);
}

.form-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--gie-ink);
}

.form-hint {
  margin-top: 0.3rem;
  font-size: 0.9rem;
  color: var(--gie-muted);
}

.form-submit {
  color: var(--gie-primary-deep) !important;
  box-shadow: 0 8px 22px rgba(245, 158, 11, 0.35);
}

.form-assurance {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem 1.4rem;
  margin: 1rem 0 0;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--gie-muted);

  span {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
  }

  .v-icon {
    color: var(--gie-accent-ink);
  }
}

.contact-card__phone {
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(1.45rem, 2.4vw, 1.85rem);
  font-weight: 800;
  letter-spacing: -0.01em;
  color: var(--gie-primary);
  text-decoration: none;

  &:hover {
    color: var(--gie-primary-deep);
  }
}

.form-success-copy {
  color: var(--gie-muted);
  line-height: 1.7;
  max-width: 420px;
  margin-inline: auto;
}

.contact-card {
  background: #fff;
}

// Navy feature card so the direct-contact block anchors the column.
.contact-card--feature {
  border: none;
  background:
    radial-gradient(circle at 88% 0%, rgba(245, 158, 11, 0.22), transparent 46%),
    linear-gradient(150deg, var(--gie-primary-deep) 0%, #123a63 78%);

  .contact-card__title {
    color: #ffffff;

    .v-icon {
      color: var(--gie-accent-soft);
    }
  }

  .contact-card__phone {
    color: #ffffff;

    &:hover {
      color: var(--gie-accent-soft);
    }
  }

  .contact-card__email {
    color: rgba(238, 243, 249, 0.92);

    .v-icon {
      color: var(--gie-accent-soft);
    }
  }
}

.feature-cta {
  color: var(--gie-primary-deep) !important;
}

.contact-card__title {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 1.02rem;
  font-weight: 700;
  color: var(--gie-ink);

  .v-icon {
    color: var(--gie-accent-ink);
  }
}

.office-card {
  transition: border-color 0.25s ease;

  &:hover {
    border-color: rgba(245, 158, 11, 0.55);
  }
}

.office-card__head {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.office-card__flag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 48px;
  height: 36px;
  border-radius: 10px;
  background: var(--gie-ivory);
  border: 1px solid var(--gie-line);
}

.office-card__label {
  font-size: 1.02rem;
  font-weight: 700;
  color: var(--gie-ink);
}

.office-card__address {
  padding-left: 0.9rem;
  border-left: 3px solid rgba(245, 158, 11, 0.45);
}

.contact-card__company {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--gie-muted);
}

.contact-card__line {
  margin-top: 0.15rem;
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--gie-muted);
}

.contact-card__email {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--gie-primary);
  text-decoration: none;
  word-break: break-all;

  &:hover {
    text-decoration: underline;
  }
}
</style>
