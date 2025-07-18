import { Route, Routes } from 'react-router-dom'
import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import {SidebarProvider,SidebarTrigger} from "./components/ui/sidebar.js"


import Landing from "./AppComponents/Landing.jsx"
import Login from './AppComponents/Login.jsx'
import Register from "./AppComponents/Register.jsx"
import Layout from "./AppComponents/Layout.jsx"
import { RouterProvider } from 'react-router-dom'
import DiscussionForum from './AppComponents/DiscussionForm.jsx'
import IndivialCard from './AppComponents/SubComponents/Disussions/IndivialCard.jsx'
import JobPortal from './AppComponents/JobPortal.jsx'
import EventsPage from './AppComponents/Events.jsx'
import FindAlumni from './AppComponents/FindAlumni.jsx'
import Inbox from './AppComponents/Inbox.jsx'
import Profile from './AppComponents/SubComponents/Profile.jsx'
import FundraisingOptions from "./AppComponents/FundRaising.jsx";


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
      <SidebarProvider>
      <div className='h-screen'>
        <RouterProvider router={route} />
      </div>
      </SidebarProvider>
    </>
  )
}

export default App
