import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Passmanager from './pages/Passmanager'
import Homepage from './components/Homepage'
import SignUp from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'
import MyPasswords from './pages/MyPasswords'
import { useUserContext } from './context/userContex'
import Pagenotfound from './pages/Pagenotfound'

const App = () => {

  const { user } = useUserContext();

  if (user) {
    console.log('Welcome, ', user.email);
  } else {
    console.log('Please Login');

  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/managers' element={<ProtectedRoute> <Passmanager /> </ProtectedRoute>} />
          <Route path='/passwords' element={<MyPasswords />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='*' element={<Pagenotfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App