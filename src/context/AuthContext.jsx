import { jwtDecode } from 'jwt-decode'
import { createContext, useMemo, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('token', null)
  const [isGoogle, setIsGoogle] = useState(false)

  const userData = user
    ? isGoogle
      ? { ...jwtDecode(user) }
      : { ...jwtDecode(user).userInfo }
    : {}

  const login = (token) => {
    setUser(token)
  }
  const googleLogin = (token) => {
    setUser(token)
    setIsGoogle(true)
  }

  const logout = () => {
    setUser(null)
    setIsGoogle(false)
  }

  const value = useMemo(
    () => ({
      user,
      userData,
      login,
      googleLogin,
      logout
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}