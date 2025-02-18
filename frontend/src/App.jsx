import { Route, Routes } from 'react-router-dom'
import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Landing from "./Components/Landing"
import Login from './Components/Login'
import Register from "./Components/Register"
import Layout from "./Components/Layout"
import { RouterProvider } from 'react-router-dom'
const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
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
