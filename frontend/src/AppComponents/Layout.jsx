import React from 'react'
import Nav from "./Nav"
import Footer from "./Footer"
import { Outlet } from 'react-router-dom'
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar'
import { AppSidebar } from '../hooks/appSidebar'


const Layout = () => {
    return (
        // <div>

        //     <Nav />
        //     <div className='min-h-full'>
        //         <Outlet />
        //     </div>
        //     <Footer />
        // </div>
        <SidebarProvider>
            <AppSidebar />
            <main>
                {/* <SidebarTrigger classname="px-8 py-8 m-8"/> */}
                
                <Outlet />
            </main>
        </SidebarProvider>
    )
}

export default Layout
