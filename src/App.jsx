import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Passmanager from './pages/Passmanager'
import Homepage from './components/Homepage'
import SignUp from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/managers' element={<ProtectedRoute> <Passmanager /> </ProtectedRoute>} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App