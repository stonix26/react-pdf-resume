import { Font, StyleSheet } from '@react-pdf/renderer'
import OpenSansRegular from '@/assets/Open_Sans/static/OpenSans-Regular.ttf'
import OpenSansBold from '@/assets/Open_Sans/static/OpenSans-Bold.ttf'

Font.register({
  family: 'Open Sans',
  src: OpenSansRegular,
  fontWeight: 'normal'
})

Font.register({
  family: 'Open Sans',
  src: OpenSansBold,
  fontWeight: 'bold'
})

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
