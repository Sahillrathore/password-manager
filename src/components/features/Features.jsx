import React from 'react'

const data = [
    {
        flexD: "flex-row",
        title: "Store Unlimited Passwords",
        para: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam sapiente at similique suscipit nihil unde, soluta voluptatibus aut fugiat perspiciatis sint necessitatibus blanditiis pariatur beatae natus sit excepturi. Cumque, enim!",
        serial: "01.",
        taglines: ["lorem punka droop fk slot onprt", "lorem punka droop fk slot onprt", "lorem punka droop fk slot onprt"]
    },
    {
        flexD: "flex-row-reverse",
        title: "Store Unlimited Passwords",
        para: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam sapiente at similique suscipit nihil unde, soluta voluptatibus aut fugiat perspiciatis sint necessitatibus blanditiis pariatur beatae natus sit excepturi. Cumque, enim!",
        serial: "02.",
        taglines: ["lorem punka droop fk slot onprt", "lorem punka droop fk slot onprt", "lorem punka droop fk slot onprt"]
    },
    {
        flexD: "flex-row",
        title: "Store Unlimited Passwords",
        para: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam sapiente at similique suscipit nihil unde, soluta voluptatibus aut fugiat perspiciatis sint necessitatibus blanditiis pariatur beatae natus sit excepturi. Cumque, enim!",
        serial: "03.",
        taglines: ["lorem punka droop fk slot onprt", "lorem punka droop fk slot onprt", "lorem punka droop fk slot onprt"]
    }

]


const Features = () => {

    return (
        <>

            <h2 className='text-5xl font-bold text-center text-yellow-400 mb-4 mt-10'>Features</h2>
            {
                data.map((item, i) => (
                    <section className={`flex gap-36 ${item.flexD} py-12 justify-center`} key={i}>
                        <div className="left flex justify-end flex-col">
                            <h3 className='text-3xl font-semibold mb-6 text-[#16379a]'>{item.title}</h3>
                            <p className='w-80'>{item.para}</p>
                        </div>

                        <div className="right relative">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" className='absolute right-36 -top-3 z-0'>

                                <path fill="#020F66" fillRule="evenodd" d="M4 31a18 18 0 0 1 18-18h156a18 18 0 0 1 18 18v122.08a18 18 0 0 1-18 18H22a18 18 0 0 1-18-18V31Zm18-14A14 14 0 0 0 8 31v122.08a14 14 0 0 0 14 14h156a14 14 0 0 0 14-14V31a14 14 0 0 0-14-14H22Z" clipRule="evenodd"></path><path fill="#020F66" fillRule="evenodd" d="M82 116.7a2 2 0 0 1 2 2v15.5a2 2 0 0 1-4 0v-15.5a2 2 0 0 1 2-2Zm0-68.81a2 2 0 0 1 2 2v15.5a2 2 0 0 1-4 0V49.9c0-1.1.9-2 2-2Zm-17.43 61.58a2 2 0 0 1 0 2.83l-10.96 10.96a2 2 0 0 1-2.83-2.83l10.96-10.96a2 2 0 0 1 2.83 0Zm48.65-48.65a2 2 0 0 1 0 2.83L102.26 74.6a2 2 0 1 1-2.83-2.83l10.96-10.96a2 2 0 0 1 2.83 0ZM64.57 74.61a2 2 0 0 1-2.83 0L50.78 63.65a2 2 0 0 1 2.83-2.83l10.96 10.96a2 2 0 0 1 0 2.83Zm48.65 48.65a2 2 0 0 1-2.83 0L99.43 112.3a2 2 0 0 1 2.83-2.83l10.96 10.97a2 2 0 0 1 0 2.82ZM126.5 92a2 2 0 0 1-2 2H109a2 2 0 1 1 0-4h15.5a2 2 0 0 1 2 2Zm-70 0a2 2 0 0 1-2 2H39a2 2 0 1 1 0-4h15.5a2 2 0 0 1 2 2Z" clipRule="evenodd"></path><path fill="#020F66" fillRule="evenodd" d="M82 68a24 24 0 1 0 0 48 24 24 0 0 0 0-48ZM54 92a28 28 0 1 1 56 0 28 28 0 0 1-56 0Z" clipRule="evenodd"></path><path fill="#2CDDE9" fillRule="evenodd" d="M82 75a17 17 0 1 0 0 34 17 17 0 0 0 0-34ZM63 92a19 19 0 1 1 38 0 19 19 0 0 1-38 0Z" clipRule="evenodd"></path><path fill="#020F66" fillRule="evenodd" d="M22.54 169.08v7.57a4 4 0 0 0 4 4h18.04a4 4 0 0 0 4-4v-7.57h4v7.57a8 8 0 0 1-8 8H26.54a8 8 0 0 1-8-8v-7.57h4Zm128.88 0v7.57a4 4 0 0 0 4 4h18.04a4 4 0 0 0 4-4v-7.57h4v7.57a8 8 0 0 1-8 8h-18.04a8 8 0 0 1-8-8v-7.57h4ZM179.47 67.3h2.78a3 3 0 0 0 3-3V42.26a3 3 0 0 0-3-3h-2.78v-2h2.78a5 5 0 0 1 5 5V64.3a5 5 0 0 1-5 5h-2.78v-2Zm0 77.52h2.78a3 3 0 0 0 3-3v-22.04a3 3 0 0 0-3-3h-2.78v-2h2.78a5 5 0 0 1 5 5v22.04a5 5 0 0 1-5 5h-2.78v-2Z" clipRule="evenodd"></path><path fill="#2CDDE9" fillRule="evenodd" d="M19.54 37.54a9 9 0 0 1 9-9h142.92a9 9 0 0 1 9 9v109.98a9 9 0 0 1-9 9H28.54a9 9 0 0 1-9-9V37.54Zm9-7a7 7 0 0 0-7 7v109.98a7 7 0 0 0 7 7h142.92a7 7 0 0 0 7-7V37.54a7 7 0 0 0-7-7H28.54Z" clipRule="evenodd"></path><path fill="#2CDDE9" fillRule="evenodd" d="M34 39a3 3 0 0 0-3 3v20.18a1 1 0 1 1-2 0V42a5 5 0 0 1 5-5h91.15a1 1 0 1 1 0 2H34Zm137 79.23a1 1 0 0 1 1 1V143a5 5 0 0 1-5 5H75.6a1 1 0 0 1 0-2H167a3 3 0 0 0 3-3v-23.77a1 1 0 0 1 1-1Z" clipRule="evenodd"></path>
                            </svg>

                            <div className="serial-no text-9xl font-semibold text-end pb-8 text-[#16379a] z-30 relative">
                                {item.serial}
                            </div>
                            <div className="features-taglines text-xl leading-8 font-semibold mt-5">
                                {
                                    item.taglines.map((tagline, i) => (
                                        <li key={i}>{tagline}</li>
                                    ))
                                }
                            </div>
                        </div>
                    </section>
                ))
            }

        </>
    )
}

export default Features