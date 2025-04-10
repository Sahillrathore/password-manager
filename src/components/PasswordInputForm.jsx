import React, { useRef, useState } from 'react'
import { db } from "../firebase";
import { collection, addDoc, } from "firebase/firestore";
import CryptoJS, { enc } from 'crypto-js';

import { FaRegEye } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { RxCross1 } from 'react-icons/rx';
import { useUserContext } from '../context/userContex';

const PasswordInputForm = ({ setShowAddPass , showAddPass}) => {

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

    const decryptData = (ciphertext) => {
        try {
            const secretKey = import.meta.env.VITE_SECRET_KEY;
            if (!secretKey) {
                throw new Error('SECRET_KEY is not defined');
            }

            const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

            if (!decryptedData) {
                throw new Error('Decryption failed or returned empty data');
            }

            return JSON.parse(decryptedData);
        } catch (error) {
            console.error('Error decrypting data:', error.message);
            return null; // Return null or handle the error appropriately
        }
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

    return (
        <div className="pass-form w-full h-full max-h-screen p-2 flex justify-center flex-col items-center fixed z-[999] left-0 top-0">
            <ToastContainer autoClose={2000} />

            {/* <h3 className='text-lg relative font-normal text-zinc-700 my-2 mb-5 pb-1 before:h-[2px] before:w-36 before:bg-blue-700 before:absolute before:bottom-0'>Enter username and password that you want to keep.</h3> */}
            <div className='bg-gray-100 p-8 rounded-lg border border-gray-500 flex flex-col items-center relative'>
                <div className='absolute top-4 right-4 cursor-pointer'
                onClick={()=>setShowAddPass(!showAddPass)}
                >
                    <RxCross1 />
                </div>
                <h1>Add Your Passwords</h1>
                <div className='flex flex-col gap-3 sm:w-fit w-full mt-3 relative'>
                    <div>
                        <input
                            type="text"
                            placeholder='Site'
                            name='site'
                            value={credentials.site}
                            onChange={changeHandler}
                            className='sm:w-96 w-full h-8 rounded-2xl px-4 border border-gray-500 outline-indigo-400'
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder='Username'
                            name='username'
                            value={credentials.username}
                            onChange={changeHandler}
                            className='sm:w-96 w-full h-8 rounded-2xl px-4 border border-gray-500 outline-indigo-400'
                        />
                    </div>

                    <div className='relative sm:w-fit w-full'>
                        <input
                            type="password"
                            placeholder='Password'
                            name='password'
                            value={credentials.password}
                            onChange={changeHandler}
                            ref={passRef}
                            className='sm:w-96 w-full h-8 rounded-2xl px-4 border border-gray-500 outline-indigo-400'
                        />

                        <span>
                            {/* <i className="fa-regular fa-eye absolute right-3 pt-2 cursor-pointer" onClick={RefHandler}></i> */}
                            <FaRegEye className="absolute right-3 top-2 pt- cursor-pointer" onClick={RefHandler} />
                        </span>
                    </div>
                </div>
                <button
                    onClick={btnHandler}
                    className='px-5 py-2 mt-3 block bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700'
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default PasswordInputForm