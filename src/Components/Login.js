import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidateData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase"
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { BG_IMG, USER_PHOTO } from '../utils/constants';

const FRIENDLY_ERRORS = {
  'auth/email-already-in-use': 'That email is already registered. Try signing in instead.',
  'auth/invalid-credential': 'Incorrect email or password.',
  'auth/wrong-password': 'Incorrect email or password.',
  'auth/user-not-found': 'No account found with that email.',
  'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
  'auth/weak-password': 'Password is too weak. Use at least 8 characters.',
  'auth/network-request-failed': 'Network error. Check your connection and try again.',
};

const inputClass =
  'w-full px-4 py-3 rounded-md bg-neutral-800/90 text-white placeholder-gray-400 border border-neutral-700 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition';

const Login = () => {

  const dispatch = useDispatch();

  const [isSignIn, setIsSignIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    const message = checkValidateData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    setLoading(true);

    if (!isSignIn) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) =>
          updateProfile(userCredential.user, {
            displayName: name.current?.value || email.current.value.split('@')[0],
            photoURL: USER_PHOTO,
          })
        )
        .then(() => {
          const { uid, email, displayName, photoURL } = auth.currentUser;
          dispatch(addUser({ uid, email, displayName, photoURL }));
        })
        .catch((error) => {
          setErrorMessage(FRIENDLY_ERRORS[error.code] || error.message);
          setLoading(false);
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .catch((error) => {
          setErrorMessage(FRIENDLY_ERRORS[error.code] || error.message);
          setLoading(false);
        });
    }
  };

  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
    setErrorMessage(null);
  };

  return (
    <div className='relative min-h-screen'>
      <Header />

      {/* background with a dark gradient so the card and text stay readable */}
      <div className='fixed inset-0 -z-10'>
        <img className='h-full w-full object-cover' src={BG_IMG} alt='Movie posters background' />
        <div className='absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90' />
      </div>

      <div className='min-h-screen flex items-center justify-center px-4 pt-24 pb-10'>
        <form
          onSubmit={handleSubmit}
          className='w-full max-w-md bg-black/85 backdrop-blur-md rounded-xl shadow-2xl border border-white/10 px-8 py-10 sm:px-12 text-white'
        >
          <h1 className='font-bold text-3xl'>{isSignIn ? 'Sign In' : 'Sign Up'}</h1>
          <p className='mt-1 mb-6 text-sm text-gray-400'>
            {isSignIn ? 'Welcome back — pick up where you left off.' : 'Create an account to discover movies with AI.'}
          </p>

          <div className='space-y-4'>
            {!isSignIn && (
              <input ref={name} type='text' placeholder='Full Name' autoComplete='name' className={inputClass} />
            )}

            <input ref={email} type='email' placeholder='Email Address' autoComplete='email' className={inputClass} />

            <div className='relative'>
              <input
                ref={password}
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                autoComplete={isSignIn ? 'current-password' : 'new-password'}
                className={inputClass + ' pr-16'}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 hover:text-white'
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>
          </div>

          {!isSignIn && (
            <p className='mt-2 text-xs text-gray-500'>Use 8+ characters with upper-case, lower-case and a number.</p>
          )}

          {errorMessage && (
            <div className='mt-4 rounded-md bg-red-950/70 border border-red-800 px-3 py-2 text-sm text-red-300'>
              {errorMessage}
            </div>
          )}

          <button
            type='submit'
            disabled={loading}
            className='mt-6 w-full h-12 flex items-center justify-center gap-2 rounded-md bg-red-600 hover:bg-red-700 disabled:bg-red-900 disabled:cursor-not-allowed font-semibold transition-colors'
          >
            {loading ? (
              <>
                <span className='h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin' />
                <span>{isSignIn ? 'Signing in…' : 'Creating account…'}</span>
              </>
            ) : isSignIn ? 'Sign In' : 'Sign Up'}
          </button>

          <p className='mt-6 text-gray-400'>
            {isSignIn ? 'New to StreamGPT? ' : 'Already a member? '}
            <span onClick={toggleSignIn} className='text-white font-semibold cursor-pointer hover:underline'>
              {isSignIn ? 'Sign up now' : 'Sign in'}
            </span>
          </p>
        </form>
      </div>
      <p className='absolute bottom-3 w-full text-center text-xs text-gray-400 px-4'>
        StreamGPT is an independent demo project and is not affiliated with Netflix or any streaming service.
      </p>
    </div>
  )
}

export default Login
