import React from 'react'

const FeaturesHome = () => {

    const data = [
        {
            title: 'Secure every sign-in',
            img: 'https://a.storyblok.com/f/157611/200x156/f37dc60067/stikies-shiled-key-check.png/m/828x0/filters:quality(60):format(avif)',
            desc: 'Store all sign-ins in secure vaults, with the ability to securely share passwords, secrets, and more.',
            link: 'see features',
        },
        {
            title: 'Generate Strong Passwords',
            img: 'https://a.storyblok.com/f/157611/200x156/f4e5193d7f/stikies-lock-organize.png/m/828x0/filters:quality(60):format(avif)',
            desc: 'Our built-in password generator creates strong, unique passwords with a single click, ensuring your online accounts remain secure.',
            link: 'see features'
        },
        {
            title: 'Access Anywhere Securely',
            img: 'https://a.storyblok.com/f/157611/200x156/f37dc60067/stikies-shiled-key-check.png/m/828x0/filters:quality(60):format(avif)',
            desc: 'Enjoy seamless, end-to-end encrypted synchronization across all your devices. Your vault is always within reach.',
            link: 'see features'
        }

    ]

    return (
        <div id="features" className="bg-[#16379a] md:p-12 p-4 rounded-2xl text-white md:mx-12 mx-4 md:px-16 px-2 my-16">
            <h2 className="sm:text-3xl text-2xl font-semibold text-center mb-6">
                Security and productivity wrapped into one
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
                {
                    data.map((item, i) => (

                        < div className="bg-[#2c51ba] hover:bg-[#2b4da9] transition-colors p-6 rounded-3xl shadow-lg text-start flex flex-col gap-5 py-8" key={i}>
                            <h3 className="text-2xl font-medium sm:mb-6 mb-3">{item?.title}</h3>
                            <img
                                src={item?.img}
                                alt="Secure sign-in"
                                className="mx-auto sm:mb-4 w-60"
                            />
                            <p className="text-xl text-gray-300 mt-5">
                                {item?.desc}
                            </p>
                            {/* <a href="#" className="text-blue-200 mt-3 block text-lg">
                                {item?.link}
                            </a> */}
                        </div>
                    ))
                }
            </div>

        </div >
    )
}

export default FeaturesHome