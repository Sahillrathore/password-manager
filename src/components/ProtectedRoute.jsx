import React, { useEffect } from 'react'
import { useUserContext } from '../context/userContex'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useUserContext();
  // console.log(user);
  
  const navigate = useNavigate()

  console.log(user);
  
  useEffect(()=> {
    if (!user) {
      navigate("/signup")
    }

  },[user])
  return (
    children
  )
}

export default ProtectedRoute