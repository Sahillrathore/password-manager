import React from 'react'
import { NavLink } from 'react-router-dom'

const Banner = () => {
  return (
    <section className='h-fit py-10 w-[95%] rounded-3xl bg-[#16379a] mx-auto my-6 flex items-center gap-12 justify-between px-16'> 
        <div className='text-white flex flex-col gap-5'>
            <h4 className='text-2xl font-mono '>Best Personal Password Manager</h4>
            <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut consequatur iure quam quis molestias. Odio, doloremque dolorem porro quidem ut accusantium voluptatibus natus mollitia asperiores animi placeat earum cumque eos.</p>
            <NavLink
            to='managers' 
            className='rounded-[2rem] w-fit px-6 py-3 border hover:bg-white hover:text-[#16379a] transition-colors hover:font-bold active:scale-95'
            >
            Get Started
            </NavLink>
        </div>

        <img src="https://st.depositphotos.com/1431107/1969/i/450/depositphotos_19696475-stock-photo-secure-lock-emblem.jpg" 
        className='h-44 rounded-full'
        />
    </section>
  )
}

export default Banner