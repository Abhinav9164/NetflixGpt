import React, { useEffect } from 'react'
import Browse from './Browse'
import { RouterProvider, createBrowserRouter,} from 'react-router-dom'
import Login from './Login'
import {onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import {auth} from "../utils/firebase"

const Body = () => {

  const dispacth = useDispatch();

  const appRouter = createBrowserRouter([
    {
        path:"/",
        element:<Login/>
    },
    {
        path:"/browse",
        element:<Browse/>
    }
  ])

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
      } else {
       dispacth(removeUser())
      }
    });    

  },[])


  return (
    <div>

   <RouterProvider router={ appRouter} />

    </div>
  )
}

export default Body