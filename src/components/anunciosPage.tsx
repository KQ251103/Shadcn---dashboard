"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Calendar, User } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface Anuncio {
  id: string
  titulo: string
  contenido: string
  autor: string
  fechaCreacion: Date
  fechaActualizacion?: Date
}

export function AnunciosPage() {
  const [anuncios, setAnuncios] = useState<Anuncio[]>([
    {
      id: "1",
      titulo: "Salida temprana hoy",
      contenido: "Hoy salimos a las 4:00 PM debido a mantenimiento en el edificio.",
      autor: "Admin",
      fechaCreacion: new Date("2024-01-15T10:30:00"),
    },
    {
      id: "2",
      titulo: "Reunión general mañana",
      contenido: "Reunión general mañana a las 9:00 AM en la sala de conferencias.",
      autor: "Gerencia",
      fechaCreacion: new Date("2024-01-14T14:20:00"),
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAnuncio, setEditingAnuncio] = useState<Anuncio | null>(null)
  const [formData, setFormData] = useState({
    titulo: "",
    contenido: "",
    autor: "",
  })

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Hace un momento"
    if (diffInMinutes < 60) return `Hace ${diffInMinutes} minuto${diffInMinutes > 1 ? "s" : ""}`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? "s" : ""}`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `Hace ${diffInDays} día${diffInDays > 1 ? "s" : ""}`

    return date.toLocaleDateString()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingAnuncio) {
      // Editar anuncio existente
      setAnuncios((prev) =>
        prev.map((anuncio) =>
          anuncio.id === editingAnuncio.id ? { ...anuncio, ...formData, fechaActualizacion: new Date() } : anuncio,
        ),
      )
    } else {
      // Crear nuevo anuncio
      const nuevoAnuncio: Anuncio = {
        id: Date.now().toString(),
        ...formData,
        fechaCreacion: new Date(),
      }
      setAnuncios((prev) => [nuevoAnuncio, ...prev])
    }

    setFormData({ titulo: "", contenido: "", autor: "" })
    setEditingAnuncio(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (anuncio: Anuncio) => {
    setEditingAnuncio(anuncio)
    setFormData({
      titulo: anuncio.titulo,
      contenido: anuncio.contenido,
      autor: anuncio.autor,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setAnuncios((prev) => prev.filter((anuncio) => anuncio.id !== id))
  }

  const resetForm = () => {
    setFormData({ titulo: "", contenido: "", autor: "" })
    setEditingAnuncio(null)
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-background min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Anuncios</h1>
          <p className="text-muted-foreground">Gestiona los anuncios de la empresa</p>
        </div>

        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) resetForm()
          }}
        >
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Crear Anuncio
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-card-foreground">
                {editingAnuncio ? "Editar Anuncio" : "Crear Nuevo Anuncio"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="titulo">Título</Label>
                <Input
                  id="titulo"
                  value={formData.titulo}
                  onChange={(e) => setFormData((prev) => ({ ...prev, titulo: e.target.value }))}
                  placeholder="Ej: Salida temprana hoy"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contenido">Contenido</Label>
                <Textarea
                  id="contenido"
                  value={formData.contenido}
                  onChange={(e) => setFormData((prev) => ({ ...prev, contenido: e.target.value }))}
                  placeholder="Describe el anuncio..."
                  rows={4}
                  required
                />
              </div>
              <div>
                <Label htmlFor="autor">Autor</Label>
                <Input
                  id="autor"
                  value={formData.autor}
                  onChange={(e) => setFormData((prev) => ({ ...prev, autor: e.target.value }))}
                  placeholder="Ej: Admin, Gerencia"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">{editingAnuncio ? "Actualizar" : "Crear"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {anuncios.length === 0 ? (
          <Card className="bg-card border-border">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <h3 className="text-lg font-medium text-card-foreground mb-2">No hay anuncios</h3>
                <p className="text-muted-foreground mb-4">Crea tu primer anuncio para comenzar</p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Anuncio
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          anuncios.map((anuncio) => (
            <Card key={anuncio.id} className="hover:shadow-md transition-shadow bg-card border-border">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2 text-card-foreground">{anuncio.titulo}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{anuncio.autor}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatTimeAgo(anuncio.fechaCreacion)}</span>
                      </div>
                      {anuncio.fechaActualizacion && (
                        <Badge variant="secondary" className="text-xs">
                          Editado
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(anuncio)}
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(anuncio.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-card-foreground leading-relaxed">{anuncio.contenido}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
