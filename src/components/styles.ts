import { Font, StyleSheet } from '@react-pdf/renderer'
import OpenSansRegular from '../assets/Open_Sans/static/OpenSans-Regular.ttf'
import OpenSansBold from '../assets/Open_Sans/static/OpenSans-Bold.ttf'

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
  page: {
    padding: 30,
    fontFamily: 'Open Sans',
    fontSize: 10,
    fontWeight: 'normal'
  },
  section: {
    marginBottom: 10
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    marginBottom: 10
  },
  profilePic: {
    width: 100,
    height: 100
  },
  nameWrapper: {
    textTransform: 'uppercase',
    fontSize: 22,
    lineHeight: 1.25
  },
  lastName: { fontWeight: 'bold' },
  subHeader: {
    fontSize: 14,
    marginBottom: 2
  },
  viewer: {
    width: '100%',
    height: '95vh',
    border: 'none'
  }
})
