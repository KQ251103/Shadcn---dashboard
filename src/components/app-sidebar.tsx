"use client"

import * as React from "react"
import {

  GalleryVerticalEnd,
 

  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"

import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "mccc@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Panel",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
      url: "/dashboard",
    }
  ],
  navMain: [
    {
      title: "General",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Perfiles",
          url: "/dashboard/Perfiles",
        },
        
        {
          title: "Settings",
           url: "/dashboard/Settings",
        },

         {
          title: "Enviado",
          url: "#",
        },
        {
          title: "Correo",
          url: "/dashboard/Bandeja",
        },
        {
          title: "Proyectos",
          url: "/dashboard/Proyectos",
        },
        {
          title: "Anuncios",
          url: "/dashboard/Anuncios",
        },


      ],
    },
    

    
  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
