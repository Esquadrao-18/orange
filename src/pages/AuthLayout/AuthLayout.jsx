import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import Login from '../Login/Login'

export default function AuthLayout() {
  return (
    <>
      <Login />
      <Link to="/meus-projetos">
        <Button color="secondary" variant="contained">
          Projetos
        </Button>
      </Link>
    </>
  )
}
