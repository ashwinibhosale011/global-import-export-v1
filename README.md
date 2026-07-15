# Global India Import Export — Website Redesign (v1)

A modern, premium, conversion-focused one-page website for
[Global India Import Export](https://www.globalindiaimportexport.com/), rebuilt with:

- **Nuxt 3** (Vue 3 + TypeScript, SSR)
- **Vuetify 3** (custom light theme)
- **Pinia** (business content + contact-form state)

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run generate # static site (recommended for simple hosting)
```

> Note: if the `C:` drive is full, redirect the npm cache first:
> `npm install --cache d:\BoltVersionImportExport\.npm-cache`

## Where the content comes from

All facts were extracted from the existing website / its source (`IEv3` project):

- Products, offices (Pune + Ras Al Khaimah), email, WhatsApp number **+91 99223 71579**,
  social links, and the published figures (15+ years, 500+ clients, 50+ countries, 15M+ kg).
- Credentials listed on the old site: IEC Registration, GST Registered, E-License, Trade Membership.
- All photography is the business's own imagery copied from the old site (`public/`).
- The contact form posts to the same **Formspree** endpoint the old site used.
- No testimonials existed on the old site, so trust is built with Why-Us / Process /
  credentials sections instead — none were invented.

**Single source of truth:** edit business facts in [stores/site.ts](stores/site.ts) — every
section reads from that Pinia store. Opening hours were not published on the old site, so they
are intentionally omitted; add them in `ContactSection.vue` if the business provides them.

## Conversion design

Primary goal: **quote requests / trade enquiries** (B2B export business).

- "Get a Quote" CTA in the header, hero, products, and process sections → contact form
- Hero: rotating 3-image banner (same images the original site cycles), direct call button,
  and a registered-exporter trust line (real credentials) next to the primary CTA
- Product cards each carry a "Get a quote" link that pre-fills the enquiry form
- Clickable phone number (large, in the contact section) + WhatsApp deep link throughout
- Mobile: sticky bottom action bar (Call / WhatsApp / Get a Quote)
- Desktop: floating WhatsApp button

**Theme:** deep navy + amber (premium trade palette). The original site's green was replaced
per the redesign brief; WhatsApp buttons keep WhatsApp's own brand green. No testimonials are
shown because none exist on the original site — add a reviews section only when real ones are
available.

**Images:** the original hero/product images shipped at up to 13 MB each; they were resized
and recompressed for the web (hero slider now totals ~640 KB for all three slides).

## Structure

```
stores/site.ts          # all business data (edit here)
stores/contact.ts       # contact-form state + Formspree submit
pages/index.vue         # one-page composition
components/
  SiteHeader.vue        # sticky header, mobile drawer, phone + CTA
  HeroSection.vue       # rotating image banner, headline, CTAs, trust chips
  StatsBand.vue         # published company figures + service-area line
  ProductsSection.vue   # 8 real products, per-product quote links
  WhyChooseSection.vue  # 4 pillars + registrations strip
  ProcessSection.vue    # 4-step "how it works"
  AboutSection.vue      # story, mission/vision, team photo
  GallerySection.vue    # 33 real photos, lightbox viewer
  ContactSection.vue    # form, big phone number, offices, maps links, socials
  SiteFooter.vue
  FloatingActions.vue   # WhatsApp FAB + mobile action bar
plugins/vuetify.ts      # navy + amber theme
plugins/reveal.ts       # v-reveal scroll animation directive
```
