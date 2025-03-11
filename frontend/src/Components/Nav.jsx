import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../assets/undraw_graduation.svg'

const NavbarData = [
  {
    "name":"Discuusion Forums",
    "link":"/discussions"
  },
  {
    "name":"Mentorship",
    "link":"mentorship"
  },
  {
    "name":"Opportunities",
    "link":"opportunities"
  },
  {
    "name":"Network",
    "link":"networks"
  },
  {
    "name":"Inbox",
    "link":"inboxs"
  },
  {
   "name":"Event",
   "link":"events"
  },
  {
    "name":"Find Alumni",
    "link":"findAlumnies"
  },
  {
    "name":"Fund Raising",
    "link":"fund-raising"
  }
]

const Nav = () => {
  return (
   <>
     <div className='flex bg-gray-200 justify-between'>
      {/* <ul className='flex  min-w-sm justify-around'>
        <li className='p-2 border bg-gray-600 rounded hover:bg-gray-400 hover:border '><Link to="/" className='text-white hover:text-black'> Home</Link></li>
        <li className='p-2 border bg-gray-600 rounded hover:bg-gray-400 hover:border '><Link to="/login" className='text-white hover:text-black'> Login</Link></li>
        <li className='p-2 border bg-gray-600 rounded hover:bg-gray-400 hover:border '><Link to="/register" className='text-white hover:text-black'> Register</Link></li>
      </ul> */}
      <img src={logo} width='200'  className='px-8 py-8'></img>
      <div className='flex px-8 py-8 gap-2.5'>
        <button className='bg-gray-100 text-black rounded-full py-2 px-8 font-bold'>SIGN UP</button>
        <button className='bg-gray-100 text-black rounded-full py-2 px-8 font-bold'>LOGIN</button>
      </div>
    </div>
    <div className='flex flex-row px-8 py-8 justify-around bg-black'>
      {
        NavbarData.map((index) => (
         <>
             <p className='text-white font-bold hover:bg-amber-800 rounded-full px-2 py-2'><Link to={index.link}>{index.name}</Link></p>
             
         </>
        ))
      }

      
    </div>
   </>
  )
}

export default Nav
