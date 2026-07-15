<script setup lang="ts">
import { useSiteStore } from '~/stores/site'

const site = useSiteStore()

const PREVIEW_COUNT = 8
const previewPhotos = computed(() => site.galleryPhotos.slice(0, PREVIEW_COUNT))
const remaining = computed(() => site.galleryPhotos.length - PREVIEW_COUNT)

const viewerOpen = ref(false)
const viewerIndex = ref(0)

function openViewer(index: number) {
  viewerIndex.value = index
  viewerOpen.value = true
}

function next() {
  viewerIndex.value = (viewerIndex.value + 1) % site.galleryPhotos.length
}

function prev() {
  viewerIndex.value =
    (viewerIndex.value - 1 + site.galleryPhotos.length) % site.galleryPhotos.length
}

function onKeydown(event: KeyboardEvent) {
  if (!viewerOpen.value) return
  if (event.key === 'ArrowRight') next()
  if (event.key === 'ArrowLeft') prev()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <section id="gallery" class="section section--tinted">
    <v-container>
      <header v-reveal>
        <p class="section-kicker">From farm to port</p>
        <h2 class="section-title text-balance">Our work on the ground</h2>
        <p class="section-copy">
          Real photographs from our sourcing regions, harvests, packing operations, and shipments
          — no stock imagery.
        </p>
      </header>

      <div class="gallery mt-8">
        <button
          v-for="(photo, i) in previewPhotos"
          :key="photo"
          v-reveal="(i % 4) * 70"
          type="button"
          class="gallery__tile"
          :aria-label="`Open photo ${i + 1} of ${site.galleryPhotos.length}`"
          @click="openViewer(i)"
        >
          <v-img :src="photo" :alt="`Field and export operations photo ${i + 1}`" cover height="100%" />
          <span v-if="i === previewPhotos.length - 1 && remaining > 0" class="gallery__more">
            +{{ remaining }} more
          </span>
        </button>
      </div>

      <div class="text-center mt-8" v-reveal>
        <v-btn variant="outlined" color="primary" size="large" @click="openViewer(0)">
          <v-icon icon="mdi-image-multiple-outline" start />
          View Full Gallery ({{ site.galleryPhotos.length }} photos)
        </v-btn>
      </div>
    </v-container>

    <v-dialog v-model="viewerOpen" max-width="1080" class="gallery-viewer">
      <v-card color="#0E1B2C" rounded="xl">
        <div class="viewer">
          <v-img
            :src="site.galleryPhotos[viewerIndex]"
            :alt="`Field and export operations photo ${viewerIndex + 1}`"
            max-height="72vh"
            contain
          />
          <v-btn
            icon="mdi-chevron-left"
            variant="tonal"
            color="white"
            class="viewer__nav viewer__nav--prev"
            aria-label="Previous photo"
            @click="prev"
          />
          <v-btn
            icon="mdi-chevron-right"
            variant="tonal"
            color="white"
            class="viewer__nav viewer__nav--next"
            aria-label="Next photo"
            @click="next"
          />
          <v-btn
            icon="mdi-close"
            variant="tonal"
            color="white"
            class="viewer__close"
            aria-label="Close gallery"
            @click="viewerOpen = false"
          />
        </div>
        <div class="viewer__footer">
          Photo {{ viewerIndex + 1 }} of {{ site.galleryPhotos.length }}
        </div>
      </v-card>
    </v-dialog>
  </section>
</template>

<style scoped lang="scss">
.gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.9rem;

  @media (max-width: 959px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.gallery__tile {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  padding: 0;
  border: none;
  border-radius: var(--gie-radius-md);
  overflow: hidden;
  cursor: pointer;
  background: #dfe6ee;
  box-shadow: var(--gie-shadow-card);
  transition: transform 0.28s ease, box-shadow 0.28s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-3px);
    box-shadow: var(--gie-shadow-card-hover);
  }

  &:focus-visible {
    outline: 3px solid var(--gie-accent);
    outline-offset: 2px;
  }
}

.gallery__more {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(12, 42, 74, 0.64);
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
}

.viewer {
  position: relative;
}

.viewer__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.viewer__nav--prev {
  left: 0.75rem;
}

.viewer__nav--next {
  right: 0.75rem;
}

.viewer__close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
}

.viewer__footer {
  padding: 0.8rem 1.25rem;
  text-align: center;
  color: rgba(238, 243, 249, 0.75);
  font-size: 0.86rem;
}

@media (prefers-reduced-motion: reduce) {
  .gallery__tile,
  .gallery__tile:hover {
    transform: none;
    transition: none;
  }
}
</style>
