import { jwtDecode } from 'jwt-decode'
import { createContext, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('token', null)

  const userData = user ? { ...jwtDecode(user).userInfo } : {}

  const login = (token) => {
    setUser(token)
  }

  const logout = () => {
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      userData,
      login,
      logout
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
