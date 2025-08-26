"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Shield, Key, Eye, AlertTriangle, Lock, Smartphone, Globe, Clock } from "lucide-react"
import { useState } from "react"

interface SeguridadComponentProps {
  onBack: () => void
}

export default function SeguridadComponent({ onBack }: SeguridadComponentProps) {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [loginNotifications, setLoginNotifications] = useState(true)
  const [dataEncryption, setDataEncryption] = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState(false)

  const securityLogs = [
    {
      id: 1,
      action: "Inicio de sesión exitoso",
      ip: "192.168.1.100",
      location: "Madrid, España",
      time: "Hace 2 horas",
      type: "success",
    },
    {
      id: 2,
      action: "Intento de acceso fallido",
      ip: "45.123.67.89",
      location: "Ubicación desconocida",
      time: "Hace 5 horas",
      type: "warning",
    },
    {
      id: 3,
      action: "Cambio de contraseña",
      ip: "192.168.1.100",
      location: "Madrid, España",
      time: "Hace 1 día",
      type: "info",
    },
    {
      id: 4,
      action: "Activación 2FA",
      ip: "192.168.1.100",
      location: "Madrid, España",
      time: "Hace 2 días",
      type: "success",
    },
    {
      id: 5,
      action: "Descarga de datos",
      ip: "192.168.1.100",
      location: "Madrid, España",
      time: "Hace 3 días",
      type: "info",
    },
    {
      id: 6,
      action: "Intento de acceso fallido",
      ip: "123.45.67.89",
      location: "Ubicación desconocida",
      time: "Hace 4 días",
      type: "warning",
    },
  ]

  const activeSessions = [
    { id: 1, device: "Chrome - Windows", location: "Madrid, España", lastActive: "Activo ahora", current: true },
    { id: 2, device: "Safari - iPhone", location: "Madrid, España", lastActive: "Hace 1 hora", current: false },
    { id: 3, device: "Firefox - MacOS", location: "Barcelona, España", lastActive: "Hace 2 días", current: false },
  ]

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
          <h1 className="text-2xl font-bold text-foreground">Seguridad y Privacidad</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Security Overview */}
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Estado de Seguridad</CardTitle>
              <Shield className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">Seguro</div>
              <p className="text-xs text-muted-foreground">Todas las medidas activas</p>
            </CardContent>
          </Card>

          {/* Active Sessions */}
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Sesiones Activas</CardTitle>
              <Smartphone className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{activeSessions.length}</div>
              <p className="text-xs text-muted-foreground">Dispositivos conectados</p>
            </CardContent>
          </Card>

          {/* Security Alerts */}
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Alertas de Seguridad</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">2</div>
              <p className="text-xs text-muted-foreground">Intentos de acceso fallidos</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Security Settings */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Configuración de Seguridad
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium text-card-foreground">Autenticación de dos factores</label>
                  <p className="text-xs text-muted-foreground">Protección adicional para tu cuenta</p>
                </div>
                <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium text-card-foreground">Notificaciones de inicio de sesión</label>
                  <p className="text-xs text-muted-foreground">Recibe alertas de nuevos accesos</p>
                </div>
                <Switch checked={loginNotifications} onCheckedChange={setLoginNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium text-card-foreground">Cifrado de datos</label>
                  <p className="text-xs text-muted-foreground">Protege tu información personal</p>
                </div>
                <Switch checked={dataEncryption} onCheckedChange={setDataEncryption} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium text-card-foreground">Cierre automático de sesión</label>
                  <p className="text-xs text-muted-foreground">Después de 30 minutos de inactividad</p>
                </div>
                <Switch checked={sessionTimeout} onCheckedChange={setSessionTimeout} />
              </div>

              <div className="pt-4 space-y-2">
                <Button className="w-full bg-transparent" variant="outline">
                  <Key className="h-4 w-4 mr-2" />
                  Cambiar Contraseña
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Descargar Datos Personales
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Active Sessions */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Sesiones Activas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {activeSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${session.current ? "bg-green-500" : "bg-gray-400"}`} />
                      <div>
                        <p className="text-sm font-medium text-card-foreground">{session.device}</p>
                        <p className="text-xs text-muted-foreground">{session.location}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {session.lastActive}
                        </p>
                      </div>
                    </div>
                    {!session.current && (
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 bg-transparent">
                        Cerrar
                      </Button>
                    )}
                    {session.current && <Badge variant="secondary">Actual</Badge>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Log */}
        <Card className="bg-card border-border mt-6">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Registro de Seguridad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {securityLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge
                      variant={
                        log.type === "success" ? "default" : log.type === "warning" ? "destructive" : "secondary"
                      }
                      className="w-16 justify-center"
                    >
                      {log.type === "success" ? "Éxito" : log.type === "warning" ? "Alerta" : "Info"}
                    </Badge>
                    <div>
                      <p className="text-sm font-medium text-card-foreground">{log.action}</p>
                      <p className="text-xs text-muted-foreground">
                        IP: {log.ip} • {log.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
