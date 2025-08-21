"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Eye, EyeOff, Edit, Trash2, Plus, MessageCircle, Send } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface UsuariosComponentProps {
  onBack: () => void
}

interface User {
  id: number
  name: string
  email: string
  password: string
  isOnline: boolean
  lastSeen: string
  role: string
}

export default function UsuariosComponent({ onBack }: UsuariosComponentProps) {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan@empresa.com",
      password: "admin123",
      isOnline: true,
      lastSeen: "Ahora",
      role: "Admin",
    },
    {
      id: 2,
      name: "María García",
      email: "maria@empresa.com",
      password: "user456",
      isOnline: false,
      lastSeen: "Hace 5 minutos",
      role: "Usuario",
    },
    {
      id: 3,
      name: "Carlos López",
      email: "carlos@empresa.com",
      password: "pass789",
      isOnline: true,
      lastSeen: "Ahora",
      role: "Moderador",
    },
    {
      id: 4,
      name: "Ana Martín",
      email: "ana@empresa.com",
      password: "secure321",
      isOnline: false,
      lastSeen: "Hace 2 horas",
      role: "Usuario",
    },
  ])

  const [showPasswords, setShowPasswords] = useState<{ [key: number]: boolean }>({})
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "Usuario" })
  const [chatUser, setChatUser] = useState<User | null>(null)
  const [message, setMessage] = useState("")
  const [activeTab, setActiveTab] = useState<"all" | "online">("all")

  const togglePasswordVisibility = (userId: number) => {
    setShowPasswords((prev) => ({ ...prev, [userId]: !prev[userId] }))
  }

  const handleEditUser = (user: User) => {
    setEditingUser({ ...user })
  }

  const handleSaveEdit = () => {
    if (editingUser) {
      setUsers((prev) => prev.map((u) => (u.id === editingUser.id ? editingUser : u)))
      setEditingUser(null)
    }
  }

  const handleAddUser = () => {
    const id = Math.max(...users.map((u) => u.id)) + 1
    setUsers((prev) => [
      ...prev,
      {
        ...newUser,
        id,
        isOnline: false,
        lastSeen: "Nunca",
      },
    ])
    setNewUser({ name: "", email: "", password: "", role: "Usuario" })
  }

  const handleDeleteUser = (userId: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId))
  }

  const handleSendMessage = () => {
    if (message.trim() && chatUser) {
      // Aquí iría la lógica para enviar el mensaje
      alert(`Mensaje enviado a ${chatUser.name}: ${message}`)
      setMessage("")
      setChatUser(null)
    }
  }

  const onlineUsers = users.filter((u) => u.isOnline)
  const offlineUsers = users.filter((u) => !u.isOnline)

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
          <h1 className="text-2xl font-bold text-foreground">Gestión de Usuarios / Accesos</h1>
        </div>

        <div className="flex space-x-4 mb-6">
          <Button variant={activeTab === "all" ? "default" : "outline"} onClick={() => setActiveTab("all")}>
            Todos los Usuarios
          </Button>
          <Button variant={activeTab === "online" ? "default" : "outline"} onClick={() => setActiveTab("online")}>
            Estado en Línea
          </Button>
        </div>

        {activeTab === "all" && (
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-card-foreground">Gestión de Usuarios</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-primary text-primary-foreground">
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Usuario
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nombre</Label>
                      <Input
                        id="name"
                        value={newUser.name}
                        onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Contraseña</Label>
                      <Input
                        id="password"
                        type="password"
                        value={newUser.password}
                        onChange={(e) => setNewUser((prev) => ({ ...prev, password: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="role">Rol</Label>
                      <select
                        id="role"
                        value={newUser.role}
                        onChange={(e) => setNewUser((prev) => ({ ...prev, role: e.target.value }))}
                        className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                      >
                        <option value="Usuario">Usuario</option>
                        <option value="Moderador">Moderador</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>
                    <Button onClick={handleAddUser} className="w-full">
                      Agregar Usuario
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 text-card-foreground">Nombre</th>
                    <th className="text-left p-3 text-card-foreground">Email</th>
                    <th className="text-left p-3 text-card-foreground">Contraseña</th>
                    <th className="text-left p-3 text-card-foreground">Rol</th>
                    <th className="text-left p-3 text-card-foreground">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-border hover:bg-accent/50">
                      <td className="p-3 text-card-foreground">{user.name}</td>
                      <td className="p-3 text-card-foreground">{user.email}</td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-card-foreground">
                            {showPasswords[user.id] ? user.password : "••••••••"}
                          </span>
                          <Button variant="ghost" size="sm" onClick={() => togglePasswordVisibility(user.id)}>
                            {showPasswords[user.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge variant={user.role === "Admin" ? "default" : "secondary"}>{user.role}</Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => setChatUser(user)}>
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Editar Usuario</DialogTitle>
                              </DialogHeader>
                              {editingUser && (
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="edit-name">Nombre</Label>
                                    <Input
                                      id="edit-name"
                                      value={editingUser.name}
                                      onChange={(e) =>
                                        setEditingUser((prev) => (prev ? { ...prev, name: e.target.value } : null))
                                      }
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-email">Email</Label>
                                    <Input
                                      id="edit-email"
                                      type="email"
                                      value={editingUser.email}
                                      onChange={(e) =>
                                        setEditingUser((prev) => (prev ? { ...prev, email: e.target.value } : null))
                                      }
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-password">Contraseña</Label>
                                    <Input
                                      id="edit-password"
                                      type="password"
                                      value={editingUser.password}
                                      onChange={(e) =>
                                        setEditingUser((prev) => (prev ? { ...prev, password: e.target.value } : null))
                                      }
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-role">Rol</Label>
                                    <select
                                      id="edit-role"
                                      value={editingUser.role}
                                      onChange={(e) =>
                                        setEditingUser((prev) => (prev ? { ...prev, role: e.target.value } : null))
                                      }
                                      className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                                    >
                                      <option value="Usuario">Usuario</option>
                                      <option value="Moderador">Moderador</option>
                                      <option value="Admin">Admin</option>
                                    </select>
                                  </div>
                                  <Button onClick={handleSaveEdit} className="w-full">
                                    Guardar Cambios
                                  </Button>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "online" && (
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-card-foreground mb-4 flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                Usuarios en Línea ({onlineUsers.length})
              </h2>
              <div className="space-y-3">
                {onlineUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-card-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{user.lastSeen}</span>
                      <Button variant="ghost" size="sm" onClick={() => setChatUser(user)}>
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-card-foreground mb-4 flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                Usuarios Desconectados ({offlineUsers.length})
              </h2>
              <div className="space-y-3">
                {offlineUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-card-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{user.lastSeen}</span>
                      <Button variant="ghost" size="sm" onClick={() => setChatUser(user)}>
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <Dialog open={!!chatUser} onOpenChange={() => setChatUser(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enviar mensaje a {chatUser?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder="Escribe tu mensaje aquí..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setChatUser(null)}>
                  Cancelar
                </Button>
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
