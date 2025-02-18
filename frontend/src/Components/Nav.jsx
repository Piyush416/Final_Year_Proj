import React from 'react'
import {Link} from 'react-router-dom'

const Nav = () => {
  return (
    <div className='flex bg-gray-400 p-1 justify-end'>
      <ul className='flex  min-w-sm justify-around'>
        <li className='p-2 border bg-gray-600 rounded hover:bg-gray-400 hover:border '><Link to="/" className='text-white hover:text-black'> Home</Link></li>
        <li className='p-2 border bg-gray-600 rounded hover:bg-gray-400 hover:border '><Link to="/login" className='text-white hover:text-black'> Login</Link></li>
        <li className='p-2 border bg-gray-600 rounded hover:bg-gray-400 hover:border '><Link to="/register" className='text-white hover:text-black'> Register</Link></li>
      </ul>
    </div>
  )
}

export default Nav
