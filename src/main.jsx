import { ThemeProvider, createTheme } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
const secondary = {
  main: '#FF5522',
  dark: '#CC4400',
  light: '#FFEECC'
}
const theme = createTheme({
  palette: {
    secondary: secondary
  }
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
