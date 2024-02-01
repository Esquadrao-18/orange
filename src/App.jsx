import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'
import SignUp from './pages/SignUp/SignUp'

const secondary = {
  main: '#FF5522',
  dark: '#CC4400',
  light: '#FFEECC'
}
const principal = {
  main: '#EDEFF2'
}
const theme = createTheme({
  palette: {
    secondary: secondary,
    principal: principal
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: '15px',
          padding: '8px 22px',
          lineHeight: '26px'
        }
      }
    }
  }
})
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App"></div>
      <SignUp />
    </ThemeProvider>
  )
}
