import React from "react";
import NotFoundImage from '../../assets/writer.svg';
import './ErrorPage.scss';
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    // console.log('Error occured', error);
    const navigate = useNavigate();
    const handleReset = () => {
        // window.location.reload();
        navigate('/');   // This will redirect to the home page
    }
    return (
      <div className='error-page'>
        <img src={NotFoundImage} alt='Page not found' />
        <p className='error-msg'>
          Something went wrong. Try clicking the refresh page button to reload the
          application.{' '}
          <button className='btn' onClick={handleReset}>
            Refresh page
          </button>
        </p>
      </div>
    );
  };
  
  export default ErrorPage;