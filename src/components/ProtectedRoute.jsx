import React, { useEffect } from 'react'
import { useUserContext } from '../context/userContex'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useUserContext();
  // console.log(user);
  
  const navigate = useNavigate()

  // console.log(user);
  
  useEffect(()=> {
    if (!user) {
      navigate("/signup", {replace: true, state: {login: 'login'}})
    }

  },[user])
  return (
    user ? children : null
  )
}

export default ProtectedRoute