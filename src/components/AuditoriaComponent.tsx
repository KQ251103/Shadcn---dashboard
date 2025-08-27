"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Activity, Shield, Users, FileText, Search, Filter } from "lucide-react"
import { useState } from "react"

interface AuditoriaComponentProps {
  onBack: () => void
}

export default function AuditoriaComponent({ onBack }: AuditoriaComponentProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const auditActivities = [
    {
      id: 1,
      user: "Juan Pérez",
      action: "Inicio de sesión",
      timestamp: "2024-01-15 09:30:15",
      type: "auth",
      status: "success",
    },
    {
      id: 2,
      user: "María García",
      action: "Creó nuevo usuario",
      timestamp: "2024-01-15 09:25:42",
      type: "user",
      status: "success",
    },
    {
      id: 3,
      user: "Carlos López",
      action: "Modificó proyecto",
      timestamp: "2024-01-15 09:20:18",
      type: "project",
      status: "success",
    },
    {
      id: 4,
      user: "Ana Martín",
      action: "Intento de acceso fallido",
      timestamp: "2024-01-15 09:15:33",
      type: "auth",
      status: "failed",
    },
    {
      id: 5,
      user: "Luis Rodríguez",
      action: "Eliminó anuncio",
      timestamp: "2024-01-15 09:10:27",
      type: "content",
      status: "success",
    },
    {
      id: 6,
      user: "Sofia Hernández",
      action: "Cambió contraseña",
      timestamp: "2024-01-15 09:05:11",
      type: "security",
      status: "success",
    },
    {
      id: 7,
      user: "Diego Torres",
      action: "Exportó datos",
      timestamp: "2024-01-15 09:00:45",
      type: "data",
      status: "success",
    },
    {
      id: 8,
      user: "Elena Ruiz",
      action: "Configuró permisos",
      timestamp: "2024-01-15 08:55:22",
      type: "security",
      status: "success",
    },
  ]

  const stats = [
    { title: "Actividades Hoy", value: "47", icon: Activity, color: "text-blue-600" },
    { title: "Accesos Exitosos", value: "42", icon: Shield, color: "text-green-600" },
    { title: "Usuarios Activos", value: "23", icon: Users, color: "text-purple-600" },
    { title: "Eventos de Seguridad", value: "5", icon: FileText, color: "text-orange-600" },
  ]

  const getStatusBadge = (status: string) => {
    return status === "success" ? (
      <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
        Exitoso
      </Badge>
    ) : (
      <Badge variant="destructive">Fallido</Badge>
    )
  }

  const getTypeBadge = (type: string) => {
    const typeColors = {
      auth: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      user: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      project: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      content: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      security: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      data: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    }

    const typeLabels = {
      auth: "Autenticación",
      user: "Usuario",
      project: "Proyecto",
      content: "Contenido",
      security: "Seguridad",
      data: "Datos",
    }

    return (
      <Badge variant="secondary" className={typeColors[type as keyof typeof typeColors]}>
        {typeLabels[type as keyof typeof typeLabels]}
      </Badge>
    )
  }

  const filteredActivities = auditActivities.filter((activity) => {
    const matchesSearch =
      activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || activity.type === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="border-border text-foreground hover:bg-accent bg-transparent"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Actividad / Registro de Auditoría</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-card-foreground">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros y Búsqueda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por usuario o acción..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="auth">Autenticación</SelectItem>
                  <SelectItem value="user">Usuario</SelectItem>
                  <SelectItem value="project">Proyecto</SelectItem>
                  <SelectItem value="content">Contenido</SelectItem>
                  <SelectItem value="security">Seguridad</SelectItem>
                  <SelectItem value="data">Datos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Registro de Actividades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-y-auto">
              <div className="space-y-4">
                {filteredActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-medium text-card-foreground">{activity.user}</span>
                        {getTypeBadge(activity.type)}
                        {getStatusBadge(activity.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
