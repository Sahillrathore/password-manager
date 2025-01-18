import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Passmanager from './pages/Passmanager'
import Homepage from './components/Homepage'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='managers' element={<Passmanager/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App