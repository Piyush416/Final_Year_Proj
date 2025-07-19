import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useProgress } from "../../Contexts/ProgressContext"
import { createAxiosInstance } from "../../axios/axiosInstance";
import {toast} from "sonner"
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { showProgress, hideProgress } = useProgress();

  const axiosInstance = createAxiosInstance(showProgress, hideProgress);
  

  const onSubmit = (data) => {

    console.log(data.FirstName)

    axiosInstance.post("/api/register",{
      FirstName:data.FirstName,
      LastName:data.LastName,
      EnrollmentNumber:data.EnrollmentNumber,
      mobileNumber:data.mobileNumber,
      primaryEmail:data.primaryEmail,
      secondaryEmail:data.secondaryEmail,
      password:data.password,
      isEmailVerified:false,
      passingYear:data.passingYear,
      role:"user"
    }).then((response) => {
      console.log("Submitted Successfully")
      toast.success("Registration Done Successfully",{
        description:"Email is send to your Primary Email Id for Verification."
      })
      navigate('/login')
      
    }).catch((error) => {
      console.log(error.response.data.data.message)
      toast.error("Something Went Wrong",{
        description:error.response.data.data.message || "Please wait for sometime"
      })
      console.log(error)
    })

  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden">
      <div className="relative z-10 w-full max-w-3xl bg-white shadow-2xl rounded-xl p-8 mt-32">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Create an Alumni Account</h1>
          <p className="text-gray-500 text-sm">Join the community and stay connected</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                {...register("FirstName", { required: "First name is required", maxLength: 20 })}
                placeholder="Nitish"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.FirstName && <p className="text-red-500 text-sm">{errors.FirstName.message}</p>}
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                {...register("LastName", { required: "Last name is required" })}
                placeholder="Prajapati"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.LastName && <p className="text-red-500 text-sm">{errors.LastName.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Number</label>
            <input
              {...register("EnrollmentNumber", { required: "Enrollment number is required" })}
              placeholder="Enter Enrollment Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.EnrollmentNumber && <p className="text-red-500 text-sm">{errors.EnrollmentNumber.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <input
              type="text"
              {...register("mobileNumber", {
                required: "Mobile Number is required",
                maxLength:10
               })}
              placeholder="8007060099"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.mobileNumber && <p className="text-red-500 text-sm">{errors.mobileNumber.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Email Address</label>
            <input
              type="email"
              {...register("primaryEmail", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
              })}
              placeholder="nitishprajapati180@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.primaryEmail && <p className="text-red-500 text-sm">{errors.primaryEmail.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Email Address</label>
            <input
              type="email"
              {...register("secondaryEmail", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
              })}
              placeholder="2203031050410@paruluniversity.ac.in"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.secondaryEmail && <p className="text-red-500 text-sm">{errors.secondaryEmail.message}</p>}
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

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Passing Year</label>

            <select
              name="passingYear"
              {...register("passingYear", {
                required: "Passing Year is required",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue=""
            >
              <option value="" disabled>Select Year</option>
              {Array.from({ length: new Date().getFullYear() + 5 - 2015 + 1 }, (_, i) => {
                const year = 2015 + i;
                return <option key={year} value={year}>{year}</option>;
              })}
            </select>
            {errors.passingYear && (
              <p className="text-red-500 text-sm mt-1">{errors.passingYear.message}</p>
            )}
            </div>


          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <input
              type="checkbox"
              id="terms"
              {...register("terms", { required: "You must accept terms" })}
              className="accent-blue-500"
            />
            <label htmlFor="terms">
              I agree to the <Link className="underline">Terms</Link> & <Link className="underline">Privacy Policy</Link>
            </label>
          </div>
          {errors.terms && <p className="text-red-500 text-sm">{errors.terms.message}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-200"
          >
            Create Account
          </button>
        </form>

        <div className="text-center pt-8 pb-4 text-gray-400">OR</div>

        <div className="flex justify-center gap-4">
          <button className="bg-gray-100 p-2 rounded-full hover:shadow-md transition">
            <FcGoogle size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
