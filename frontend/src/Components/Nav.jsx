import { Link } from 'react-router-dom'
import logo from '../assets/undraw_graduation.svg'

const NavbarData = [
  { name: "Discussion Forums", link: "/discussions" },
  { name: "Mentorship", link: "/mentorship" },
  { name: "Opportunities", link: "/opportunities" },
  { name: "Network", link: "/networks" },
  { name: "Inbox", link: "/inboxs" },
  { name: "Event", link: "/events" },
  { name: "Find Alumni", link: "/findAlumnies" },
  { name: "Fund Raising", link: "/fund-raising" }
]

const Nav = () => {
  return (
    <>
      <div className='flex bg-gray-200 justify-between items-center'>
        <img src={logo} width='200' className='px-8 py-8' alt='Logo' />
        <div className='flex p-8 gap-2.5 items-center'>
          <Link to="/" className='bg-gray-100 text-black rounded-full py-2 px-8 font-bold hover:underline'>Home</Link>
          <Link to="/register" className='bg-gray-100 text-black rounded-full py-2 px-8 font-bold hover:underline'>SIGN UP</Link>
          <Link to="/login" className='bg-gray-100 text-black rounded-full py-2 px-8 font-bold hover:underline'>LOGIN</Link>
        </div>
      </div>

      <div className='flex flex-row px-8 py-4 justify-around bg-black'>
        {
          NavbarData.map((item, index) => (
            <p key={index} className='text-white font-bold hover:bg-amber-800 rounded-full px-4 py-2'>
              <Link to={item.link}>{item.name}</Link>
            </p>
          ))
        }
      </div>
    </>
  )
}

export default Nav