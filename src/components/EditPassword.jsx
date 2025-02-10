import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this is correctly imported
import { useEffect, useState } from 'react';
import CryptoJS, { enc } from 'crypto-js';
import { RxCross1 } from 'react-icons/rx';
import { toast, ToastContainer } from 'react-toastify';
import { BsEye } from 'react-icons/bs';

const EditPassword = ({ user, passToEdit, setShowEditModal }) => {

    const [error, setError] = useState('');
    const [newCredentials, setNewCredentials] = useState({});
    const [closing, setClosing] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const uid = user.uid;

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

    const encryptData = (data) => {
        const secretKey = import.meta.env.VITE_SECRET_KEY; // Use VITE_ prefix for Vite projects
        if (!secretKey) {
            throw new Error('SECRET_KEY is not defined');
        }
        return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    };

    const updatePassword = async (e) => {

        e.preventDefault();
        const docId = passToEdit;

        const uid = user?.uid;
        if (!uid) {
            console.error("User UID is required to update a password.");
            return;
        }

        try {
            // Validate credentials
            if (!newCredentials.password || !newCredentials.site || !newCredentials.username) {
                console.error("All fields (site, username, password) are required.");
                return;
            }

            // Encrypt the updated fields
            const encryptedSite = encryptData(newCredentials.site);
            const encryptedUsername = encryptData(newCredentials.username);
            const encryptedPassword = encryptData(newCredentials.password);

            // Reference to the user's subcollection in Firestore
            const userPasswordsCollection = doc(db, "passwords", uid, "userPasswords", docId);

            // Get the document to ensure it exists before updating
            const docSnap = await getDoc(userPasswordsCollection);
            if (!docSnap.exists()) {
                console.error("Password document not found.");
                return;
            }

            // Update the document with the new encrypted data
            await updateDoc(userPasswordsCollection, {
                site: encryptedSite,
                username: encryptedUsername,
                password: encryptedPassword,
            });

            console.log("Password updated successfully!");

            // Clear newCredentials after updating
            newCredentials.username = "";
            newCredentials.password = "";
            newCredentials.site = "";

            toast.success('Data updated successfully.');

            setTimeout(() => {
                setShowEditModal(false);
            }, 1500);

        } catch (error) {
            console.error("Error updating password:", error.message);
        }
    };

    const fetchData = async () => {

        const docId = passToEdit;
        // console.log(uid, docId);

        if (!uid || !docId) {
            console.error("Both UID and DocID are required to fetch the data.");
            return null;
        }

        try {
            // Reference to the specific document in Firestore
            const userPasswordDoc = doc(db, "passwords", uid, "userPasswords", docId);

            // Fetch the document snapshot
            const docSnap = await getDoc(userPasswordDoc);

            if (!docSnap.exists()) {
                console.error("Document not found!");
                return null;
            }

            // Decrypt the data fields
            const encryptedData = docSnap.data();
            const decryptedData = {
                site: decryptData(encryptedData.site),
                username: decryptData(encryptedData.username),
                password: decryptData(encryptedData.password),
            };

            setNewCredentials(decryptedData);
            console.log(newCredentials);

        } catch (error) {
            console.error("Error fetching password data:", error.message);
            return null;
        }

    }

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setNewCredentials({ ...newCredentials, [name]: value });
    }

    const handleClose = () => {
        setClosing(true); // Trigger the closing animation
        setTimeout(() => {
            setShowEditModal(false); // Hide the modal after the animation
            setClosing(false); // Reset the state for future opens
        }, 500); // Match the animation duration
    };

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="rounded-lg h-full w-full absolute flex items-center justify-center top-0 z-50">
            <ToastContainer autoClose={1000} />
            <div className={`bg-white border p-5 rounded-lg w-[30rem] -ml-16 drop-animation ${closing ? "modal-close" : "modal-open"}`}>

                <RxCross1 className='float-right cursor-pointer ' onClick={() => { setShowEditModal(false) }} />

                <h2 className="text-2xl font-semibold text-center mb-6">Edit Password</h2>

                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                <form onSubmit={updatePassword}>
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Site</label>
                        <input
                            type="text"
                            name="site"
                            value={newCredentials?.site}
                            onChange={changeHandler}
                            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={newCredentials?.username}
                            onChange={changeHandler}
                            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4 relative">
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type={showPass ? 'text' : 'password'}
                            name="password"
                            value={newCredentials?.password}
                            onChange={changeHandler}
                            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <BsEye className='absolute top-10 right-3 text-lg cursor-pointer' onClick={() => setShowPass(!showPass)} />
                    </div>


                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    // onClick={updatePassword}
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditPassword;