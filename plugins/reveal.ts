/**
 * v-reveal directive: fades/slides an element in the first time it scrolls
 * into view. Pass an optional delay in ms: v-reveal="120".
 * Falls back to visible immediately when IntersectionObserver is unavailable
 * or the user prefers reduced motion (handled in CSS).
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    getSSRProps: () => ({}),
    mounted(el: HTMLElement, binding) {
      el.classList.add('reveal')
      const delay = Number(binding.value) || 0
      if (delay > 0) el.style.transitionDelay = `${delay}ms`

      if (typeof IntersectionObserver === 'undefined') {
        el.classList.add('reveal--visible')
        return
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              el.classList.add('reveal--visible')
              observer.unobserve(el)
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
      )
      observer.observe(el)
    },
  })
})
