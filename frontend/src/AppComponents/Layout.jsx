import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AppSidebar } from '../hooks/appSidebar';
import { SidebarProvider } from '../components/ui/sidebar';
import { ProgressProvider } from '../Contexts/ProgressContext.jsx';
import ProgressBar from '../Loaders/ProgressBar.jsx';
import Nav from './Nav.jsx';
import Breadcrumbs from './SubComponents/Breadcrumbs.jsx';
import FloatingChatbot from './ChatBot/FloatingChatBox.jsx';
import { useAuthStore } from '../store/useAuthStore';
import { ChevronRight } from 'lucide-react';
const Layout = () => {
  const location = useLocation();
  
  // Paths where sidebar should be hidden
  const noSidebarRoutes = ['/login', '/register', '/'];
  const shouldHideSidebar = noSidebarRoutes.includes(location.pathname);
  const { user, isAuthenticated, checkAuth } = useAuthStore()
  console.log("User Profile Data Available:", user?.isProfileDataAvailable);
  

  return (
    <ProgressProvider>
      <ProgressBar />
      {!shouldHideSidebar ? (
        <SidebarProvider>
          <div className="flex min-h-screen w-full overflow-hidden">
            <AppSidebar className="flex-shrink-0" />
            {/* <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden bg-gray-50">
              <div className="w-full px-4 sm:px-6 lg:px-8 flex-shrink-0">
                <Nav />
              </div>
              <div className="w-full min-w-0">
                <Outlet />
              </div>
            </main> */}
            <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden bg-gray-50">
              <div className="w-full px-4 sm:px-6 lg:px-8 flex-shrink-0 m-2 rounded-lg bg-white shadow">
                  <Nav />
              </div>
            <div className="w-full px-4">
              {/* {user.isPro} */}
              {
                user.isProfileDataAvailable === false ? (
                  <Link to={"/show-profile"} className="p-4 font-semibold bg-red-100 rounded-3xl flex flex-row justify-start underline">
                    Please complete your profile to access all features.<ChevronRight />
                  </Link>) : (<></>
                  )
              }
            <Breadcrumbs />
            </div>
            <div className="w-full min-w-0">
            <Outlet />
            <FloatingChatbot/>
              </div>
            </main>
          </div>
        </SidebarProvider>
      ) : (
        <div className="min-h-screen w-full bg-gray-50">
          <Outlet />
          {/* <FloatingChatbot /> */}
        </div>
      )}
    </ProgressProvider>
  );
};

export default Layout;
