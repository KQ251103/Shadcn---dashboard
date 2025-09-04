"use client"

import { useState} from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Send,
  Save,
  Paperclip,
  Bold,
  Italic,
  Underline,
  List,
  Link,
  ImageIcon,
  Smile,
  MoreHorizontal,
  Plus,
  Clock,
  Edit,
  Trash2,
  ArrowLeft,
  CheckCircle,
} from "lucide-react"

interface Draft {
  id: number
  recipient: string
  subject: string
  message: string
  attachments: string[]
  date: string
  time: string
}

interface SentMessage {
  id: number
  recipient: string
  subject: string
  message: string
  attachments: string[]
  date: string
  time: string
  status: "delivered" | "read"
}

const initialSentMessages: SentMessage[] = [
  {
    id: 1,
    recipient: "maria.gonzalez@empresa.com",
    subject: "Informe mensual completado",
    message: "Estimada María, adjunto el informe mensual con todos los datos actualizados...",
    attachments: ["informe_enero.pdf"],
    date: "2024-01-16",
    time: "14:30",
    status: "read",
  },
  {
    id: 2,
    recipient: "equipo@desarrollo.com",
    subject: "Reunión de planificación - Viernes 2PM",
    message: "Hola equipo, confirmo la reunión de planificación para este viernes a las 2PM...",
    attachments: [],
    date: "2024-01-15",
    time: "11:20",
    status: "delivered",
  },
  {
    id: 3,
    recipient: "cliente@empresa.com",
    subject: "Propuesta de proyecto aprobada",
    message: "Estimado cliente, me complace informarle que su propuesta ha sido aprobada...",
    attachments: ["contrato_firmado.pdf", "cronograma.xlsx"],
    date: "2024-01-14",
    time: "16:45",
    status: "read",
  },
]

const initialDrafts: Draft[] = [
  {
    id: 1,
    recipient: "ana.lopez@empresa.com",
    subject: "Propuesta de mejoras en el sistema",
    message:
      "Estimada Ana, he estado revisando el sistema actual y tengo algunas propuestas de mejora que me gustaría discutir contigo...",
    attachments: ["propuesta_mejoras.pdf"],
    date: "2024-01-15",
    time: "10:30",
  },
  {
    id: 2,
    recipient: "carlos.martinez@cliente.com",
    subject: "Seguimiento reunión del viernes",
    message:
      "Hola Carlos, quería hacer un seguimiento de los puntos que discutimos en la reunión del viernes pasado...",
    attachments: [],
    date: "2024-01-14",
    time: "16:45",
  },
  {
    id: 3,
    recipient: "equipo@desarrollo.com",
    subject: "",
    message: "Equipo, necesito compartir con ustedes las nuevas directrices para el proyecto...",
    attachments: [],
    date: "2024-01-13",
    time: "09:15",
  },
]

export default function MessagesPage() {
  const [currentView, setCurrentView] = useState<"sent" | "drafts">("sent")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [recipient, setRecipient] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [attachments, setAttachments] = useState<string[]>([])
  const [drafts, setDrafts] = useState<Draft[]>(initialDrafts)
  const [sentMessages] = useState<SentMessage[]>(initialSentMessages)
  const [editingDraft, setEditingDraft] = useState<Draft | null>(null)

  const handleSend = () => {
    if (!recipient || !subject || !message) {
      alert("Por favor completa todos los campos obligatorios.")
      return
    }

    if (editingDraft) {
      setDrafts(drafts.filter((draft) => draft.id !== editingDraft.id))
    }

    alert("Tu mensaje ha sido enviado exitosamente.")

    // Reset form and close modal
    resetForm()
  }

  const handleSaveDraft = () => {
    const now = new Date()
    const date = now.toISOString().split("T")[0]
    const time = now.toTimeString().split(" ")[0].substring(0, 5)

    if (editingDraft) {
      setDrafts(
        drafts.map((draft) =>
          draft.id === editingDraft.id ? { ...draft, recipient, subject, message, attachments, date, time } : draft,
        ),
      )
      alert("Los cambios han sido guardados.")
    } else {
      const newDraft: Draft = {
        id: Date.now(),
        recipient,
        subject,
        message,
        attachments: [...attachments],
        date,
        time,
      }
      setDrafts([newDraft, ...drafts])
      alert("Tu mensaje ha sido guardado como borrador.")
    }

    resetForm()
  }

  const resetForm = () => {
    setRecipient("")
    setSubject("")
    setMessage("")
    setAttachments([])
    setEditingDraft(null)
    setIsModalOpen(false)
  }

  const handleEditDraft = (draft: Draft) => {
    setEditingDraft(draft)
    setRecipient(draft.recipient)
    setSubject(draft.subject)
    setMessage(draft.message)
    setAttachments([...draft.attachments])
    setIsModalOpen(true)
  }

  const handleDeleteDraft = (draftId: number) => {
    setDrafts(drafts.filter((draft) => draft.id !== draftId))
    alert("El borrador ha sido eliminado.")
  }

  const addAttachment = () => {
    const newAttachment = `archivo_${attachments.length + 1}.pdf`
    setAttachments([...attachments, newAttachment])
  }

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {currentView === "drafts" && (
              <Button variant="ghost" onClick={() => setCurrentView("sent")} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Volver
              </Button>
            )}
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {currentView === "sent" ? "Mensajes Enviados" : "Borradores"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {currentView === "sent"
                  ? "Revisa tus mensajes enviados y redacta nuevos"
                  : "Gestiona tus mensajes guardados"}
              </p>
            </div>
          </div>

          {currentView === "sent" && (
            <Dialog
              open={isModalOpen}
              onOpenChange={(open) => {
                setIsModalOpen(open)
                if (!open) resetForm()
              }}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Redactar
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    {editingDraft ? "Editar Borrador" : "Redactar Nuevo Mensaje"}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                  {/* Recipient Field */}
                  <div className="space-y-2">
                    <Label htmlFor="recipient">Para *</Label>
                    <Input
                      id="recipient"
                      placeholder="Ingresa el email del destinatario"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Asunto *</Label>
                    <Input
                      id="subject"
                      placeholder="Escribe el asunto del mensaje"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <Separator />

                  {/* Formatting Toolbar */}
                  <div className="flex items-center gap-1 p-2 border rounded-md bg-muted/50">
                    <Button variant="ghost" size="sm">
                      <Bold className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Italic className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Underline className="w-4 h-4" />
                    </Button>
                    <Separator orientation="vertical" className="h-6 mx-1" />
                    <Button variant="ghost" size="sm">
                      <List className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Link className="w-4 h-4" />
                    </Button>
                    <Separator orientation="vertical" className="h-6 mx-1" />
                    <Button variant="ghost" size="sm">
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Smile className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={addAttachment}>
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <div className="flex-1" />
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Message Content */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje *</Label>
                    <Textarea
                      id="message"
                      placeholder="Escribe tu mensaje aquí..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[200px] resize-none"
                    />
                  </div>

                  {/* Attachments */}
                  {attachments.length > 0 && (
                    <div className="space-y-2">
                      <Label>Archivos Adjuntos</Label>
                      <div className="flex flex-wrap gap-2">
                        {attachments.map((attachment, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-2 px-3 py-1">
                            <Paperclip className="w-3 h-3" />
                            {attachment}
                            <button
                              onClick={() => removeAttachment(index)}
                              className="ml-1 text-muted-foreground hover:text-foreground"
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <Separator />

                  {/* Modal Action Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>* Campos obligatorios</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={handleSaveDraft}>
                        <Save className="w-4 h-4 mr-2" />
                        Guardar Borrador
                      </Button>
                      <Button onClick={handleSend}>
                        <Send className="w-4 h-4 mr-2" />
                        Enviar Mensaje
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {currentView === "sent" && (
          <Card
            className="p-4 bg-card border-border cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => setCurrentView("drafts")}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Save className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Borradores</h3>
                <p className="text-sm text-muted-foreground">{drafts.length} mensajes guardados</p>
              </div>
            </div>
          </Card>
        )}

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              {currentView === "sent" ? (
                <>
                  <Send className="w-5 h-5" />
                  Mensajes Enviados
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Mensajes Guardados
                  <Dialog
                    open={isModalOpen}
                    onOpenChange={(open) => {
                      setIsModalOpen(open)
                      if (!open) resetForm()
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button size="sm" className="ml-auto">
                        <Plus className="w-4 h-4 mr-2" />
                        Redactar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Send className="w-5 h-5" />
                          {editingDraft ? "Editar Borrador" : "Redactar Nuevo Mensaje"}
                        </DialogTitle>
                      </DialogHeader>

                      <div className="space-y-6 mt-4">
                        {/* Recipient Field */}
                        <div className="space-y-2">
                          <Label htmlFor="recipient">Para *</Label>
                          <Input
                            id="recipient"
                            placeholder="Ingresa el email del destinatario"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            className="w-full"
                          />
                        </div>

                        {/* Subject Field */}
                        <div className="space-y-2">
                          <Label htmlFor="subject">Asunto *</Label>
                          <Input
                            id="subject"
                            placeholder="Escribe el asunto del mensaje"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full"
                          />
                        </div>

                        <Separator />

                        {/* Formatting Toolbar */}
                        <div className="flex items-center gap-1 p-2 border rounded-md bg-muted/50">
                          <Button variant="ghost" size="sm">
                            <Bold className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Italic className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Underline className="w-4 h-4" />
                          </Button>
                          <Separator orientation="vertical" className="h-6 mx-1" />
                          <Button variant="ghost" size="sm">
                            <List className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Link className="w-4 h-4" />
                          </Button>
                          <Separator orientation="vertical" className="h-6 mx-1" />
                          <Button variant="ghost" size="sm">
                            <ImageIcon className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Smile className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={addAttachment}>
                            <Paperclip className="w-4 h-4" />
                          </Button>
                          <div className="flex-1" />
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Message Content */}
                        <div className="space-y-2">
                          <Label htmlFor="message">Mensaje *</Label>
                          <Textarea
                            id="message"
                            placeholder="Escribe tu mensaje aquí..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="min-h-[200px] resize-none"
                          />
                        </div>

                        {/* Attachments */}
                        {attachments.length > 0 && (
                          <div className="space-y-2">
                            <Label>Archivos Adjuntos</Label>
                            <div className="flex flex-wrap gap-2">
                              {attachments.map((attachment, index) => (
                                <Badge key={index} variant="secondary" className="flex items-center gap-2 px-3 py-1">
                                  <Paperclip className="w-3 h-3" />
                                  {attachment}
                                  <button
                                    onClick={() => removeAttachment(index)}
                                    className="ml-1 text-muted-foreground hover:text-foreground"
                                  >
                                    ×
                                  </button>
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <Separator />

                        {/* Modal Action Buttons */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>* Campos obligatorios</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" onClick={handleSaveDraft}>
                              <Save className="w-4 h-4 mr-2" />
                              Guardar Borrador
                            </Button>
                            <Button onClick={handleSend}>
                              <Send className="w-4 h-4 mr-2" />
                              Enviar Mensaje
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                {currentView === "sent" ? (
                  sentMessages.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Send className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No tienes mensajes enviados</p>
                      <p className="text-sm">Usa el botón nviar tu primer mensaje</p>
                    </div>
                  ) : (
                    sentMessages.map((sentMessage) => (
                      <div
                        key={sentMessage.id}
                        className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-foreground truncate">{sentMessage.subject}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge variant={sentMessage.status === "read" ? "default" : "secondary"}>
                                {sentMessage.status === "read" ? "Leído" : "Entregado"}
                              </Badge>
                              <Clock className="w-3 h-3" />
                              {sentMessage.date} - {sentMessage.time}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Para: {sentMessage.recipient}</p>
                          <p className="text-sm text-muted-foreground line-clamp-2">{sentMessage.message}</p>
                          {sentMessage.attachments.length > 0 && (
                            <div className="mt-2 flex items-center gap-1">
                              <Paperclip className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {sentMessage.attachments.length} archivo(s) adjunto(s)
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )
                ) : drafts.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Save className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No tienes borradores guardados</p>
                    <p className="text-sm">Usa el botón ara crear un nuevo mensaje</p>
                  </div>
                ) : (
                  drafts.map((draft) => (
                    <div
                      key={draft.id}
                      className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                        <Save className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-foreground truncate">{draft.subject || "Sin asunto"}</h4>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {draft.date} - {draft.time}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditDraft(draft)}
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteDraft(draft.id)}
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Para: {draft.recipient || "Sin destinatario"}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-2">{draft.message || "Mensaje vacío"}</p>
                        {draft.attachments.length > 0 && (
                          <div className="mt-2 flex items-center gap-1">
                            <Paperclip className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {draft.attachments.length} archivo(s) adjunto(s)
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
