import React, { useEffect, useRef, useState } from 'react'
import { db } from "../firebase";
import { collection, addDoc, } from "firebase/firestore";
import CryptoJS, { enc } from 'crypto-js';

import { FaRegEye } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { RxCross1 } from 'react-icons/rx';
import { useUserContext } from '../context/userContex';

const PasswordInputForm = ({ setShowAddPass, showAddPass }) => {

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        site: ""
    });

    const [showPass, setShowPass] = useState(true);

    const { user } = useUserContext();
    const passRef = useRef();
    const inputRefs = useRef([]);

    const encryptData = (data) => {
        const secretKey = import.meta.env.VITE_SECRET_KEY; // Use VITE_ prefix for Vite projects
        if (!secretKey) {
            throw new Error('SECRET_KEY is not defined');
        }
        return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    };

    const btnHandler = () => {
        const randomId = Math.random() * 10000;
        // setUserPasses([...userPasses, {...credentials, id: randomId}]);
        // localStorage.setItem("password", JSON.stringify([...userPasses, credentials]))

        // console.log(userPasses);

        savePassword();
    }

    const savePassword = async () => {

        const uid = user?.uid;
        if (!uid) {
            console.error("User UID is required to save a password.");
            return;
        }

        try {
            // Validate credentials
            if (!credentials.password || !credentials.site || !credentials.username) {
                toast.error('All Fields Are Mandatory!')
                console.error("All fields (site, username, password) are required.");
                return;
            }

            // Encrypt each field individually
            const encryptedSite = encryptData(credentials.site);
            const encryptedUsername = encryptData(credentials.username);
            const encryptedPassword = encryptData(credentials.password);

            // Reference to the user's subcollection in Firestore
            const userPasswordsCollection = collection(db, "passwords", uid, "userPasswords");

            // Add the encrypted data as separate fields in a new document
            await addDoc(userPasswordsCollection, {
                site: encryptedSite,
                username: encryptedUsername,
                password: encryptedPassword,
            });

            console.log("Password saved successfully!");
            toast.success('Password saved successfully!')

            // Clear credentials after saving
            setCredentials({
                username: "",
                password: "",
                site: ""
            })
            setShowAddPass(!showAddPass)

        } catch (error) {
            console.error("Error saving password:", error.message);
        }
    };

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    }

    const RefHandler = () => {

        setShowPass(prev => setShowPass(!prev));

        if (showPass === true) {
            const inp = passRef.current.type = "text";
        }
        else {
            const inp = passRef.current.type = "password";
        }
    }

    const [enter, setEnter] = React.useState(false);

    useEffect(() => {
        if (showAddPass) {
            setEnter(false);
            const id = requestAnimationFrame(() => setEnter(true));
            return () => cancelAnimationFrame(id);
        }
    }, [showAddPass]);

    // Close on ESC
    useEffect(() => {
        if (!showAddPass) return;
        const onKey = (e) => e.key === "Escape" && setShowAddPass(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [showAddPass, setShowAddPass]);

    if (!showAddPass) return null;

    return (
        <div className="pass-form fixed  inset-0 z-[99] flex items-center justify-center p-4">
            <ToastContainer autoClose={2000} />

            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
                onClick={() => setShowAddPass(false)}
            />

            {/* Modal card (slides from top) */}
            <div
                className={[
                    "relative bg-gray-100 z-[999] p-8 rounded-lg border border-gray-500 shadow-xl w-full max-w-md",
                    "transition-all duration-300 ease-out",
                    enter ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0",
                ].join(" ")}
                role="dialog"
                aria-modal="true"
            >
                <button
                    aria-label="Close"
                    className="absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/5"
                    onClick={() => setShowAddPass(false)}
                >
                    <RxCross1 />
                </button>

                <h1 className="text-lg font-semibold text-zinc-800">Add Your Passwords</h1>

                <div className="flex flex-col gap-3 w-full mt-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Site"
                            name="site"
                            value={credentials.site}
                            onChange={changeHandler}
                            className="w-full h-10 rounded-2xl px-4 border border-gray-500 outline-indigo-400"
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={credentials.username}
                            onChange={changeHandler}
                            className="w-full h-10 rounded-2xl px-4 border border-gray-500 outline-indigo-400"
                        />
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={credentials.password}
                            onChange={changeHandler}
                            ref={passRef}
                            className="w-full h-10 rounded-2xl px-4 border border-gray-500 outline-indigo-400 pr-10"
                        />
                        <FaRegEye
                            className="absolute right-3 top-2.5 cursor-pointer"
                            onClick={RefHandler}
                            title="Show/Hide password"
                        />
                    </div>
                </div>

                <button
                    onClick={btnHandler}
                    className="px-5 py-2 mt-4 block bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700"
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default PasswordInputForm