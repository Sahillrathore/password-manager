import React from 'react'
import './hero.css'

const Hero = () => {
  return (
    // <section className=''>

    <div className='bg-[#16379a] h-[95vh] text-white flex relative'>

      <div className="hero-text z-20 h-full w-full flex items-center justify-center gap-20">
        <div>
          <h1 className='text-4xl font-bold w-64'>
            Remembering
            Passwords Can
            Be Confusing.
          </h1>
          <p className='text-zinc-100 text-lg mt-4'>We make it easier at Keeper. &nbsp;</p>
        </div>

        <div className="hero-mobile-img">
          <div className="h-72 w-40 rounded-2xl bg-white px-2 py-4 border border-gray-400">
            <div className='bg-gray-100 h-full w-full rounded-sm border border-gray-400 relative'>

              <h3 className='text-xs bg-yellow-400 text-black py-2 text-center font-semibold'>Safe, Sound and Secure</h3>

              <div className='text-[10px] py-2 text-center bg-white'>
              <i className="fa-solid fa-star-of-life text-zinc-900"></i>
              <i className="fa-solid fa-star-of-life text-zinc-900"></i>
              <i className="fa-solid fa-star-of-life text-zinc-900"></i>
              <i className="fa-solid fa-star-of-life text-zinc-900 mr-1"></i>
              <button className='bg-yellow-400 text-black px-[6px] rounded-xl cursor-default hover:bg-transparent border hover:border-yellow-400 transition-colors'>view</button>
              </div>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200">
              <path fill="#020F66" fillRule="evenodd" d="M35 97a18 18 0 0 1 18-18h94a18 18 0 0 1 18 18v15h-4V97a14 14 0 0 0-14-14H53a14 14 0 0 0-14 14v15h-4V97Zm4 61.5v7.5a14 14 0 0 0 14 14h94a14 14 0 0 0 14-14v-7.5h4v7.5a18 18 0 0 1-18 18H53a18 18 0 0 1-18-18v-7.5h4Z" clipRule="evenodd"></path><path fill="#020F66" fillRule="evenodd" d="M100 22c-22.29 0-40 15.88-40 34.83V80h-4V56.83C56 35.2 76.01 18 100 18c23.98 0 44 17.1 44 38.83V80h-4V56.83C140 37.8 122.29 22 100 22ZM44.06 123.12a2 2 0 0 1 2 2v11.36a2 2 0 1 1-4 0v-11.36c0-1.1.9-2 2-2Z" clipRule="evenodd"></path><path fill="#020F66" fillRule="evenodd" d="M56.9 132.36a2 2 0 0 1-1.29 2.51l-10.94 3.51a2 2 0 0 1-1.23-3.8l10.95-3.52a2 2 0 0 1 2.51 1.3Z" clipRule="evenodd"></path><path fill="#020F66" fillRule="evenodd" d="M42.88 134.86a2 2 0 0 1 2.8.45l6.7 9.29a2 2 0 1 1-3.24 2.34l-6.7-9.29a2 2 0 0 1 .44-2.8Z" clipRule="evenodd"></path><path fill="#020F66" fillRule="evenodd" d="M45.21 134.85a2 2 0 0 1 .48 2.79l-6.61 9.29a2 2 0 0 1-3.26-2.32l6.6-9.29a2 2 0 0 1 2.8-.47Z" clipRule="evenodd"></path><path fill="#020F66" fillRule="evenodd" d="M31.31 132.35a2 2 0 0 1 2.52-1.28l10.84 3.5a2 2 0 1 1-1.23 3.81l-10.84-3.5a2 2 0 0 1-1.29-2.53Zm49.71-9.23a2 2 0 0 1 2 2v11.36a2 2 0 1 1-4 0v-11.36c0-1.1.9-2 2-2Z" clipRule="evenodd"></path><path fill="#020F66" fillRule="evenodd" d="M93.76 132.35a2 2 0 0 1-1.29 2.52l-10.84 3.51a2 2 0 1 1-1.23-3.8l10.84-3.51a2 2 0 0 1 2.52 1.28Z" clipRule="evenodd"></path><path fill="#020F66" fillRule="evenodd" d="M79.85 134.86a2 2 0 0 1 2.79.45l6.7 9.29a2 2 0 1 1-3.23 2.34l-6.72-9.29a2 2 0 0 1 .46-2.8Z" clipRule="evenodd"></path><path fill="#020F66" fillRule="evenodd" d="M82.19 134.86a2 2 0 0 1 .45 2.79l-6.71 9.3a2 2 0 0 1-3.25-2.35l6.71-9.3a2 2 0 0 1 2.8-.44Z" clipRule="evenodd"></path><path fill="#020F66" fillRule="evenodd" d="M68.27 132.35a2 2 0 0 1 2.52-1.28l10.84 3.5a2 2 0 1 1-1.23 3.81l-10.84-3.5a2 2 0 0 1-1.29-2.53Zm36.87 13.42c0-1.1.9-2 2-2h21.68a2 2 0 0 1 0 4h-21.68a2 2 0 0 1-2-2Zm36.96 0c0-1.1.9-2 2-2h21.68a2 2 0 0 1 0 4H144.1a2 2 0 0 1-2-2Z" clipRule="evenodd"></path><path fill="#2CDDE9" fillRule="evenodd" d="M15 135.5A25.5 25.5 0 0 1 40.5 110h119a25.5 25.5 0 0 1 0 51h-119A25.5 25.5 0 0 1 15 135.5ZM40.5 114a21.5 21.5 0 0 0 0 43h119a21.5 21.5 0 0 0 0-43h-119Z" clipRule="evenodd"></path>
              </svg>
              <div className="phone-ctrls text-zinc-800 flex justify-between px-3 absolute bottom-0 w-full pb-2">
                <i className="fa-solid fa-house"></i>
                <i className="fa-solid fa-phone"></i>
                <i className="fa-solid fa-bars"></i>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* <i class="fa-solid fa-plus absolute text-[#3155c4] font-bold text-[10rem] left-36"></i> */}
      <div className='w-full absolute bottom-0 left-0 bg-white'>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#16379a" fillOpacity="1" d="M0,288L80,272C160,256,320,224,480,176C640,128,800,64,960,69.3C1120,75,1280,149,1360,186.7L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>

      </div>
    </div>

    // </section>
  )
}

export default Hero