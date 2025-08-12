"use client"

import { Search, Trash2, MoreVertical, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"

interface Email {
  id: number
  sender: string
  senderEmail: string
  subject: string
  preview: string
  time: string
  isRead: boolean
  isPinned: boolean
  hasAttachment: boolean
}

interface EliminadosProps {
  deletedEmails: Email[]
  onRestore: (emailId: number) => void
  onPermanentDelete: (emailId: number) => void
}

export function Eliminados({ deletedEmails, onRestore, onPermanentDelete }: EliminadosProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEmails = deletedEmails.filter(
    (email) =>
      email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.preview.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-foreground">Eliminados</h1>
          <Badge variant="secondary" className="bg-red-600 text-white">
            {deletedEmails.length} correos
          </Badge>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar en eliminados..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-ring"
          />
        </div>
      </div>

      {/* Email List */}
      <div className="flex-1 overflow-y-auto">
        {filteredEmails.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <Trash2 className="w-12 h-12 mb-4" />
            <p className="text-lg font-medium">No hay correos eliminados</p>
            <p className="text-sm">Los correos eliminados aparecerán aquí</p>
          </div>
        ) : (
          filteredEmails.map((email) => (
            <div
              key={email.id}
              className="border-b border-border p-4 hover:bg-muted/50 cursor-pointer transition-colors bg-red-50 dark:bg-red-900/10"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarFallback className="bg-red-600 text-white">{email.sender.charAt(0)}</AvatarFallback>
                </Avatar>

                {/* Email Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{email.sender}</span>
                      <span className="text-muted-foreground text-sm">{email.senderEmail}</span>
                      <Badge variant="secondary" className="bg-red-600 text-white text-xs px-2 py-0">
                        Eliminado
                      </Badge>
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
                            onClick={() => onRestore(email.id)}
                            className="text-foreground hover:bg-accent focus:bg-accent"
                          >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Restaurar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onPermanentDelete(email.id)}
                            className="text-red-600 hover:bg-accent focus:bg-accent"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Eliminar permanentemente
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <h3 className="font-medium mb-1 text-foreground">{email.subject}</h3>

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
