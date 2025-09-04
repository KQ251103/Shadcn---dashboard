"use client"

import * as React from "react"
import {
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"


import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const [user, setUser] = React.useState({ name: "", email: "", avatar: "/avatars/default.jpg" })

  const data = {
    user,
    navMain: [
      {
        title: "General",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          { title: "Perfiles", url: "/dashboard/Perfiles" },
          { title: "Settings", url: "/dashboard/Settings" },
          { title: "Enviado", url: "/dashboard/Enviado" },
          { title: "Correo", url: "/dashboard/Bandeja" },
          { title: "Proyectos", url: "/dashboard/Proyectos" },
          { title: "Anuncios", url: "/dashboard/Anuncios" },
        ],
      },
    ],
  }

  React.useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return

    fetch("http://localhost:5000/api/usuario/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser({...data,avatar: "/avatars/default.jpg"}))
      .catch((err) => console.error("Error al obtener usuario:", err))
  }, [])
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />   
      </SidebarContent>
      <SidebarFooter>
       
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
