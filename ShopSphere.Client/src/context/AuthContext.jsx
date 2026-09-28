import { createContext, useContext, useState } from "react"

const AuthContext = createContext()

export function AuthProvider({children}){

  const [user, setUser] = useState({
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId"),
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
    role: localStorage.getItem("role")
  })

  function login(userData) {
    localStorage.setItem("token", userData.token)
    localStorage.setItem("userId", userData.userId)
    localStorage.setItem("name", userData.name)
    localStorage.setItem("email", userData.email)
    localStorage.setItem("role", userData.role)

    setUser(userData)
  }

  function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.removeItem("name")
    localStorage.removeItem("email")
    localStorage.removeItem("role")

    setUser({
      token: null,
      userId: null,
      name: null,
      email: null,
      role: null
    })
  }

    const isLoggedIn = !!user.token
    return (
      <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
        {children}
      </AuthContext.Provider>
    )
}

export function useAuth() {
  return useContext(AuthContext)
}