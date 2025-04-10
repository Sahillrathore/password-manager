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

  const [userPasses, setUserPasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [passToEdit, setPassToEdit] = useState();

  const passRef = useRef();
  const inputRefs = useRef([]);

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
      <ToastContainer
        autoClose={2000}
      />
      <div className=' pt-0 md:px-12 px-6 w-full overflow-hidden relative '>
        
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