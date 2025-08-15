"use client"

import { Search, Archive, Trash2, MoreVertical, Pin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"

interface Email {
  _id: string
  sender: string
  senderEmail: string
  subject: string
  preview: string
  time: string
  isRead: boolean
  isPinned: boolean
  hasAttachment: boolean
}

interface InboxViewProps {
  emails: Email[]
  onPin: (emailId: string) => void
  onArchive: (emailId: string) => void
  onDelete: (emailId: string) => void
}

export function InboxView({ emails, onPin, onArchive, onDelete }: InboxViewProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEmails = emails.filter(
    (email) =>
      email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.preview.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedEmails = [...filteredEmails].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return 0
  })

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-foreground">Bandeja de entrada</h1>
          <Badge variant="secondary" className="bg-blue-600 text-white">
            {emails.length} correos
          </Badge>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar correos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background border-border text-foreground placeholder-muted-foreground focus:border-blue-500"
          />
        </div>
      </div>

      {/* Email List */}
      <div className="flex-1 overflow-y-auto">
        {sortedEmails.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <Search className="w-12 h-12 mb-4" />
            <p className="text-lg font-medium">No se encontraron correos</p>
            <p className="text-sm">Intenta con otros términos de búsqueda</p>
          </div>
        ) : (
          sortedEmails.map((email) => (
            <div
              key={email._id}
              className={`border-b border-border p-4 hover:bg-muted/50 cursor-pointer transition-colors ${
                !email.isRead ? "bg-muted/30" : ""
              } ${email.isPinned ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarFallback className="bg-blue-600 text-white">{email.sender.charAt(0)}</AvatarFallback>
                </Avatar>

                {/* Email Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${!email.isRead ? "text-foreground" : "text-muted-foreground"}`}>
                        {email.sender}
                      </span>
                      <span className="text-muted-foreground text-sm">{email.senderEmail}</span>
                      {!email.isRead && (
                        <Badge variant="secondary" className="bg-blue-600 text-white text-xs px-2 py-0">
                          Nuevo
                        </Badge>
                      )}
                      {email.isPinned && (
                        <Badge variant="secondary" className="bg-yellow-600 text-white text-xs px-2 py-0">
                          Fijado
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-sm">{email.time}</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 h-auto text-muted-foreground hover:text-foreground"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-popover border-border">
                          <DropdownMenuItem
                            onClick={() => onPin(email._id)}
                            className="text-popover-foreground hover:bg-accent focus:bg-accent"
                          >
                            <Pin className="w-4 h-4 mr-2" />
                            {email.isPinned ? "Desfijar" : "Fijar"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onArchive(email._id)}
                            className="text-popover-foreground hover:bg-accent focus:bg-accent"
                          >
                            <Archive className="w-4 h-4 mr-2" />
                            Archivar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onDelete(email._id)}
                            className="text-popover-foreground hover:bg-accent focus:bg-accent"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <h3 className={`font-medium mb-1 ${!email.isRead ? "text-foreground" : "text-muted-foreground"}`}>
                    {email.subject}
                  </h3>

                  <p className="text-muted-foreground text-sm line-clamp-2">{email.preview}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
