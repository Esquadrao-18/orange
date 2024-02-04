import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Discover from '../pages/Discover/Discover'
import Login from '../pages/Login/Login'
import MainLayout from '../pages/MainLayout/MainLayout'
import MyProjects from '../pages/MyProjects/MyProjects'
import SignUp from '../pages/SignUp/SignUp'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  return user ? <MainLayout>{children}</MainLayout> : <Navigate to="/" />
}
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastrar" element={<SignUp />} />

        <Route
          path="/meus-projetos"
          element={
            <ProtectedRoute>
              <MyProjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/descobrir"
          element={
            <ProtectedRoute>
              <Discover />
            </ProtectedRoute>
          }
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}
export default AppRouter
