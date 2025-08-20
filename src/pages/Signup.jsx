import React, { useState, useEffect } from "react";
import Login from "../components/Login";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { useUserContext } from "../context/userContex";
import { RxCross1 } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { FaEye } from "react-icons/fa";

const SignUp = () => {

    const { user, setUser } = useUserContext();

    // console.log(user);

    const [authMethod, setAuthMethod] = useState('signup');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [viewPass, setViewPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const login = location.state?.login;
    console.log(login);
    
    const navigate = useNavigate();

    useEffect(()=>{
        if(login === 'login') {
            setAuthMethod('login');
        }
    },[])
    
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
            setLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: formData.displayName || "",
            });

            console.log("User created:", user);

            // Store user info in Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                createdAt: new Date(),
                name: formData.name || "",
            });

            setSuccess(true);
            setUser(user);
            setError(null);
            navigate('/');

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
                default:
                    setError("An unknown error occurred");
            }
            console.error("Firebase Auth Error:", error.message);
            // If Firestore fails, delete the partially created user
            if (auth.currentUser) {
                await auth.currentUser.delete();
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {/* <RxCross1 className="absolute top-12 right-12 cursor-pointer"/> */}
            <div className="bg-white rounded-lg  h-fit shadow-lg overflow-hidden flex sm:w-3/4 max-w-4xl">
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
                            {error && <p className="text-sm text-red-400">{error}</p>}
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
                                        required
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
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                        Create Password:
                                    </label>

                                    <div className="flex items-center relative">
                                        <input
                                            type={ viewPass ? "text" :"password" }
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                            placeholder="Enter your password"
                                            required
                                        />
                                        <FaEye className="absolute right-2 cursor-pointer text-gray-600" 
                                        onClick={()=>setViewPass(!viewPass)}
                                        />
                                    </div>
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
                        <Login setAuthMethod={setAuthMethod} authMethod={authMethod} viewPass={viewPass} setViewPass={setViewPass} />
                }
            </div>
        </div>
    );
};

export default SignUp;