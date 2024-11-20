// import { useState } from 'react'
import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from './context/theme';
import './App.css'
import Loader from './components/Loader';

function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL)

  const [themeMode, setThemeMode] = useState('light');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

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
  },[themeMode]);

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          // dispatch(login({ userData }));
          dispatch(login(userData));
          console.log("App userData:", userData);
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the operation
      });
  }, [dispatch]);

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
   ) : <Loader />
   
}

export default App
