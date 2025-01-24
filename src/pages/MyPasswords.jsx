import React from 'react'
import Navbar from '../components/Navbar'
import AllPasswords from '../components/AllPasswords'

const MyPasswords = () => {
  return (
    <>
        <Navbar/>
        
        <div className='px-6 py-2'>
            <AllPasswords/>
        </div>
    </>
  )
}

export default MyPasswords