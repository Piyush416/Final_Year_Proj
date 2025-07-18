import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
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

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
    return (
      <Sidebar className="">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
                <img src={logo} />
            </SidebarGroupLabel>
            <SidebarGroupContent className="mt-15">
              <SidebarMenu>
                {items.map((item, index) => (
                  <SidebarMenuItem
                    key={item.title}
                    className={index !== 0 ? "mt-3" : ""}
                  >
                    <SidebarMenuButton asChild className="px-4 py-3">
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
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    )
  }
  