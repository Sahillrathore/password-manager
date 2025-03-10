import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar';
import { db } from "../firebase";
import { doc, setDoc, collection, addDoc, getDocs, onSnapshot, deleteDoc } from "firebase/firestore";
import { useUserContext } from '../context/userContex';
import CryptoJS, { enc } from 'crypto-js';
import EditPassword from '../components/EditPassword';
import { BiCopy } from 'react-icons/bi';
import { CiEdit } from 'react-icons/ci';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaRegEye } from 'react-icons/fa';
import { RiEdit2Line } from 'react-icons/ri';
import { IoMdCopy } from 'react-icons/io';
import AllPasswords from '../components/AllPasswords';
import { toast, ToastContainer } from 'react-toastify';

const Passmanager = () => {

  const { user } = useUserContext();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    site: ""
  });
  const [userPasses, setUserPasses] = useState([]);
  const [showPass, setShowPass] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [passToEdit, setPassToEdit] = useState();
  const [searchQuery, setSearchQuery] = useState('');

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

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  }

  const btnHandler = () => {
    const randomId = Math.random() * 10000;
    // setUserPasses([...userPasses, {...credentials, id: randomId}]);
    // localStorage.setItem("password", JSON.stringify([...userPasses, credentials]))

    // console.log(userPasses);

    savePassword();
  }
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

  const RefHandler = () => {

    setShowPass(prev => setShowPass(!prev));

    if (showPass === true) {
      const inp = passRef.current.type = "text";
    }
    else {
      const inp = passRef.current.type = "password";
    }
  }

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

      // Clear credentials after saving
      credentials.username = "";
      credentials.password = "";
      credentials.site = "";

    } catch (error) {
      console.error("Error saving password:", error.message);
    }
  };

  useEffect(() => {
    if (!user?.uid) {
      console.error("User UID is required to retrieve passwords.");
      return;
    }

    const uid = user.uid;

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
        setLoading(false);
      },
      (error) => {
        console.error("Error listening to passwords collection:", error.message);
        setLoading(false);
      }
    );

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, [user?.uid]);


  if (loading) {
    return <div className='font-bold text-xl flex items-center justify-center h-screen w-full'>Loading..</div>
  }

  return (
    <>
      <Navbar />
      <div className='py-4 md:px-12 px-6 w-full overflow-hidden relative '>
        <ToastContainer autoClose={1200} />
        <h2 className='font-bold text-3xl underline text-[#16379a] text-center'>SecureVault</h2>

        <div className="pass-form  backdrop-blur-xl p-2 flex justify-center flex-col items-center">

          {/* <h3 className='text-lg relative font-normal text-zinc-700 my-2 mb-5 pb-1 before:h-[2px] before:w-36 before:bg-blue-700 before:absolute before:bottom-0'>Enter username and password that you want to keep.</h3> */}
          <div className='flex flex-col gap-3 sm:w-fit w-full mt-3'>
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
            className='px-5 py-2 mt-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700'
          >
            Save
          </button>
        </div>

        <AllPasswords setPassToEdit={setPassToEdit} setShowEditModal={setShowEditModal} />

        {
          showEditModal &&
          <EditPassword user={user} passToEdit={passToEdit} setShowEditModal={setShowEditModal} />
        }
      </div>
    </>
  )
}

export default Passmanager