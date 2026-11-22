import React,{useEffect} from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from '../utils/userSlice';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
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
    <div className='absolute px-6 md:px-10 py-3 z-10 w-full flex flex-col md:flex-row items-center justify-between bg-gradient-to-b from-black/90 to-transparent'>
      <h1 className='text-3xl md:text-4xl font-extrabold tracking-tight mx-auto md:mx-0 bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent select-none'>
        StreamGPT
      </h1>
      {user && (
        <div className='flex items-center gap-3 mt-2 md:mt-0'>
          {showGptSearch && (
            <select
              className='bg-gray-900/90 text-white text-sm rounded-md px-3 py-2 ring-1 ring-white/20 outline-none cursor-pointer'
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option value={lang.identifier} key={lang.identifier}>{lang.name}</option>
              ))}
            </select>
          )}
          <button
            onClick={handleGptSearchClick}
            className='bg-purple-600 hover:bg-purple-700 transition-colors px-4 py-2 rounded-md text-white text-sm font-semibold shadow-lg'>
            {showGptSearch ? "Home" : "GPT Search"}
          </button>
          <img
            className='md:block hidden w-10 h-10 rounded-full object-cover ring-2 ring-white/30'
            alt="User avatar"
            src={user.photoURL}
          />
          <button
            onClick={handleSignOut}
            className='bg-red-600 hover:bg-red-700 transition-colors px-4 py-2 rounded-md text-white text-sm font-semibold shadow-lg'>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
