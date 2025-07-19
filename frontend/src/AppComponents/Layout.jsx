// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import { SidebarProvider } from '../components/ui/sidebar'
// import { AppSidebar } from '../hooks/appSidebar'
// import { ProgressProvider } from "../Contexts/ProgressContext.jsx"
// import ProgressBar from "../Loaders/ProgressBar.jsx"

// // const Layout = () => {
// //     return (
// //         <ProgressProvider>
// //             <ProgressBar />
// //             {/* <SidebarProvider> */}
// //                 {/* Use flex container */}
// //                 <div className="flex min-h-screen w-full">
// //                     <AppSidebar />
                    
// //                     {/* Main content grows to fill remaining space */}
// //                     <main className="flex-1 p-4">
// //                         <Outlet />
// //                     </main>
// //                 </div>
// //             {/* </SidebarProvider> */}
// //         </ProgressProvider>
// //     )
// // }

// const Layout = () => {
//     return (
//       <ProgressProvider>
//         <ProgressBar />
//         <div className="flex min-h-screen w-screen overflow-hidden">
//           <AppSidebar className="w-[250px] flex-shrink-0" />
//           <div>
//             {/* Navbar */}
//           </div>
//           <main className="flex-1 overflow-y-auto bg-gray-50">
//             <Outlet />
//           </main>
//         </div>
//       </ProgressProvider>
//     )
//   }
  

// export default Layout
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AppSidebar } from '../hooks/appSidebar';
import { ProgressProvider } from '../Contexts/ProgressContext.jsx';
import ProgressBar from '../Loaders/ProgressBar.jsx';

const Layout = () => {
  const location = useLocation();

  // Paths where sidebar should be hidden
  const noSidebarRoutes = ['/login', '/register','/'];

  const shouldHideSidebar = noSidebarRoutes.includes(location.pathname);

  return (
    <ProgressProvider>
      <ProgressBar />
      <div className="flex min-h-screen w-screen overflow-hidden">
        {!shouldHideSidebar && (
          <AppSidebar className="w-[250px] flex-shrink-0" />
        )}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </ProgressProvider>
  );
};

export default Layout;
