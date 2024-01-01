import React, { useState } from 'react'
import Header from './Header'

const Login = () => {

   const [SignInForm,setSignForm] = useState(false);


   const toggleSignIn = () => {
      setSignForm(!SignInForm);
   }

  return (
    <div>
      <Header/>
      <div className='absolute'>
        <img  src="https://assets.nflxext.com/ffe/siteui/vlv3/c31c3123-3df7-4359-8b8c-475bd2d9925d/15feb590-3d73-45e9-9e4a-2eb334c83921/IN-en-20231225-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="bodyimage"
          />
      </div>
       <form className='absolute w-3/12 h-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
        <h1 className='font-bold text-2xl '>
            
            {!SignInForm ? "Sign Up" : "Sign In"}
            
            </h1>

        {!SignInForm && <input 
        className='p-2 m-4 w-full bg-gray-700'
        type='text'
         placeholder='Email Address' />   } 

        <input 
        className='p-2 m-4 w-full bg-gray-700'
        type='text'
         placeholder='Email Address' />

        <input
        className='p-2 m-4 w-full bg-gray-700' 
        type='text' 
        placeholder='Password' />

        <button className='text-sm p-4 m-4 h-12 bg-red-700 w-full rounded-lg'>
        {!SignInForm ? "Sign In" : "Sign Out"}
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