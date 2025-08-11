import { Calendar, GanttChartSquareIcon, Home, Inbox, Network, Option, Presentation, Radius, Search, SearchCheckIcon, Settings } from "lucide-react"
import logo from '../assets/undraw_graduation.svg'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useProgress } from '../Contexts/ProgressContext.jsx'
import { createAxiosInstance } from '../axios/axiosInstance';
import React, { useState } from 'react'
import { useEffect } from "react";
import { SidebarFooter } from "../components/ui/sidebar.js";
import { Button } from "@/components/ui/button"
import { useAuthStore } from "../store/useAuthStore.js";

// Menu items.

const iconMap = {
  "Landing Page":Home,
  "Discussion Forms":GanttChartSquareIcon,
  "Mentorship":Presentation,
  "Oppurtunities":Calendar,
  "Network":Network,
  "Inbox":Inbox,
  "Event":Calendar,
  "Find Alumni":SearchCheckIcon,
  "Fund Raising":Radius,
  "Settings":Settings
}

export function AppSidebar() {
  const {user,isAuthenticated} = useAuthStore()
  const [items,setItems] = useState([])
  const { showProgress, hideProgress } = useProgress();
  const axiosInstance = createAxiosInstance(showProgress, hideProgress);

  useEffect(() => {
    axiosInstance.get('api/configuration?name=Sidebar').then((response) => {
      console.log("Response from Sidebar Configuration:", response.data.data);

      const mappedItems = response.data.data
                          .filter(item => {
                            if(item.name === "Settings" && user.role !== "admin") return false;
                            return true
                          })
                          .map((item) => ({
                            title:item.name,
                            url:item.link,
                            icon:iconMap[item.name] || Home
                          }))
      setItems(mappedItems)
    }).catch((error) => {
      console.log("Error fetching sidebar configuration:", error);
    })
  }, []);

    return (
      <Sidebar className="" collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
                <img src={logo} />
            </SidebarGroupLabel>
            <SidebarGroupContent className="mt-15">
              {
                !user.isProfileAvailable ? (<>
                  <SidebarMenu>
                {items.map((item, index) => (
                  <SidebarMenuItem
                    key={item.title}
                    className={index !== 0 ? "mt-4" : ""}
                  >
                    <SidebarMenuButton asChild className="px-6 py-6 hover:bg-blue-300 pointer-events-none" >
                      <a
                        href={item.url}
                        className="flex items-center gap-3 text-lg px-4 py-3 hover:bg-blue-300 pointer-events-auto"
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="text-md">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
                </>): (
                  <>
                    <SidebarMenu>
                      {items.map((item, index) => (
                      <SidebarMenuItem
                        key={item.title}
                        className={index !== 0 ? "mt-4" : ""}
                      >
                        <SidebarMenuButton asChild className="px-6 py-6 hover:bg-blue-300" >
                          <a
                            href={item.url}
                            className="flex items-center gap-3 text-lg px-4 py-3"
                          >
                            <item.icon className="w-5 h-5" />
                            <span className="text-md">{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                  </>
                )
              }
              
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Button variant="destructive">Logout</Button>
        </SidebarFooter>
      </Sidebar>
    )
  }
  