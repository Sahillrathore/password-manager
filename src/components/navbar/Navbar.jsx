import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='bg-[#16379a] z-20 top-0  flex'>
        <div className="nav-container flex justify-between items-center px-20 py-4 w-screen">
            <div className="logo text-yellow-400 font-bold text-2xl">
                Keeper
            </div>

            <div className="nav-links flex list-none gap-6 text-zinc-200">
                <NavLink
                to="/"
                >
                  Home
                </NavLink>
                <NavLink
                to="/"
                >
                  Features
                </NavLink>
                <NavLink
                to="managers"
                >
                  Get Started
                </NavLink>
            </div>
        </div>
    </nav>
  )
}

export default Navbar