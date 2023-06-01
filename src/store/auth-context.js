import React, { useState, useEffect } from 'react'

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {}
})

export const AuthContextProvider = (props) => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  const loginHandler = () => {
    setIsLoggedIn(true)
  }

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn")
    setIsLoggedIn(false)
  }

}

export default AuthContext;