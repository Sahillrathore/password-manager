import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useUserContext } from '../context/userContex';
import { CgProfile } from 'react-icons/cg';
import { collection } from 'firebase/firestore';
import { db } from '../firebase';

const Navbar = () => {

  const [navToggle, setNavToggle] = useState(false);
  const [profileView, setProfileView] = useState(false);

  const navRef = useRef();
  const { user, setUser } = useUserContext();
  // console.log(user.uid);

  const location = useLocation();
  const isHome = location.pathname === "/";

  const navHandler = () => {
    setNavToggle(!navToggle);
    navRef.current.classList.toggle("translate-x-12")
  }

  const handleLogout = () => {
    setUser(null);
    setProfileView(!profileView);
  }

  // const fetchUserData = () => {
  //   const userData = collection(db, "users", user);
  //   console.log(userData);
    
  // }

  // useEffect(()=>{
  //   fetchUserData();
  // },[])

  return (
    <nav className={`z-20 flex ${isHome ? 'top-4 absolute' : ''} w-full rounded-full`}>
      <div className={`nav-container flex justify-between items-center sm:px-16 px-10 py-4 relative ${isHome ? 'w-[92%] rounded-full  shadow-sm' : 'w-full shadow-md'}  mx-auto bg-[#fff]`}>
        <div className="logo text-[#4461b9] font-bold text-2xl">
          <Link to='/'>
            SecureVault
          </Link>
        </div>

        <div className={`nav-links md:flex hidden list-none gap-6 items-center text-zinc-700`}>
          <NavLink
            className="hover:text-[#16379a]"
            to="/"

          >
            Home
          </NavLink>
          {user ?
            <NavLink to='/managers'
              className="hover:text-[#16379a]"
            >
              Manager
            </NavLink>
            :
            <a
              className="hover:text-[#16379a]"
              href="#features"

            >
              Features
            </a>}
          {
            user ?
              <CgProfile className='text-2xl cursor-pointer' onClick={() => { setProfileView(!profileView) }} />
              :
              <NavLink
                className="hover:text-yellow-400"
                to="/managers"

              >
                Get Started
              </NavLink>
          }
          {
            profileView &&
            <div className='p-3 bg-  absolute right-16 top-16 z-50 bg-white border rounded-md'>
              
              <p className='text-sm pb-1 border-b border-gray-300'>{user?.email}</p>
              
              <button className='px-4 mt-2 py-1.5 bg-transparent text-white font-semibold rounded-md text-sm !bg-blue-600 hover:bg-blue-500 transition-colors'
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          }
        </div>


        <div className={`nav-links-md md:hidden ${navToggle ? "flex flex-col absolute top-5 sm:right-16 right-7 z-50 bg-black/70 px-4 rounded-lg py-6" : "hidden"} list-none gap-6 text-zinc-200`}>
          <NavLink
            className="hover:text-yellow-400"
            to="/"
            onClick={navHandler}
          >
            Home
          </NavLink>
          <a
            className="hover:text-yellow-400"
            href="#features"
            onClick={navHandler}
          >
            Features
          </a>
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