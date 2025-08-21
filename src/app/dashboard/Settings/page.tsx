"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Users, Activity, Shield } from "lucide-react"
import AuditoriaComponent from "@/components/AuditoriaComponent"
import PerfilComponent from "@/components/PerfilComponent"
import UsuariosComponent from "@/components/UsuariosComponent"
import SeguridadComponent from "@/components/SeguridadComponent"
type ActiveComponent = "dashboard" | "perfil" | "usuarios" | "auditoria" | "seguridad"

export default function Dashboard() {
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>("dashboard")

  const dashboardCards = [
    {
      title: "Mi Perfil",
      description: "Gestiona tu información personal y configuración de cuenta",
      icon: User,
      component: "perfil" as const,
    },
    {
      title: "Gestión de Usuarios / Accesos",
      description: "Administra usuarios, permisos y control de acceso",
      icon: Users,
      component: "usuarios" as const,
    },
    {
      title: "Actividad / Registro de Auditoría",
      description: "Revisa logs de actividad y registros del sistema",
      icon: Activity,
      component: "auditoria" as const,
    },
    {
      title: "Seguridad y Privacidad",
      description: "Configura políticas de seguridad y privacidad",
      icon: Shield,
      component: "seguridad" as const,
    },
  ]

  const handleBackToDashboard = () => {
    setActiveComponent("dashboard")
  }

  if (activeComponent === "perfil") {
    return <PerfilComponent onBack={handleBackToDashboard} />
  }

  if (activeComponent === "usuarios") {
    return <UsuariosComponent onBack={handleBackToDashboard} />
  }

  if (activeComponent === "auditoria") {
    return <AuditoriaComponent onBack={handleBackToDashboard} />
  }

  if (activeComponent === "seguridad") {
    return <SeguridadComponent onBack={handleBackToDashboard} />
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Panel de Control</h1>
          <p className="text-muted-foreground">Gestiona tu plataforma desde el dashboard principal</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {dashboardCards.map((card, index) => {
            const IconComponent = card.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200 bg-card border-border">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-accent">
                      <IconComponent className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <CardTitle className="text-xl text-card-foreground">{card.title}</CardTitle>
                  </div>
                  <CardDescription className="text-muted-foreground">{card.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button className="w-full" variant="default" onClick={() => setActiveComponent(card.component)}>
                    Acceder
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
