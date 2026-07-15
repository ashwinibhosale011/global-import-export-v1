import { defineStore } from 'pinia'
import { useSiteStore } from './site'

interface ContactForm {
  name: string
  email: string
  phone: string
  message: string
}

const emptyForm = (): ContactForm => ({
  name: '',
  email: '',
  phone: '',
  message: '',
})

export const useContactStore = defineStore('contact', {
  state: () => ({
    form: emptyForm(),
    isSubmitting: false,
    submitted: false,
    error: '' as string,
  }),

  actions: {
    async submit() {
      const site = useSiteStore()
      this.error = ''
      this.isSubmitting = true
      try {
        await $fetch(site.formEndpoint, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: {
            name: this.form.name,
            email: this.form.email,
            phone: this.form.phone,
            message: this.form.message,
          },
        })
        this.submitted = true
        this.form = emptyForm()
      } catch {
        this.error =
          'Sorry, your message could not be sent. Please try again, or email us directly.'
      } finally {
        this.isSubmitting = false
      }
    },

    reset() {
      this.form = emptyForm()
      this.submitted = false
      this.error = ''
    },
  },
})
