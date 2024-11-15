import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import Loader from '../Loader'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {
  const [loading, setLoading] = useState(false); // Loading state for the loader
  // const [showAlert, setShowAlert] = useState(false); // State to show/hide alert dialog
  const dispatch = useDispatch();
  const navigate  = useNavigate();

  // This useEffect will run whenever showAlert changes
  // useEffect(() => {
  //     if (showAlert) {
  //     console.log("showAlert is now true"); // Now you can be sure it's true
  //     }
  // }, [showAlert]);

  const logoutHandler = () => {
    setLoading(true);
    authService.logout()
    .then((response) => {
      console.log("Logout successful:", response);  // Log the backend response here
      dispatch(logout());
    })
    .catch((error) => {
      console.error("Logout failed:", error);  // Log the backend error here
    })
    .finally(() => {
      setLoading(false); 
      navigate('/login');
    });
  }

  return (
    <>
      {loading && (
       <Loader text="Logging Out..."/>
      )}

      <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100'
      onClick={logoutHandler}>Logout</button>

    </>
  )
}

export default LogoutBtn
