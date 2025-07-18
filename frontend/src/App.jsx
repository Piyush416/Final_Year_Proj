import { Route, Routes } from 'react-router-dom'
import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Landing from "./Components/Landing"
import Login from './Components/Login'
import Register from "./Components/Register"
import Layout from "./Components/Layout"
import { RouterProvider } from 'react-router-dom'
import DiscussionForum from './Components/DiscussionForm'
import IndivialCard from './Components/SubComponents/Disussions/IndivialCard'
import JobPortal from './Components/JobPortal'
import EventsPage from './Components/Events'
import FindAlumni from './Components/FindAlumni'
import Inbox from './Components/Inbox'
import Profile from './Components/SubComponents/Profile'
import FundraisingOptions from "./Components/FundRaising.jsx";


const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/discussions' element={<DiscussionForum /> } />
      <Route path='/discussions/:id' element={ <IndivialCard /> } />
      <Route path='/opportunities' element={ <JobPortal />} />
      <Route path='/events' element={ <EventsPage />   } />
      <Route path='/findAlumnies' element={<FindAlumni />} />
      <Route path='/inboxs' element={<Inbox />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/fund-raising' element={<FundraisingOptions />} />
     </Route>
  )
)


function App() {

  return (
    <>
      <div className='h-screen'>
        <RouterProvider router={route} />
      </div>
    </>
  )
}

export default App
