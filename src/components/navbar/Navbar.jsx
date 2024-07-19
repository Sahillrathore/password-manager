import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {

  const [navToggle, setNavToggle] = useState(false);
  const navRef = useRef();

  const navHandler = () => {
    setNavToggle(!navToggle);
    navRef.current.classList.toggle("translate-x-12")
  }

  return (
    <nav className='bg-[#16379a] z-20 top-0  flex'>
        <div className="nav-container flex justify-between items-center sm:px-20 px-12 py-4 w-screen relative">
            <div className="logo text-yellow-400 font-bold text-2xl">
                Keeper
            </div>

            <div className={`nav-links md:flex  ${navToggle ? " flex flex-col absolute top-5 bg-black/50 px-4 rounded-lg py-6 right-16 z-50" : "hidden"} list-none gap-6 text-zinc-200`}>
                <NavLink
                className="hover:text-yellow-400"
                to="/"
                onClick={navHandler}
                >
                  Home
                </NavLink>
                <NavLink
                className="hover:text-yellow-400"
                to="/"
                onClick={navHandler}
                >
                  Features
                </NavLink>
                <NavLink
                className="hover:text-yellow-400"
                to="managers"
                onClick={navHandler}
                >
                  Get Started
                </NavLink>
            </div>

            <div
            className="menu-icon text-4xl text-white md:hidden flex  flex-col transition-transform cursor-pointer active:rotate-180"
            onClick={navHandler}
            ref={navRef}
            >
              {navToggle ? "x" : "="}
            </div>
        </div>
    </nav>
  )
}

export default Navbar