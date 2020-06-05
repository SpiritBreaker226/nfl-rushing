import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    h1: {
      fontSize: '3rem',
    },
  },
  palette: {
    type: 'dark',
    text: {
      primary: '#fff',
    },
    background: {
      default: '#000',
    },
    secondary: {
      main: '#999',
    },
    error: {
      main: '#f44336',
    },
  },
})

export default theme
