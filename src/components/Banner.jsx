import React from 'react'
import { NavLink } from 'react-router-dom'

const Banner = () => {
  return (
    <section className='h-fit py-10 mx-12 rounded-3xl bg-[#16379a] my-6 flex md:flex-row flex-col-reverse md:items-center items-start md:gap-12 gap-7 justify-between sm:px-16 px-12'> 
        <div className='text-white flex flex-col md:gap-5 gap-3'>
            <h4 className='text-2xl font-mono '>Best Personal Password Manager</h4>
            <p className=''>Securely storing and managing sensitive passwords online</p>
            <NavLink
            to='managers' 
            className='rounded-[2rem] w-fit px-6 py-3 border hover:bg-white hover:text-[#16379a] transition-colors hover:font-bold active:scale-95'
            >
            Get Started
            </NavLink>
        </div>

        <img src="https://st.depositphotos.com/1431107/1969/i/450/depositphotos_19696475-stock-photo-secure-lock-emblem.jpg" 
        className='md:h-40 h-36 rounded-full'
        />
    </section>
  )
}

export default Banner