"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDays, MoreVertical, Plus, Edit, Trash2, FolderOpen } from "lucide-react"
import { format, isSameDay } from "date-fns"
import { es } from "date-fns/locale"

interface Project {
  id: string
  title: string
  description: string
  status: "pendiente" | "en-progreso" | "completado"
  priority: "baja" | "media" | "alta"
  dueDate: Date
  createdAt: Date
  assignedTo: string
}

const initialProjects: Project[] = [
  {
    id: "1",
    title: "Diseño de Landing Page",
    description: "Crear el diseño responsive para la nueva landing page del producto",
    status: "en-progreso",
    priority: "alta",
    dueDate: new Date(),
    createdAt: new Date(),
    assignedTo: "María García",
  },
  {
    id: "2",
    title: "Integración API de Pagos",
    description: "Implementar la integración con Stripe para procesar pagos",
    status: "pendiente",
    priority: "media",
    dueDate: new Date(Date.now() + 86400000),
    createdAt: new Date(),
    assignedTo: "Carlos López",
  },
  {
    id: "3",
    title: "Testing de Componentes",
    description: "Escribir tests unitarios para los componentes principales",
    status: "completado",
    priority: "baja",
    dueDate: new Date(Date.now() - 86400000),
    createdAt: new Date(),
    assignedTo: "Ana Martínez",
  },
]

export default function ProjectCalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [newProject, setNewProject] = useState<NewProjectForm>({
    title: "",
    description: "",
    status: "pendiente",
    priority: "media",
    dueDate: new Date(),
    assignedTo: "",
  })
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects = showAllProjects
    ? projects
    : selectedDate
      ? projects.filter((project) => isSameDay(project.dueDate, selectedDate))
      : []


      type NewProjectForm = Omit<Project, "id" | "createdAt">;

  const handleAddProject = () => {
    const project: Project = {
      id: Date.now().toString(),
      ...newProject,
      createdAt: new Date(),
    }
    setProjects([...projects, project])
    setNewProject({
      title: "",
      description: "",
      status: "pendiente",
      priority: "media",
      dueDate: new Date(),
      assignedTo: "",
    })
    setIsAddDialogOpen(false)
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setIsEditDialogOpen(true)
  }

  const handleUpdateProject = () => {
    if (!editingProject) return

    setProjects(projects.map((p) => (p.id === editingProject.id ? editingProject : p)))
    setEditingProject(null)
    setIsEditDialogOpen(false)
  }

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter((p) => p.id !== projectId))
  }

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "completado":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "en-progreso":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "pendiente":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  const getPriorityColor = (priority: Project["priority"]) => {
    switch (priority) {
      case "alta":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "media":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200"
      case "baja":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsDetailsDialogOpen(true)
  }

  const handleStatusChange = (newStatus: Project["status"]) => {
    if (!selectedProject) return

    const updatedProject = { ...selectedProject, status: newStatus }
    setProjects(projects.map((p) => (p.id === selectedProject.id ? updatedProject : p)))
    setSelectedProject(updatedProject)
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Calendario - Sidebar fijo en desktop */}
        <div className="xl:w-80 xl:flex-shrink-0">
          <div className="xl:sticky xl:top-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" />
                  Calendario
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  locale={es}
                  className="rounded-md border w-full"
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold">
                {showAllProjects
                  ? "Todos los Proyectos"
                  : selectedDate
                    ? `Proyectos para ${format(selectedDate, "d 'de' MMMM, yyyy", { locale: es })}`
                    : "Selecciona una fecha"}
              </h1>
              <p className="text-muted-foreground">
                {filteredProjects.length} proyecto{filteredProjects.length !== 1 ? "s" : ""} encontrado
                {filteredProjects.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={showAllProjects ? "default" : "outline"}
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="flex items-center gap-2"
              >
                <FolderOpen className="h-4 w-4" />
                {showAllProjects ? "Filtrar por Fecha" : "Todos los Proyectos"}
              </Button>

              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Agregar Proyecto
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Agregar Nuevo Proyecto</DialogTitle>
                    <DialogDescription>Completa los campos para crear un nuevo proyecto.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Título</Label>
                      <Input
                        id="title"
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        placeholder="Nombre del proyecto"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Descripción</Label>
                      <Textarea
                        id="description"
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        placeholder="Describe el proyecto"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="status">Estado</Label>
                        <Select
                          value={newProject.status}
                          onValueChange={(value: Project["status"]) => setNewProject({ ...newProject, status: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pendiente">Pendiente</SelectItem>
                            <SelectItem value="en-progreso">En Progreso</SelectItem>
                            <SelectItem value="completado">Completado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="priority">Prioridad</Label>
                        <Select
                          value={newProject.priority}
                          onValueChange={(value: Project["priority"]) =>
                            setNewProject({ ...newProject, priority: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="baja">Baja</SelectItem>
                            <SelectItem value="media">Media</SelectItem>
                            <SelectItem value="alta">Alta</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="dueDate">Fecha de Vencimiento</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={format(newProject.dueDate, "yyyy-MM-dd")}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            dueDate: new Date(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="assignedTo">Persona Asignada</Label>
                      <Input
                        id="assignedTo"
                        value={newProject.assignedTo}
                        onChange={(e) => setNewProject({ ...newProject, assignedTo: e.target.value })}
                        placeholder="Nombre de la persona asignada"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleAddProject}>
                      Crear Proyecto
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Lista de Proyectos */}
          <div className="space-y-4">
            {filteredProjects.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No hay proyectos</h3>
                  <p className="text-muted-foreground text-center">
                    {showAllProjects ? "No tienes proyectos creados aún." : "No hay proyectos para esta fecha."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleProjectClick(project)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{project.title}</h3>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status === "en-progreso"
                              ? "En Progreso"
                              : project.status === "completado"
                                ? "Completado"
                                : "Pendiente"}
                          </Badge>
                          <Badge variant="outline" className={getPriorityColor(project.priority)}>
                            {project.priority === "alta" ? "Alta" : project.priority === "media" ? "Media" : "Baja"}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{project.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Vence: {format(project.dueDate, "d 'de' MMM, yyyy", { locale: es })}</span>
                          <span>Asignado a: {project.assignedTo}</span>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditProject(project)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteProject(project.id)} className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Dialog de Detalles del Proyecto */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              Detalles del Proyecto
            </DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">{selectedProject.title}</h3>
                <p className="text-muted-foreground">{selectedProject.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Estado Actual</Label>
                  <div className="mt-2">
                    <Badge className={getStatusColor(selectedProject.status)}>
                      {selectedProject.status === "en-progreso"
                        ? "En Progreso"
                        : selectedProject.status === "completado"
                          ? "Completado"
                          : "Pendiente"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Prioridad</Label>
                  <div className="mt-2">
                    <Badge variant="outline" className={getPriorityColor(selectedProject.priority)}>
                      {selectedProject.priority === "alta"
                        ? "Alta"
                        : selectedProject.priority === "media"
                          ? "Media"
                          : "Baja"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Fecha de Vencimiento</Label>
                  <p className="mt-1 text-sm">{format(selectedProject.dueDate, "d 'de' MMMM, yyyy", { locale: es })}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Persona Asignada</Label>
                  <p className="mt-1 text-sm">{selectedProject.assignedTo}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">Cambiar Estado</Label>
                <div className="flex gap-2">
                  <Button
                    variant={selectedProject.status === "pendiente" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleStatusChange("pendiente")}
                  >
                    Pendiente
                  </Button>
                  <Button
                    variant={selectedProject.status === "en-progreso" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleStatusChange("en-progreso")}
                  >
                    En Progreso
                  </Button>
                  <Button
                    variant={selectedProject.status === "completado" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleStatusChange("completado")}
                  >
                    Completado
                  </Button>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsDetailsDialogOpen(false)
                    handleEditProject(selectedProject)
                  }}
                  className="flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Editar Proyecto
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDeleteProject(selectedProject.id)
                    setIsDetailsDialogOpen(false)
                  }}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Eliminar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog de Edición */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Proyecto</DialogTitle>
            <DialogDescription>Modifica los campos del proyecto.</DialogDescription>
          </DialogHeader>
          {editingProject && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Título</Label>
                <Input
                  id="edit-title"
                  value={editingProject.title}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Descripción</Label>
                <Textarea
                  id="edit-description"
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-status">Estado</Label>
                  <Select
                    value={editingProject.status}
                    onValueChange={(value: Project["status"]) =>
                      setEditingProject({ ...editingProject, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pendiente">Pendiente</SelectItem>
                      <SelectItem value="en-progreso">En Progreso</SelectItem>
                      <SelectItem value="completado">Completado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-priority">Prioridad</Label>
                  <Select
                    value={editingProject.priority}
                    onValueChange={(value: Project["priority"]) =>
                      setEditingProject({ ...editingProject, priority: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baja">Baja</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-dueDate">Fecha de Vencimiento</Label>
                <Input
                  id="edit-dueDate"
                  type="date"
                  value={format(editingProject.dueDate, "yyyy-MM-dd")}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      dueDate: new Date(e.target.value),
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-assignedTo">Persona Asignada</Label>
                <Input
                  id="edit-assignedTo"
                  value={editingProject.assignedTo}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      assignedTo: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" onClick={handleUpdateProject}>
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
