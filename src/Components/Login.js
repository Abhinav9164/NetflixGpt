import React, { useRef, useState } from 'react'
import "../utils/validate"
import Header from './Header'
import { checkValidateData } from '../utils/validate';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../utils/firebase"
import {updateProfile } from "firebase/auth";
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { BG_IMG, USER_PHOTO } from '../utils/constants';






const Login = () => {

  const dispacth = useDispatch();

   const [SignInForm,setSignForm] = useState(false);
   const [errorMessage,setErrorMassage] = useState(null);
   
   const email = useRef(null);
   const password = useRef(null);
   
      const handleButtonClick = () => {
    
        const message = checkValidateData(email.current.value,password.current.value);
        setErrorMassage(message);

        if(message)
        return
//signup
        if(!SignInForm){
          createUserWithEmailAndPassword(
            auth,
             email.current.value,
              password.current.value)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;

                  updateProfile(user, {
                    displayName: "name.current.value",
                    photoURL: USER_PHOTO,
                  }).then(() => {
                    const {uid,email,displayName,photoURL} = auth.currentUser;
                        dispacth(
                          addUser({
                          uid:uid,
                          email:email,
                          displayName:displayName,
                          photoURL:photoURL
                        }))
            }).catch((error) => {
              setErrorMassage(error.message)
            });
                

          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMassage(errorCode +"-"+ errorMessage)
            
          });
        

        }
        else{
          
          signInWithEmailAndPassword(auth, email.current.value,password.current.value)
            .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMassage(errorCode  + "-" + errorMessage)
            });

        }
        
      }

        const toggleSignIn = () => {
            setSignForm(!SignInForm);
        }

  return (
    <div>
      <Header/>
      <div className='absolute '>
        <img  
        className='md:w-screen h-screen object-cover'
        src={BG_IMG}
          alt="bodyimage"
          />
      </div>
       <form 
       onSubmit={(e) => e.preventDefault()}
       className='absolute w-full md:w-3/12 h-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-90'>
        <h1 className='font-bold text-2xl '>
            
            {!SignInForm ? "Sign Up" : "Sign In"}
            
            </h1>

        {!SignInForm && <input 
        className='p-2 m-4 w-full bg-gray-700'
        type='text'
         placeholder='Full Name' />   } 

        <input 
        ref={email}
        className='p-2 m-4 w-full bg-gray-700'
        type='text'
         placeholder='Email Address' />

        <input
        ref={password}
        className='p-2 m-4 w-full bg-gray-700' 
        type='password' 
        placeholder='Password' />
        
        <p className='text-red-700 font-bold'>{errorMessage}</p>

        <button 
        onClick={handleButtonClick}
        className='text-sm p-4 m-4 h-12 bg-red-700 w-full rounded-lg'>
        {!SignInForm ? "Sign UP" : "Sign IN"}
        </button>

        <p
         className='font-bold py-4 cursor-pointer'
         onClick={toggleSignIn}
         >
            {SignInForm ? "New to NetflixGPT SignUp Now" : "Already a Member!! Sign In"}
        </p>
       </form>
    </div>
  )
}

export default Login