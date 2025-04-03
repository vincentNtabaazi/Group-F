import { createContext, useState, useEffect } from 'react'
import { FetchUser } from '../services/userService'

const authContext = createContext()

const AuthProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userId, setUserId] = useState('')
  const [userLoginData, setUserLoginData] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserId(payload.user_id);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
    setIsAuthenticated(!!token);
  }, []);


  useEffect(() => {
    if (userId) {
      setLoading(true);
      FetchUser(userId, setUserLoginData).then(() => setLoading(false));
    }
  }, [userId]);


  useEffect(() => {
    if (userId) {
      FetchUser(userId, setUserLoginData);
    }
  }, [userId]);

  console.log(userLoginData)

  return (
    <authContext.Provider
      value={{
        isAuthenticated,
        userId,
        loading,
        userLoginData,
        setIsAuthenticated,
        setUserLoginData,
      }}
    >
      {children}
    </authContext.Provider>
  )
}

export { authContext, AuthProvider }