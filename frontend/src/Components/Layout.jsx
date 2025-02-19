import React from 'react'
import Nav from "./Nav"
import Footer from "./Footer"
import { Outlet } from 'react-router-dom'


const Layout = () => {
    return (
        <div>
            <Nav />
            <div className='min-h-full'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout
