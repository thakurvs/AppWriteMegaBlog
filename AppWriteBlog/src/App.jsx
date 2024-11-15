// import { useState } from 'react'
import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from './context/theme';
import {Atom} from 'react-loading-indicators'
import './App.css'

function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL)

  const [themeMode, setThemeMode] = useState('light');

  const darkTheme = () => {
    console.log("darkTheme");
    setThemeMode('dark');
  }

  const lightTheme = () => {
    console.log("lightTheme");
    setThemeMode('light');
  }

  useEffect(() => {
    document.querySelector('html').classList.remove("light", "dark");
    document.querySelector('html').classList.add(themeMode);
  },[themeMode])

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      authService.getCurrentUser()
        .then((userData) => {
          if (userData) {
            dispatch(login({ userData }));
          } else {
            dispatch(logout());
          }
        })
        .finally(() => {
          setLoading(false); // Set loading to false after the operation
        });
    }, 3000); // 5 seconds delay
  
    return () => clearTimeout(timeout); // Clean up timeout when the component unmounts
  }, [])

  return !loading ? (
    <ThemeProvider value={{themeMode, darkTheme, lightTheme}}>
      <Header />
        <div className="w-full min-h-screen bg-white border dark:bg-gray-800 text-black dark:text-white  dark:border-gray-700">
          {/* <h1>Hi my name is vishal</h1> */}
          {/* <div className='w-full min-h-screen flex flex-wrap content-between max-w-7xl p-2 m-2 bg-gray-100'> */}
            {/* Main Content */}
            {/* <main className="w-full max-w-7xl p-2 m-2 bg-white shadow-md rounded-lg"> */}
              <Outlet />
            {/* </main> */}
          {/* </div> */}
        </div>
      <Footer />
    </ThemeProvider>
   ) : <div className="w-full flex justify-center items-center min-h-screen bg-gray-100 text-brand dark:text-brand-dark ">
        <div className="loader-container text-brand dark:text-brand-dark ">
            <style>{`
              .loader-container {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                background: rgb(0, 0, 0);
                z-index: 50;
              }
              @keyframes spin {
                0% {
                  transform: rotate(0deg);
                }
                100% {
                  transform: rotate(360deg);
                }
              }
            `}</style>
            <Atom
              size='large'
              text='React Loading...'
              textColor='rgb(52 197 229)'
              color="rgb(16 184 221)"   // Adjust this to match your desired color
              visible={true}
              strokeWidth={2}
            />
        </div>
      </div>
   
}

export default App
