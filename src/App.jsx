import React from 'react'
import Navbar from './components/navbar/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './components/homepage/Homepage'
import Passmanager from './components/manager/Passmanager'

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