"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowLeft, User, Briefcase, MessageSquare, Users, Calendar, Edit } from "lucide-react"
import { useState } from "react"

interface PerfilComponentProps {
  onBack: () => void
}

export default function PerfilComponent({ onBack }: PerfilComponentProps) {
  const [userProfile, setUserProfile] = useState({
    name: "María González Sambuceti",
    position: "Gerente de Proyectos",
    department: "Desarrollo de Software",
    email: "maria.gonzalez@empresa.com",
    phone: "+1 234 567 8900",
    joinDate: "Enero 2022",
    avatar: "/professional-woman-avatar.png",
  })

  const [announcements] = useState([
    { id: 1, title: "Nueva política de trabajo remoto", date: "2024-01-15" },
    { id: 2, title: "Reunión mensual de equipo", date: "2024-01-10" },
    { id: 3, title: "Actualización de procedimientos", date: "2024-01-08" },
    { id: 4, title: "Capacitación en nuevas tecnologías", date: "2024-01-05" },
    { id: 5, title: "Evaluación de desempeño Q4", date: "2024-01-03" },
    { id: 6, title: "Cambios en horarios de oficina", date: "2024-01-01" },
    { id: 7, title: "Implementación de nuevas herramientas", date: "2023-12-28" },
  ])

  const [projects] = useState([
    { id: 1, name: "Sistema de Gestión CRM", progress: 85, team: 8, deadline: "2024-02-28" },
    { id: 2, name: "App Mobile Corporativa", progress: 60, team: 5, deadline: "2024-03-15" },
    { id: 3, name: "Migración Base de Datos", progress: 95, team: 3, deadline: "2024-01-30" },
    { id: 4, name: "Portal de Empleados", progress: 40, team: 6, deadline: "2024-04-10" },
    { id: 5, name: "Sistema de Inventario", progress: 75, team: 4, deadline: "2024-03-20" },
    { id: 6, name: "Plataforma E-learning", progress: 30, team: 7, deadline: "2024-05-15" },
  ])

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editForm, setEditForm] = useState(userProfile)

  const handleSaveProfile = () => {
    setUserProfile(editForm)
    setIsEditDialogOpen(false)
  }

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto">
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
          <h1 className="text-2xl font-bold text-foreground">Mi Perfil</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information Card */}
          <Card className="lg:col-span-1">
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={userProfile.avatar || "/placeholder.svg"} alt={userProfile.name} />
                <AvatarFallback className="text-2xl">
                  {userProfile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-[40px]">{userProfile.name}</CardTitle>
              <p className="text-[20px] ">{userProfile.position}</p>
              <Badge variant="secondary" className="mx-auto font-bold p-2 text-[12px] rounded-full">{userProfile.department}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{userProfile.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Desde {userProfile.joinDate}</span>
              </div>
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full mt-4 bg-transparent" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Perfil
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Editar Perfil</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Nombre
                      </Label>
                      <Input
                        id="name"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="position" className="text-right">
                        Cargo
                      </Label>
                      <Input
                        id="position"
                        value={editForm.position}
                        onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="department" className="text-right">
                        Departamento
                      </Label>
                      <Input
                        id="department"
                        value={editForm.department}
                        onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="phone" className="text-right">
                        Teléfono
                      </Label>
                      <Input
                        id="phone"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleSaveProfile}>Guardar</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <Briefcase className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-2xl font-bold">{projects.length}</div>
                  <p className="text-sm text-muted-foreground">Proyectos Activos</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold">{announcements.length}</div>
                  <p className="text-sm text-muted-foreground">Anuncios Publicados</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <div className="text-2xl font-bold">16</div>
                  <p className="text-sm text-muted-foreground">Miembros de Equipo</p>
                </CardContent>
              </Card>
            </div>

            {/* Projects Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5" />
                  <span>Proyectos que Lidero</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-80 overflow-y-auto space-y-4 pr-2">
                  {projects.map((project) => (
                    <div key={project.id} className="border border-border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{project.name}</h4>
                        <Badge variant={project.progress >= 90 ? "default" : "secondary"}>
                          {project.progress}% Completado
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {project.team} miembros
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {project.deadline}
                        </span>
                      </div>
                      <div className="mt-3 bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Announcements Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Mis Anuncios</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-64 overflow-y-auto space-y-3 pr-2">
                  {announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="flex items-center justify-between p-3 border border-border rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium">{announcement.title}</h4>
                        <p className="text-sm text-muted-foreground">{announcement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
