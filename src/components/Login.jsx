import React from 'react'

const Login = ({ authMethod, setAuthMethod }) => {
    return (
        <div className="w-full md:w-1/2 p-8 min-h-[595px] max-h-[595px] ">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Log in</h2>
            <p className="text-gray-500 mb-6 text-sm">Login to your account in seconds</p>
            <form className="flex flex-col gap-3 mt-2">

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email Address:
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Create Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        placeholder="Enter your password"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-2 rounded-md text-lg hover:bg-purple-700 transition duration-200 mt-[9.5rem]"
                >
                    Login
                </button>
            </form>
            <p className="text-gray-600 text-sm mt-4 text-center">
                Don't have an account?{" "}
                <a className="text-purple-600 hover:underline cursor-pointer"
                    onClick={() => { setAuthMethod('signup') }}
                >
                    Signup
                </a>
            </p>
        </div>
    )
}

export default Login