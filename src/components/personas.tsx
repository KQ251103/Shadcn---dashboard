"use client"
import type React from "react"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Calendar, Briefcase, Star, Plus, X, Search, Edit } from "lucide-react"


interface Person {
  _id: string 
  name: string
  role: string
  department: string
  avatar: string
  email: string
  phone: string
  location: string
  joinDate: string
  bio: string
  skills: string[]
  rating: number
  projects: number
}


const departments = [
  "Tecnología",
  "Diseño",
  "Producto",
  "Analytics",
  "Infraestructura",
  "Marketing",
  "Calidad",
  "Recursos Humanos",
  "Ventas",
  "Seguridad",
]

//datos del localStorage
const usuarioGuardado = JSON.parse(localStorage.getItem("usuario") || "{}");

export default function Dashboard() {
  const [personas, setPersonas] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPerson, setNewPerson] = useState({
    name: "",
    role: "",
    department: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    skills: "",
    rating: 5,
    projects: 0,
    usuarioId: usuarioGuardado.id || ""
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingPerson, setEditingPerson] = useState<Person | null>(null)
  const [editFormData, setEditFormData] = useState({
    name: "",
    role: "",
    department: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    skills: "",
    rating: 5,
    projects: 0,
  })
  const [showEditOption, setShowEditOption] = useState<Person | null>(null)
  
  const openModal = (person: Person) => {
    setSelectedPerson(person)
  }

  const closeModal = () => {
    setSelectedPerson(null)
  }

  const openAddModal = () => {
    setNewPerson(prev => ({
    ...prev,
    name: usuarioGuardado.name || "",
    email: usuarioGuardado.email || "",
    usuarioId: usuarioGuardado.id || ""
  }));
  setShowAddModal(true);
  }

  const closeAddModal = () => {
    setShowAddModal(false)
    setNewPerson({
      name: "",
      role: "",
      department: "",
      email: "",
      phone: "",
      location: "",
      bio: "",
      skills: "",
      rating: 5,
      projects: 0,
      usuarioId: usuarioGuardado.id || ""
    })
  }

  const handleInputChange = (field: string, value: string | number) => {
    setNewPerson((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const skillsArray = newPerson.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0)

    const personToAdd = {
      usuario: newPerson.usuarioId,
      name: newPerson.name,
      email: newPerson.email,
      role: newPerson.role,
      department: newPerson.department,
      avatar: "/placeholder.svg?height=120&width=120",
      phone: newPerson.phone,
      location: newPerson.location,
      joinDate: new Date().toISOString().split("T")[0],
      bio: newPerson.bio,
      skills: skillsArray,
      rating: newPerson.rating,
      projects: newPerson.projects,
    }
    

    try {
      const response = await fetch("http://localhost:5000/api/personas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(personToAdd),
      })
      if (!response.ok) {
        throw new Error("Error al agregar el perfil")
      }
      const responseData  = await response.json()
      const person = responseData.person
      setPersonas((prev) => [...prev, person])
      setShowEditOption(person)
      closeAddModal()
    } catch (error) {
      console.error("Error adding person:", error)
      alert("Hubo un error al agregar el perfil. Por favor, inténtalo de nuevo.")
    }

  }

  const handleDeletePerson = async (id: string) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este perfil? Esta acción no se puede deshacer.")) {
      return
    }
    
    try {
      const response = await fetch(`http://localhost:5000/api/personas/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Error al eliminar el perfil")
      }
      setPersonas((prev) => prev.filter((person) => person._id !== id))
      alert("Perfil eliminado correctamente");
    } catch (error) {
      console.error("Error deleting person:", error)
      alert("Hubo un error al eliminar el perfil. Por favor, inténtalo de nuevo.")
    }
  }

  const handleEditPerson = (person: Person) => {
    setEditingPerson(person)
    setEditFormData({
      name: person.name,
      role: person.role,
      department: person.department,
      email: person.email,
      phone: person.phone,
      location: person.location,
      bio: person.bio,
      skills: person.skills.join(", "),
      rating: person.rating,
      projects: person.projects,
    })
    setShowEditModal(true)
  }

  const closeEditModal = () => {
    setShowEditModal(false)
    setEditingPerson(null)
    setEditFormData({
      name: "",
      role: "",
      department: "",
      email: "",
      phone: "",
      location: "",
      bio: "",
      skills: "",
      rating: 5,
      projects: 0,
    })
    setShowEditOption(null)
  }

  const handleEditInputChange = (field: string, value: string | number) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingPerson|| !editingPerson._id) return
    const skillsArray = editFormData.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0)
    
    const updatedPersonData : Person = {
      ...editingPerson,
      name: editFormData.name,
      role: editFormData.role,
      department: editFormData.department,
      email: editFormData.email,
      phone: editFormData.phone,
      location: editFormData.location,
      bio: editFormData.bio,
      skills: skillsArray,
      rating: editFormData.rating,
      projects: editFormData.projects,
      _id: editingPerson._id,
      avatar: editingPerson.avatar || "/placeholder.svg?height=120&width=120",
      joinDate: editingPerson.joinDate || new Date().toISOString().split("T")[0],
    }
    try {
      const response = await fetch(`http://localhost:5000/api/personas/${editingPerson._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPersonData ),
      })
      if (!response.ok) {
        throw new Error("Error al editar el perfil")
      }
      const { person: updatedPerson } = await response.json()
      setPersonas((prev) =>
        prev.map((person) => (person._id === updatedPerson._id ? updatedPerson : person))
      )
      console.log("Persona seleccionada para editar:", personas)
      closeEditModal()
    } catch (error) {
      console.error("Error editing person:", error)
      alert("Hubo un error al editar el perfil. Por favor, inténtalo de nuevo.")
    }
  }

  useEffect(() => {
  const fetchSearchResults = async () => {
    if (searchTerm.trim() === "") {
      // si está vacío, carga todos
      const res = await fetch("http://localhost:5000/api/personas")
      const data = await res.json()
      const usuario = localStorage.getItem("usuario");
      console.log(usuario)
      setPersonas(data)
    } else {
      const response = await fetch(`http://localhost:5000/api/personas/search?query=${searchTerm}`)
      const data = await response.json()
      setPersonas(data)
    }
  }
  fetchSearchResults()
}, [searchTerm])


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard de Equipo</h1>
              <p className="text-gray-600">Conoce a los miembros de nuestro equipo</p>
            </div>
            <Button onClick={openAddModal} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Agregar Perfil
            </Button>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Buscar por nombre, cargo, departamento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {personas.map((personas,index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative"
            >
              <Button
                onClick={() => handleDeletePerson(personas._id)}
                variant="ghost"
                size="sm" 
                className="absolute top-2 right-2 z-10 h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
              >
                <X className="w-4 h-4" />
              </Button>
              <Button
                key={personas._id}
                onClick={() => handleEditPerson(personas)}
                variant="ghost"
                size="sm"
                className="absolute top-2 right-10 z-10 h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
              >
                <Edit className="w-4 h-4" />
              </Button>

              <CardHeader className="text-center pb-6">
                <Avatar className="w-28 h-28 mx-auto mb-6">
                  <AvatarImage src={personas.avatar || "/placeholder.svg"} alt={personas.name} />
                  <AvatarFallback className="text-2xl">
                    {personas.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{personas.name}</h3>
                <p className="text-lg text-gray-600 mb-3">{personas.role}</p>
                <Badge variant="secondary" className="w-fit mx-auto text-sm px-3 py-1">
                  {personas.department}
                </Badge>
              </CardHeader>
              <CardContent className="text-center px-6 pb-6">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-semibold">{personas.rating}</span>
                  <span className="text-gray-500">({personas.projects} proyectos)</span>
                </div>
                <Button onClick={() => openModal(personas)} className="w-full py-3 text-lg">
                  Ver más información
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {personas.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No se encontraron perfiles que coincidan con "{searchTerm}"</p>
          </div>
        )}

        {/* Modal para ver información del perfil */}
        <Dialog open={!!selectedPerson} onOpenChange={closeModal}>
          <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
            {selectedPerson && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-6 mb-6">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={selectedPerson.avatar || "/placeholder.svg"} alt={selectedPerson.name} />
                      <AvatarFallback className="text-2xl">
                        {selectedPerson.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <DialogTitle className="text-3xl mb-2">{selectedPerson.name}</DialogTitle>
                      <DialogDescription className="text-xl mb-2">{selectedPerson.role}</DialogDescription>
                      <Badge variant="secondary" className="text-base px-3 py-1">
                        {selectedPerson.department}
                      </Badge>
                    </div>
                  </div>
                </DialogHeader>
                <div className="space-y-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 text-lg">Información de contacto</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <span className="text-base">{selectedPerson.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-500" />
                        <span className="text-base">{selectedPerson.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-gray-500" />
                        <span className="text-base">{selectedPerson.location}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        <span className="text-base">
                          Se unió el {new Date(selectedPerson.joinDate).toLocaleDateString("es-ES")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 text-lg">Biografía</h4>
                    <p className="text-base text-gray-600 leading-relaxed">{selectedPerson.bio}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 text-lg">Habilidades</h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedPerson.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-base px-3 py-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                        <span className="text-2xl font-bold">{selectedPerson.rating}</span>
                      </div>
                      <p className="text-base text-gray-600">Calificación</p>
                    </div>
                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Briefcase className="w-6 h-6 text-gray-500" />
                        <span className="text-2xl font-bold">{selectedPerson.projects}</span>
                      </div>
                      <p className="text-base text-gray-600">Proyectos</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Modal para agregar nuevo perfil */}
        <Dialog open={showAddModal} onOpenChange={closeAddModal}>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl mb-2">Agregar Nuevo Perfil</DialogTitle>
              <DialogDescription>Completa la información para agregar un nuevo miembro al equipo</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo *</Label>
                  <Input
                    id="name"
                    value={newPerson.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Ej: Juan Pérez"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Cargo *</Label>
                  <Input
                    id="role"
                    value={newPerson.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    placeholder="Ej: Desarrollador Frontend"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Departamento *</Label>
                  <Select
                    value={newPerson.department}
                    onValueChange={(value) => handleInputChange("department", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación *</Label>
                  <Input
                    id="location"
                    value={newPerson.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="Ej: Madrid, España"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newPerson.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Ej: juan.perez@empresa.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input
                    id="phone"
                    value={newPerson.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Ej: +34 612 345 678"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biografía *</Label>
                <Textarea
                  id="bio"
                  value={newPerson.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder="Describe la experiencia y especialidades del miembro del equipo..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Habilidades *</Label>
                <Input
                  id="skills"
                  value={newPerson.skills}
                  onChange={(e) => handleInputChange("skills", e.target.value)}
                  placeholder="Ej: React, TypeScript, Node.js (separadas por comas)"
                  required
                />
                <p className="text-sm text-gray-500">Separa las habilidades con comas</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rating">Calificación (1-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={newPerson.rating}
                    onChange={(e) => handleInputChange("rating", Number.parseFloat(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projects">Número de proyectos</Label>
                  <Input
                    id="projects"
                    type="number"
                    min="0"
                    value={newPerson.projects}
                    onChange={(e) => handleInputChange("projects", Number.parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={closeAddModal}>
                  Cancelar
                </Button>
                <Button type="submit">Agregar Perfil</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Modal de confirmación para editar perfil recién agregado */}
        <Dialog open={!!showEditOption} onOpenChange={() => setShowEditOption(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>¡Perfil agregado exitosamente!</DialogTitle>
              <DialogDescription>
                {showEditOption?.name} ha sido agregado al equipo. ¿Deseas editar sus datos ahora?
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setShowEditOption(null)}>
                No, gracias
              </Button>
              <Button
                onClick={() => {
                  if (showEditOption) {
                    handleEditPerson(showEditOption)
                  }
                }}
              >
                Sí, editar datos
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal para editar perfil */}
        <Dialog open={showEditModal} onOpenChange={closeEditModal}>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl mb-2">Editar Perfil</DialogTitle>
              <DialogDescription>Modifica la información del miembro del equipo</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleEditSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nombre completo *</Label>
                  <Input
                    id="edit-name"
                    value={editFormData.name}
                    onChange={(e) => handleEditInputChange("name", e.target.value)}
                    placeholder="Ej: Juan Pérez"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-role">Cargo *</Label>
                  <Input
                    id="edit-role"
                    value={editFormData.role}
                    onChange={(e) => handleEditInputChange("role", e.target.value)}
                    placeholder="Ej: Desarrollador Frontend"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-department">Departamento *</Label>
                  <Select
                    value={editFormData.department}
                    onValueChange={(value) => handleEditInputChange("department", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-location">Ubicación *</Label>
                  <Input
                    id="edit-location"
                    value={editFormData.location}
                    onChange={(e) => handleEditInputChange("location", e.target.value)}
                    placeholder="Ej: Madrid, España"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email *</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editFormData.email}
                    onChange={(e) => handleEditInputChange("email", e.target.value)}
                    placeholder="Ej: juan.perez@empresa.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Teléfono *</Label>
                  <Input
                    id="edit-phone"
                    value={editFormData.phone}
                    onChange={(e) => handleEditInputChange("phone", e.target.value)}
                    placeholder="Ej: +34 612 345 678"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-bio">Biografía *</Label>
                <Textarea
                  id="edit-bio"
                  value={editFormData.bio}
                  onChange={(e) => handleEditInputChange("bio", e.target.value)}
                  placeholder="Describe la experiencia y especialidades del miembro del equipo..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-skills">Habilidades *</Label>
                <Input
                  id="edit-skills"
                  value={editFormData.skills}
                  onChange={(e) => handleEditInputChange("skills", e.target.value)}
                  placeholder="Ej: React, TypeScript, Node.js (separadas por comas)"
                  required
                />
                <p className="text-sm text-gray-500">Separa las habilidades con comas</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-rating">Calificación (1-5)</Label>
                  <Input
                    id="edit-rating"
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={editFormData.rating}
                    onChange={(e) => handleEditInputChange("rating", Number.parseFloat(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-projects">Número de proyectos</Label>
                  <Input
                    id="edit-projects"
                    type="number"
                    min="0"
                    value={editFormData.projects}
                    onChange={(e) => handleEditInputChange("projects", Number.parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={closeEditModal}>
                  Cancelar
                </Button>
                <Button type="submit">Guardar Cambios</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
