import { useRoutes } from 'react-router-dom'
import AuthLayout from '../pages/AuthLayout/AuthLayout'
import Discover from '../pages/Discover/Discover'
import Login from '../pages/Login/Login'
import MainLayout from '../pages/MainLayout/MainLayout'
import MyProjects from '../pages/MyProjects/MyProjects'
import SignUp from '../pages/SignUp/SignUp'

export default function Router() {
  let element = useRoutes([
    {
      element: <AuthLayout />,
      children: [
        { path: '/', element: <Login /> },
        { path: '/cadastrar', element: <SignUp /> }
      ]
    },
    {
      element: <MainLayout />,
      children: [
        { path: 'meus-projetos', element: <MyProjects /> },
        { path: 'descobrir', element: <Discover /> }
      ]
    }
  ])
  return element
}
