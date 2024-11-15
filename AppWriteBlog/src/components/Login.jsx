import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button , MyInput, Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Loader from './Loader'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state for the loader
    // const [showAlert, setShowAlert] = useState(false); // State to show/hide alert dialog

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // This useEffect will run whenever showAlert changes
    // useEffect(() => {
    //     if (showAlert) {
    //     console.log("showAlert is now true"); // Now you can be sure it's true
    //     }
    // }, [showAlert]);

    const login = async(data) => {
        setLoading(true);
        setError("")
        try {
            const session = await authService.login(data);
            console.log(session);
            if(session){
                const userData = await authService.getCurrentUser()
                if(userData){
                    // console.log(userData);
                    dispatch(authLogin(userData));
                    setLoading(false);
                    navigate('/')
                } 
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            setError(error.message)
        }
    }

  return (
    <>
        {loading && (
            <Loader text="Logging In..." />
        )}
        
        <div className='flex items-center justify-center w-full mt-4 dark:bg-gray-800 text-black dark:text-white  dark:border-gray-700'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 dark:bg-gray-800 text-black dark:text-white  dark:border-gray-700`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline">
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)}    
                className='mt-8'>
                    <div className='space-y-5'>
                        {/* Email Field */}
                        <div className='relative'>
                            <MyInput 
                            label="Email: "
                            placeholder = "Enter your email"
                            type="email"
                            {...register("email", { 
                                required: "Email is required",
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Email must be a valid address"
                                }
                                // required: true,
                                // validate : {
                                //     matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.
                                //     test(value) ||
                                //     "Email address must be a valid address",
                                // }
                            })}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>
                        {/* Password Field */}
                        <div className='relative'>
                            <MyInput 
                            label="Password"
                            placeholder="Enter your password"
                        type={showPassword ? 'text' : 'password'}
                            {...register("password", {
                                //  required: true 
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long",
                                }
                            })}
                            />
                            <span
                                className="absolute top-12 bottom-6 right-3 flex items-center cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>
                        {/* Submit Button */}
                        <Button
                        type='submit'
                        className='w-full'
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default Login
