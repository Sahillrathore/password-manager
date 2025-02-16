import React, { useEffect, useRef, useState } from 'react'
import { useUserContext } from '../context/userContex';
import { FaRegEye } from 'react-icons/fa';
import { RiEdit2Line } from 'react-icons/ri';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoMdCopy } from 'react-icons/io';
import CryptoJS, { enc } from 'crypto-js';
import { doc, setDoc, collection, addDoc, getDocs, onSnapshot, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

const AllPasswords = ({ setShowEditModal, setPassToEdit }) => {


    const { user } = useUserContext();
    const inputRefs = useRef([]);
    // console.log(user);

    const [loading, setLoading] = useState(false);
    const [userPasses, setUserPasses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // console.log(userPasses,);
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

    const deletePass = async (id) => {
        const cnfrm = confirm("Do You Really Want To Delete This Password?");
        if (cnfrm) {
            try {
                const uid = user?.uid;
                if (!uid) {
                    throw new Error("User UID is required to delete a password.");
                }

                // Reference to the specific password document
                const passwordDocRef = doc(db, "passwords", uid, "userPasswords", id);

                // Delete the document from Firestore
                await deleteDoc(passwordDocRef);

                // Update the state to remove the deleted password locally
                setUserPasses(userPasses.filter(pass => pass.id !== id));

                console.log("Password deleted successfully!");
            } catch (error) {
                console.error("Error deleting password:", error.message);
            }
        }
    };

    const editPassword = async (id) => {
        console.log(id);

        setPassToEdit(id);
        setShowEditModal(true);
    };

    const passViewRefHandler = (index) => {
        const inputField = inputRefs.current[index];
        if (inputField.type === 'password') {
            inputField.type = 'text';
        } else {
            inputField.type = 'password';
        }
    };

    const copyPassword = (index) => {
        const password = inputRefs.current[index]?.value;
        if (password) {
            navigator.clipboard.writeText(password);
            // alert('Password copied to clipboard!');
        }
    }

    useEffect(() => {

        const uid = user?.uid

        if (!user?.uid) {
            console.error("User UID is required to retrieve passwords.");
            return;
        }
        // console.log('sahil');


        // Reference to the user's subcollection
        const userPasswordsCollection = collection(db, "passwords", uid, "userPasswords");

        // Set up a Firestore listener
        const unsubscribe = onSnapshot(
            userPasswordsCollection,
            (snapshot) => {
                const passwords = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setUserPasses(passwords);
                // console.log(userPasses,);

                setLoading(false);
            },
            (error) => {
                console.error("Error listening to passwords collection:", error.message);
                setLoading(false);
            }
        );

        // Cleanup listener on component unmount
        return () => unsubscribe();
    }, [user?.uid,]);

    return (
        <div className="passwords-list py-8">

            {userPasses.length === 0 ?
                // <h2 className='mb-5 text-xl font-semibold ml-[2px]'>Your Passwords Will Appear Here</h2>
                <div className='w-full mt-10'>
                    <img src="/empty.jpg" className='w-[30rem] mx-auto rounded-lg' />
                </div>
                :
                <div className='flex gap-5 items- mb-5 md:flex-row flex-col'>
                    <h2 className=' text-xl font-semibold ml-[2px] text-start'>All Your Passwords</h2>
                    <input type="text" placeholder='Search' className='rounded-full sm:w-48 w-full border border-gray-400 text-gray-700 focus:outline-none bg-white pl-3 py-1 text-sm'
                        onChange={(e) => { setSearchQuery(e.target.value) }}
                    />
                </div>}

            <div className="flex flex-wrap gap-4">
                {userPasses?.filter((data) => decryptData(data?.site)?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
                    .map((pass, i) => (
                        <div
                            key={i}
                            className=" text-black w-80 overflow-hidden rounded-lg backdrop-blur-lg flex items-center justify-center "
                        >
                            <div className="bg-gradient-to-r from-purple-600 overflow-hidden to-purple-800 text-white rounded-xl p-6 w-80 shadow-lg  relative">
                                {/* Circular elements for background */}
                                <div className="absolute -top-8 -left-8 h-24 w-24 bg-purple-400 rounded-full opacity-20"></div>
                                <div className={`absolute -top-4 -right-1 h-16 w-16 bg-purple-300/20 rounded-full opacity-80`}></div>
                                <div className="absolute -bottom-6 left-10 h-32 w-32 bg-purple-400 rounded-full opacity-30"></div>

                                {/* Card Content */}
                                <h1 className="text-xl font-black text-white mb-1">{decryptData(pass?.site)}</h1>
                                <p className="text-base font-bold text-white mb-1 relative z-30">{decryptData(pass?.username)}</p>
                                <input
                                    type="password"
                                    ref={(el) => (inputRefs.current[i] = el)}
                                    value={decryptData(pass.password)}
                                    readOnly
                                    className="w-full bg-transparent border-none outline-none text-start relative z-10"
                                />
                                <div className="password-action-btns flex gap-3 mt-3 justify-">
                                    <button
                                        className="bg-indigo-00 text-black bg-purple-400 border border-purple-600 text-lg px-1 py-1  rounded-lg relative group"
                                        onClick={() => passViewRefHandler(i)}
                                    >
                                        <FaRegEye />
                                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb- text-xs bg-gray-700 text-white py-1 px-2 rounded hidden group-hover:block transition-all duration-300">
                                            View
                                        </span>
                                    </button>
                                    <button
                                        className="text-lg px-1 bg-purple-400 border border-purple-600 text-black rounded-md relative group"
                                        onClick={() => editPassword(pass.id)}
                                    >
                                        <RiEdit2Line />
                                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb- text-xs bg-gray-700 text-white py-1 px-2 rounded hidden group-hover:block transition-all duration-300">
                                            Edit
                                        </span>
                                    </button>
                                    <button
                                        className="text-lg  px-1 bg-purple-400 border border-purple-600 text-black rounded-md relative group"
                                        onClick={() => deletePass(pass.id)}
                                    >
                                        <AiOutlineDelete />
                                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb- text-xs bg-gray-700 text-white py-1 px-2 rounded hidden group-hover:block transition-all duration-300">
                                            Delete
                                        </span>
                                    </button>
                                    <button
                                        className="relative group bg-purple-400 border border-purple-600 p-1 text-black text-xl"
                                        onClick={() => copyPassword(i)}
                                    >
                                        <IoMdCopy />
                                        {/* Tooltip */}
                                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 text-xs bg-gray-700 text-white py-1 px-2 rounded hidden group-hover:block transition-all duration-300">
                                            Copy
                                        </span>
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}
            </div>
        </div>
    )
}

export default AllPasswords