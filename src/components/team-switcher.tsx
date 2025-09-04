"use client"
import { MoreVertical, LogOut } from "lucide-react"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ModeToggle } from "./mode-toggle"
import { useRouter } from "next/navigation"

export function TeamSwitcher({
  user = { name: "Kevin", email: "mccc@exampleeeeee.com" },
}: {
  user?: {
    name: string
    email: string
  }
}) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }
  const router = useRouter()
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token")
      if (token) {
        await fetch("http://localhost:5000/api/usuario/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
      }
    } catch (error) {
      console.error("Error en logout:", error)
    } finally {
      // Limpio token del localStorage
      localStorage.removeItem("token")
      // Redirijo al login
      router.push("/")
    }
  }

  return (
    <div className="w-full mt-2">
      <div className="w-full flex justify-between items-center ">
        <div className="flex items-center">
          <Avatar className="size-8 border-2 ml-2 border-black">
            <AvatarFallback className="text-md font-extrabold">{getInitials(user.name)}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col flex-1 text-left text-sm leading-tight ml-2">
            <span className="truncate font-medium">{user.name}</span>
            <span className="truncate text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>

        <div className="flex   justify-end items-center ">
          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-auto p-1">
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 rounded-lg" align="end" side="bottom" sideOffset={4}>
              <DropdownMenuItem className="gap-2 p-2 text-red-600 focus:text-red-600" onClick={handleLogout}>
                <LogOut className="size-4" />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
