import React, { useState } from "react";
import Login from "../components/Login"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useUserContext } from "../context/userContex";
import { RxCross1 } from "react-icons/rx";

const SignUp = () => {

    const {user, setUser} = useUserContext();
    const [authMethod, setAuthMethod] = useState('signup');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            console.log("User created:", userCredential.user);
            setSuccess(true);
            setUser(userCredential?.user);
        } catch (err) {
            setError(err.message);
            console.log(err.message);
            
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {/* <RxCross1 className="absolute top-12 right-12 cursor-pointer"/> */}
            <div className="bg-white rounded-lg  h-fit shadow-lg overflow-hidden flex w-3/4 max-w-4xl">
                {/* Left Image Section */}
                <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: `url('/loginbg.png')` }}>
                    {/* Replace the URL with the image source */}
                </div>
                {/* Right Form Section */}
                {
                    authMethod === 'signup' ?
                        <div className="w-full md:w-1/2 p-8 min-h-[595px] max-h-[595px]">
                            <h2 className="text-3xl font-bold text-gray-800 mb-3">Sign in</h2>
                            <p className="text-gray-500 mb-6 text-sm">Create your account in a seconds</p>
                            <form className="flex flex-col gap-3 mt-2">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                                        First Name:
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                        Email Address:
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
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
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                        placeholder="Enter your password"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-purple-600 text-white py-2 rounded-md text-lg hover:bg-purple-700 transition duration-200 mt-12"
                                    onClick={handleSignup}
                                >
                                    Create an account
                                </button>
                            </form>
                            <p className="text-gray-600 text-sm mt-4 text-center">
                                Already a member?{" "}
                                <a className="text-purple-600 hover:underline cursor-pointer"
                                    onClick={() => { setAuthMethod('login') }}
                                >
                                    Login
                                </a>
                            </p>
                        </div>

                        :
                        <Login setAuthMethod={setAuthMethod} authMethod={authMethod} />
                }
            </div>
        </div>
    );
};

export default SignUp;