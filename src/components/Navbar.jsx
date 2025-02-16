import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useUserContext } from '../context/userContex';
import { CgProfile } from 'react-icons/cg';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [navToggle, setNavToggle] = useState(false);
  const [profileView, setProfileView] = useState(false);
  const { user, setUser } = useUserContext();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navHandler = () => {
    setNavToggle((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Logs out from Firebase
      setUser(null);
      setProfileView(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className={`z-20 flex ${isHome ? 'top-4 absolute' : ''} w-full rounded-full`}>
      <div className={`nav-container flex justify-between items-center sm:px-10 px-4 sm:py-4 py-2 relative ${isHome ? 'w-[92%] rounded-full shadow-sm' : 'w-full shadow-md'} mx-auto bg-[#fff]`}>
        {/* Logo */}
        <div className="logo text-[#4461b9] font-bold sm:text-2xl text-lg">
          <Link to="/">SecureVault</Link>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-links hidden md:flex list-none gap-6 items-center text-zinc-700">
          <NavLink className="hover:text-[#16379a]" to="/">Home</NavLink>
          {user ? (
            <NavLink className="hover:text-[#16379a]" to="/managers">Manager</NavLink>
          ) : (
            <a className="hover:text-[#16379a]" href="#features">Features</a>
          )}
          {user ? (
            <CgProfile
              className="text-2xl cursor-pointer"
              onClick={() => setProfileView(!profileView)}
            />
          ) : (
            <NavLink className="hover:text-[#16379a]" to="/managers">Get Started</NavLink>
          )}
          {profileView && (
            <div className="p-3 absolute right-16 top-16 z-50 bg-white border rounded-md">
              <p className="text-sm pb-1 border-b border-gray-300">{user?.email}</p>
              <button
                className="px-4 mt-2 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md text-sm transition-colors"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Navigation Toggle Icon */}
        <div className="md:hidden mt-0">
          <button onClick={navHandler} className="text-xl text-zinc-700 focus:outline-none">
            {navToggle ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {navToggle && (
          <div className="nav-links-md absolute top-16 right-7 z-50 bg-black/70 px-4 py-6 rounded-lg flex flex-col gap-6 text-zinc-200 md:hidden">
            <NavLink className="hover:text-yellow-400" to="/" onClick={navHandler}>
              Home
            </NavLink>
            <a className="hover:text-yellow-400" href="#features" onClick={navHandler}>
              Features
            </a>
            <NavLink className="hover:text-yellow-400" to="/managers" onClick={navHandler}>
              Get Started
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
