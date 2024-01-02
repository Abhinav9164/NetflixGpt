import React,{useEffect} from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from '../utils/userSlice';



const Header = () => {

  const dispacth = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

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
      
    onAuthStateChanged(auth, (user) => {
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

  },[])

  return (
    <div className='absolute px-8 bg-gradient-to-t from-black z-10 w-full flex justify-between '>
      <img
        className='w-44'
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="userphoto"
      />
      {user && (
        <div className='flex p-2 space-x-2 mx-8'>
          <img
            className='w-12 h-12 '
            alt="signOutLogo"
            src={user.photoURL}
          />
          <button
            onClick={handleSignOut}
            className='font-sans h-10 text-white bg-red-700 p-1 px-4 my-1 -mx-2 rounded-md text-sm'>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
