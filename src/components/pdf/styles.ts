import { Font, StyleSheet } from '@react-pdf/renderer'
import OpenSansRegular from '@/assets/Open_Sans/static/OpenSans-Regular.ttf?url'
import OpenSansBold from '@/assets/Open_Sans/static/OpenSans-Bold.ttf?url'

try {
  Font.register({
    family: 'Open Sans',
    fonts: [
      { src: OpenSansRegular, fontWeight: 400 },
      { src: OpenSansBold, fontWeight: 700 }
    ]
  })
} catch {
  // Font family already registered during HMR.
}

export const styles = StyleSheet.create({
  section: {
    marginBottom: 10
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 2
  },
  links: {
    textDecoration: 'none',
    color: 'inherit'
  }
})
