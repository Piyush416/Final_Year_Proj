import React from 'react'
import { BsEye } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa6";
import myimg from "./bk_img.jpg";

const Register = () => {
  return (
    <div className='flex pb-20 border'>

      {/* backgorund image */}
      {/* <div className='absolute border w-full h-full max-h-xl'> */}
      {/* </div> */}
      <img src={myimg} alt="erro" className='absolute w-full h-[50%]' />

      <div className='relative w-full max-w-3xl mt-20  mx-auto py-10 flex justify-center content-center shadow-xl ring-2 ring-gray-100 bg-white rounded-lg '>

        <div className='w-[90%]'>
          {/* first child */}
          <div className="flex flex-col text-center p-5">
            <h1 className='font-medium tracking-wide text-2xl'>Sign Up to Alumini</h1>
          </div>

          {/* second child form */}
          <form action="">

            <div className='flex gap-3 my-2'>
              <div className='border border-gray-200 py-4 px-3 w-full'>
                <label htmlFor="fname" >FIRST NAME</label>
                <input type="number" name='fname' required placeholder='John' className='outline-none py-1 w-full' />
              </div>
              <div className='border border-gray-200 py-4 px-3 w-full'>
                <label htmlFor="lname" >LAST NAME</label>
                <input type="number" name='lname' required placeholder='DOE' className='outline-none py-1 w-full' />
              </div>
            </div>
            <div className='border border-gray-200 flex flex-col py-4 px-3 my-2'>
              <label htmlFor="enrol" >ENROLLMENT NUMBER</label>
              <input type="number" name='enrol' required placeholder='Enter Enrollment Number' className='outline-none py-1 w-full' />
            </div>
            <div className='border border-gray-200 flex flex-col py-4 px-3 my-2'>
              <label htmlFor="pass_year" >PASSING YEAR</label>
              <input type="number" name='pass_year' required placeholder='Enter Passing Year' className='outline-none py-1 w-full' />
            </div>
            <div className='border border-gray-200 flex flex-col py-4 px-3 my-2'>
              <label htmlFor="email" >EMAIL ADDRESS</label>
              <input type="number" name='email' required placeholder='Enter Email Address' className='outline-none py-1 w-full' />
            </div>

            <div className='border border-gray-200 flex flex-col py-4 px-2 my-2'>
              <label htmlFor="password">Password</label>
              <div className='flex items-center'>
                <input type="Password" name='email' required placeholder='Enter Stong Password ' className='outline-none py-1 w-full' />
                <div className='hover:cursor-pointer'>
                  <BsEye size={"20px"} />
                </div>
              </div>
            </div>


            <div className='flex items-center justify-between py-5 '>
              <div className='flex items-center'>
                <input type="checkbox" />
                <Link to="" className='ml-1 text-gray-400 font-light underline' >I agree to the Terms of Service and Privacy Policy</Link>
              </div>
            </div>

            <input type="Submit" value="CREATE AN ACCOUNT" className='bg-black text-white p-5 text-center w-full' />
          </form>

          {/* Third Child */}
          <span className='block text-center pt-10 pb-5 font-light'>OR</span>

          {/* Fourth Child */}
          <div className='flex justify-center  items-center gap-5 p-5'>
            <div className='border-1 p-1 border-gray-200 bg-gray-100 hover:cursor-pointer'><FcGoogle size={"24px"} /></div>
            <div className='border-1 p-1 border-gray-200 bg-gray-100 hover:cursor-pointer'><BsApple size={"24px"} /></div>
            <div className='border-1 p-1 border-gray-200 bg-gray-100 hover:cursor-pointer '><FaFacebook size={"24px"} color='blue' /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
