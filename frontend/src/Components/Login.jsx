import React from 'react'
import { BsEye } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa6";
import myimg from "./bk_img.jpg";


const Login = () => {
  return (
    <div className='flex '>

      {/* backgorund image */}
      {/* <div className='absolute border w-full h-full max-h-xl'> */}
      {/* </div> */}
      <img src={myimg} alt="erro" className='absolute w-full h-[50%]'/>

      <div className='relative w-full max-w-xl mt-20  mx-auto py-10 flex justify-center content-center shadow-xl ring-2 ring-gray-100 bg-white rounded-lg '>

        <div className=''>
          {/* first child */}
          <div className="flex flex-col text-center p-5">
            <h1 className='font-medium tracking-wide text-2xl'>Log In to Alumini</h1>
            <p className='text-gray-400 font-light'>Quick & Simple way to Automate your payment</p>
          </div>

          {/* second child form */}
          <form action="">

            <div className='border border-gray-200 flex flex-col py-4 px-3'>
              <label htmlFor="eamil" >EMAIL ADDRESS</label>
              <input type="email" name='email' required placeholder='johndoe@example.com' className='outline-none py-1 w-full' />
            </div>
            <div className='border border-gray-200 flex flex-col py-4 px-2'>
              <label htmlFor="password">Password</label>
              <div className='flex items-center'>
                <input type="Password" name='email' required placeholder='Enter Stong Password ' className='outline-none py-1 w-full' />
                <div>
                  <BsEye />
                </div>
              </div>
            </div>

            <div className='flex items-center justify-between py-5 '>
              <div className='flex - items-center'>
                <input type="checkbox" />
                <Link to="" className='ml-1 text-gray-400 font-light underline' >Remeber Me</Link>
              </div>
              <Link to="" className='text-gray-400 font-light underline'>Forget Password?</Link>
            </div>

            <input type="Submit" value="PROCEED" className='bg-black text-white p-5 text-center w-full' />
          </form>

          {/* Third Child */}
          <span className='block text-center pt-10 pb-5 font-light'>OR USE</span>

          {/* Fourth Child */}
          <div className='flex justify-center  items-center gap-5 p-5'>
            <div className='border-1 p-1 border-gray-200 bg-gray-100'><FcGoogle size={"24px"} /></div>
            <div className='border-1 p-1 border-gray-200 bg-gray-100'><BsApple size={"24px"} /></div>
            <div className='border-1 p-1 border-gray-200 bg-gray-100 '><FaFacebook size={"24px"} color='blue' /></div>
          </div>
        </div>
      </div>



    </div>

  )
}

export default Login
