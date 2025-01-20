import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar';

const Passmanager = () => {

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [userPasses, setUserPasses] = useState([]);
  const [showPass, setShowPass] = useState(true);
  const [passHidden, setPassHidden] = useState(true);

  const passRef = useRef();
  const passViewRef = useRef();

  useEffect(()=>{
    const userPass = localStorage.getItem("password");
    if(userPass) {
      setUserPasses(JSON.parse(userPass))
    }
  },[])

  const changeHandler = (e) => {
    const {name, value} = e.target;
    setCredentials({...credentials, [name]:value});
  }

  const btnHandler = () => {
    const randomId = Math.random()*10000;
    setUserPasses([...userPasses, {...credentials, id: randomId}]);
    localStorage.setItem("password", JSON.stringify([...userPasses, credentials]))
    
    credentials.username = "";
    credentials.password = "";
    // console.log(userPasses);
  }
  const deletePass = (id) => { 
    let cnfrm = confirm("Do You Really Want To Delete This Password?")
    if(cnfrm) {
      setUserPasses(userPasses.filter(pass => pass.id != id));
      localStorage.setItem("password", JSON.stringify(userPasses.filter(pass => pass.id != id)))
    }
   }

   const editPass = (id) => { 
    // console.log(id);
    setCredentials(userPasses.filter(pass => pass.id === id)[0]);
    setUserPasses(userPasses.filter(pass => pass.id != id));
    // localStorage.setItem("password", JSON.stringify(userPasses.filter(pass => pass.id != id)))
   }

  const RefHandler = () => {

    setShowPass(prev => setShowPass(!prev));

    if(showPass === true) {
      const inp = passRef.current.type = "text";
    }
    else {
      const inp = passRef.current.type = "password";
    }
  }

  const passViewRefHandler = (e) => {
    // const viewPass = passViewRef
    // console.log(viewPass);
    // console.log(i);
    // ref={passViewRef}

    let sibling = e.target.previousElementSibling;
    // console.log(sibling.type);

    if (sibling.type === "password") {
      sibling.type = "text"
    }
    else {
      sibling.type = "password"
    }
  }

  return (
    <>
    <Navbar/>
    <div className='py-4 px-6'>
      <h2 className='font-bold text-3xl underline text-[#16379a] text-center'>SecureVault</h2>

      <div className="pass-form  backdrop-blur-xl p-2 flex justify-center flex-col items-center">

        <h3 className='text-lg relative font-normal text-zinc-700 my-2 mb-5 pb-1 before:h-[2px] before:w-36 before:bg-blue-700 before:absolute before:bottom-0'>Enter username and password that you want to keep.</h3>
        <div className='flex flex-col gap-3 sm:w-fit w-full'>
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
              <i className="fa-regular fa-eye absolute right-3 pt-2 cursor-pointer" onClick={RefHandler}></i>
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
      
      <div className="passwords-list py-8">

        {userPasses.length === 0 ? <h2 className='mb-5 text-xl font-semibold ml-[2px]'>Your Passwords Will Appear Here</h2>
        : <h2 className='mb-5 text-xl font-semibold ml-[2px]'>All Your Passwords</h2>}
        
        <div className='flex flex-wrap gap-4'>
          {
            userPasses.map((pass, i)=>(
              <div key={i}
              className='border border-gray-500 text-black w-fit p-4 rounded-lg bg-yellow-300 backdrop-blur-lg'
              >
                <div className='flex flex-col'>
                  <span>Username : <span>{pass.username}</span></span>
                  <span className=''>
                    Password : <input type="password"  value={pass.password} readOnly className='w-36 bg-transparent border-none outline-none indent-1'/>
                    <button
                    className='bg-indigo-600 text-white text-xs px-2 py-1 hover:bg-indigo-500 rounded-lg'
                    onClick={passViewRefHandler}
                    >View</button>
                  </span>
                </div>

                <div className="password-action-btns flex gap-2 mt-3">
                <button
                className='text-xs px-2 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md'
                onClick={()=>{editPass(pass.id)}}
                >Edit</button>
                <button
                className='text-xs px-2 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md'
                onClick={()=>{deletePass(pass.id)}}
                >Del</button>
                </div>

              </div>
            ))
          }
        </div>
      </div>
    </div>
    </>
  )
}

export default Passmanager