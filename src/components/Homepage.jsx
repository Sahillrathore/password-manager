import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Banner from '../components/Banner'
import Navbar from '../components/Navbar'
import FeaturesHome from './FeaturesHome'

const Homepage = () => {
  return (
    <div className='bg-[#f3f3f3]'>
        <Navbar/>
        <Hero/>
        {/* <Features/> */}
        <FeaturesHome/>
        <Banner/>
    </div>
  )
}

export default Homepage