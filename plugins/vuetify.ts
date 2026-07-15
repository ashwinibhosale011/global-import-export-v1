import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      defaultTheme: 'gieLight',
      themes: {
        gieLight: {
          dark: false,
          colors: {
            primary: '#123A63',
            'primary-darken-1': '#0C2A4A',
            secondary: '#13202E',
            accent: '#F59E0B',
            background: '#F6F8FB',
            surface: '#FFFFFF',
            'surface-variant': '#E9EEF5',
            'on-background': '#13202E',
            'on-surface': '#13202E',
            error: '#B3261E',
            success: '#1E7A46',
            info: '#1F6E8C',
            warning: '#B26A00',
          },
        },
      },
    },
    defaults: {
      VBtn: {
        rounded: 'pill',
        class: 'text-none font-weight-bold',
      },
      VTextField: {
        variant: 'outlined',
        color: 'primary',
        density: 'comfortable',
      },
      VTextarea: {
        variant: 'outlined',
        color: 'primary',
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
