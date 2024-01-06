import React,{useEffect} from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';



const Header = () => {

  const dispacth = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.GPT.showGptSearch)

  const handleGptSearchClick = () => {
    dispacth(toggleGptSearchView())
  }

  const handleLanguageChange = (e) => {
    dispacth(changeLanguage(e.target.value));
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
      
   const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        
        const {uid,email,displayName,photoURL} = user;
        dispacth(
          addUser({
          uid:uid,
          email:email,
          displayName:displayName,
          photoURL:photoURL
        }))
        navigate("/browse")
      } else {
        navigate("/")
       dispacth(removeUser())
      }
    });    

   return () => unsubscribe();

  },[]) 

  return (
    <div className='absolute px-8 bg-gradient-to-b from-black-500 z-10 w-full flex  flex-col md:flex-row justify-between'>
      <img
        className='w-28 md:mx-0 mx-auto'
        src={LOGO}
        alt="Logo"
      />
      {user && (
        <div className='flex p-2 space-x-2'>
         
         
          {showGptSearch && (<select className='bg-gray-900 text-white'
            onChange={handleLanguageChange}
          >
            {SUPPORTED_LANGUAGES.map((lang) =>(
               <option value={lang.identifier} key={lang.identifier}>{lang.name}
               </option>
                ))}
          </select>)}
          


          <button
           onClick = {handleGptSearchClick}
           className='bg-purple-700 px-4 rounded-md text-white'>
            {(showGptSearch) ? ( "HomePage"): ("GPT Search")}
          </button>
          <img
            className='w-12 h-12 rounded-lg'
            alt="signOutLogo"
            src={user.photoURL}
          />
          <button
            onClick={handleSignOut}
            className='font-sans h-10 text-white bg-red-700 p-1 px-4 my-1 -mx-2 rounded-md text-md'>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
