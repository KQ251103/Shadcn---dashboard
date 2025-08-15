"use client"

import { Search, MoreHorizontal, RotateCcw, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

interface ArchivadosProps {
  archivedEmails: Email[]
  onRestore: (emailId: string) => void
  onPermanentDelete: (emailId: string) => void
}

export function Archivados({ archivedEmails, onRestore, onPermanentDelete }: ArchivadosProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredEmails = archivedEmails.filter(
    (email) =>
      email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.preview.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Archivados</h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar en archivados..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Email List */}
      <div className="flex-1 overflow-auto">
        {filteredEmails.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>No hay correos archivados</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredEmails.map((email) => (
              <div key={email._id} className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-medium text-sm text-foreground">{email.sender}</span>
                      <span className="text-xs text-muted-foreground">{email.time}</span>
                    </div>
                    <h3 className="font-medium text-foreground mb-1 truncate">{email.subject}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{email.preview}</p>
                  </div>

                  {/* Actions Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-popover border-border">
                      <DropdownMenuItem
                        onClick={() => onRestore(email._id)}
                        className="text-blue-600 hover:text-blue-500 hover:bg-accent"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Restaurar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onPermanentDelete(email._id)}
                        className="text-red-600 hover:text-red-500 hover:bg-accent"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar permanentemente
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
