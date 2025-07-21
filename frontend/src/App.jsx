import { Route, Routes } from 'react-router-dom'
import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import {SidebarProvider,SidebarTrigger} from "./components/ui/sidebar.js"
import { Toaster } from "@/components/ui/sonner"

import Landing from "./AppComponents/Landing.jsx"
import Login from './AppComponents/Login/Login.jsx'
import Register from "./AppComponents/Registration/Register.jsx"
import Layout from "./AppComponents/Layout.jsx"
import { RouterProvider } from 'react-router-dom'
import DiscussionForum from './AppComponents/DiscussonForms/DiscussionForm.jsx'
import IndivialCard from './AppComponents/DiscussonForms/SubComponents/Disussions/IndivialCard.jsx'
import JobPortal from './AppComponents/JobPortal.jsx'
import EventsPage from './AppComponents/Events/Events.jsx'
import FindAlumni from './AppComponents/FindAlumni/FindAlumni.jsx'
import Inbox from './AppComponents/Inbox/Inbox.jsx'
import Profile from './AppComponents/SubComponents/Profile.jsx'
import FundraisingOptions from "./AppComponents/FundRaisings/FundRaising.jsx";
import { ProgressProvider } from "./Contexts/ProgressContext.jsx"
import ProgressBar from "./Loaders/ProgressBar.jsx"
import Dashboard from './AppComponents/Dashboard/Dashboard.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import CreateDiscussion from './AppComponents/DiscussonForms/SubComponents/Disussions/CreateDisussions.jsx'


const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<ProtectedRoute> <Dashboard/> </ProtectedRoute>} />
      <Route path='/discussions' element={ <ProtectedRoute>  <DiscussionForum /> </ProtectedRoute> } />
      <Route path='/discussions/:id' element={<ProtectedRoute> <IndivialCard />  </ProtectedRoute>} />
      <Route path='/opportunities' element={<ProtectedRoute> <JobPortal /> </ProtectedRoute>} />
      <Route path='/events' element={ <ProtectedRoute> <EventsPage /> </ProtectedRoute>  } />
      <Route path='/findAlumnies' element={<ProtectedRoute> <FindAlumni /> </ProtectedRoute>} />
      <Route path='/inboxs' element={<ProtectedRoute><Inbox /></ProtectedRoute>} />
      <Route path='/profile' element={<ProtectedRoute><Profile /> </ProtectedRoute>} />
      <Route path='/fund-raising' element={<ProtectedRoute> <FundraisingOptions /> </ProtectedRoute>} />
      <Route path='/discussions/create-discussion' element={<ProtectedRoute> <CreateDiscussion /> </ProtectedRoute>} />
     </Route>
  )
)


function App() {

  return (
    <>
     {/* <ProgressProvider>
      <ProgressBar /> */}
       
             <div className='h-screen'>
              <RouterProvider router={route} />
              <Toaster position="top-center" richColors/>
              </div>
      
      {/* </ProgressProvider> */}
    </>
  )
}

export default App
