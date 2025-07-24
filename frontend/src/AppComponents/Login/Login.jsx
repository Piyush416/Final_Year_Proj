import React, { useState } from 'react';
import { BsEye, BsEyeSlash, BsApple } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useProgress } from "../../Contexts/ProgressContext"
import { createAxiosInstance } from "../../axios/axiosInstance";
import {toast} from "sonner"
import { useAuthStore } from '../../store/useAuthStore';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const {setUser} = useAuthStore();
  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm();

  const {showProgress,hideProgress} = useProgress();

  const axiosInstance = createAxiosInstance(showProgress,hideProgress)

  const onSubmit = (data) => {
    
    axiosInstance.post("/api/login",{
      email:data.email,
      password:data.password
    }).then((response) => {
     console.log(response.data.data.result)

      setUser(response.data.data.result)

      toast.success("LoggedIn Successfully")
      // console.log(response.data.data.result)
      navigate('/dashboard')
      //navigate('/dashboard')
    }).catch((error) => {
      console.log(error)
    })


  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* Form Container */}
      <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Login to Alumni</h1>
          <p className="text-gray-500 text-sm">Connect with your alumni community</p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              {...register("email",{required:"Email is Required"})}
              placeholder="johndoe@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
          </div>

          <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"

              {...register("password", {
                required: "Password is required",
                min: 8,
                max: 16
              })}
              placeholder="Enter Password here"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-blue-500" />
              <span>Remember Me</span>
            </label>

            <Link to="/register" className="underline bg-">Create Your Account</Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-200"
          >
            Proceed
          </button>
          <div className="flex justify-end items-end text-sm text-gray-500">
           

            <Link to="/" className="underline bg-">Forgot Your Account?</Link>
          </div>
        </form>

        <div className="text-center py-4 text-gray-400">OR USE</div>

        {/* Social Logins */}
        <div className="flex justify-center gap-4">
          <button className="bg-gray-100 p-2 rounded-full hover:shadow-md transition">
            <FcGoogle size={24} />
          </button>
        
        </div>
      </div>
    </div>
  );
};

export default Login;
