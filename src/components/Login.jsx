import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useUserContext } from '../context/userContex';
import { useNavigate } from 'react-router-dom';

const Login = ({ authMethod, setAuthMethod }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const { user, setUser } = useUserContext();

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            setUser(userCredential?.user);
            console.log(user);
            navigate('/')
        } catch (error) {
            switch (error.code) {
                case "auth/email-already-in-use":
                    setError("Email already in use");
                    break;
                case "auth/invalid-email":
                    setError("Invalid email format");
                    break;
                case "auth/weak-password":
                    setError("Password should be at least 6 characters");
                    break;
                case "auth/network-request-failed":
                    setError("Network error. Check your connection.");
                    break;
                case "auth/invalid-credential":
                    setError("Invalid Email or Password.");
                    break;
                default:
                    setError("An unknown error occurred");
            }
            console.error("Firebase Auth Error:", error.message);
        }
    };

    
    return (
        <div className="w-full md:w-1/2 p-8 min-h-[595px] max-h-[595px] ">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Log in</h2>
            <p className="text-gray-500 mb-6 text-sm">Login to your account in seconds</p>

            {error && <p className='text-sm text-red-500'>{error}</p>}
            
            <form className="flex flex-col gap-3 mt-2">

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email Address:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name='email'
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
                        name='password'
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        placeholder="Enter your password"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-2 rounded-md text-lg hover:bg-purple-700 transition duration-200 mt-[9.5rem]"
                    onClick={handleLogin}
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