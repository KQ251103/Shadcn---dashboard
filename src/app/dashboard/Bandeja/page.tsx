/* eslint-disable react/jsx-no-undef */
"use client"



import { Archivados } from "@/components/archivados"
import { Eliminados } from "@/components/eliminados"
import { InboxView } from "@/components/inboxView"
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

const initialEmails: Email[] = [
  {
    id: 1,
    sender: "GitHub",
    senderEmail: "noreply@github.com",
    subject: "Your weekly digest",
    preview: "Here are the highlights from your repositories this week...",
    time: "2 min ago",
    isRead: false,
    isPinned: false,
    hasAttachment: false,
  },
  {
    id: 2,
    sender: "Vercel",
    senderEmail: "team@vercel.com",
    subject: "Deployment successful",
    preview: "Your application has been successfully deployed to production...",
    time: "1 hour ago",
    isRead: true,
    isPinned: false,
    hasAttachment: false,
  },
  {
    id: 3,
    sender: "Linear",
    senderEmail: "notifications@linear.app",
    subject: "Issue assigned to you",
    preview: "A new issue has been assigned to you in the Design System project...",
    time: "3 hours ago",
    isRead: false,
    isPinned: false,
    hasAttachment: true,
  },
  {
    id: 4,
    sender: "Figma",
    senderEmail: "hello@figma.com",
    subject: "New comment on your design",
    preview: "Sarah left a comment on your latest design file...",
    time: "5 hours ago",
    isRead: true,
    isPinned: false,
    hasAttachment: false,
  },
  {
    id: 5,
    sender: "Slack",
    senderEmail: "notifications@slack.com",
    subject: "Daily digest from #general",
    preview: "You have 12 new messages in your workspace...",
    time: "1 day ago",
    isRead: true,
    isPinned: false,
    hasAttachment: false,
  },
]

export default function DashboardPage() {
  const [emails, setEmails] = useState<Email[]>(initialEmails)
  const [deletedEmails, setDeletedEmails] = useState<Email[]>([])
  const [archivedEmails, setArchivedEmails] = useState<Email[]>([])
  const [currentView, setCurrentView] = useState<"inbox" | "deleted" | "archived">("inbox")

  const handlePin = (emailId: number) => {
    setEmails(emails.map((email) => (email.id === emailId ? { ...email, isPinned: !email.isPinned } : email)))
  }

  const handleArchive = (emailId: number) => {
    const emailToArchive = emails.find((email) => email.id === emailId)
    if (emailToArchive) {
      setArchivedEmails([...archivedEmails, emailToArchive])
      setEmails(emails.filter((email) => email.id !== emailId))
    }
  }

  const handleDelete = (emailId: number) => {
    const emailToDelete = emails.find((email) => email.id === emailId)
    if (emailToDelete) {
      setDeletedEmails([...deletedEmails, emailToDelete])
      setEmails(emails.filter((email) => email.id !== emailId))
    }
  }

  const handleRestore = (emailId: number) => {
    const emailToRestore = deletedEmails.find((email) => email.id === emailId)
    if (emailToRestore) {
      setEmails([...emails, emailToRestore])
      setDeletedEmails(deletedEmails.filter((email) => email.id !== emailId))
    }
  }

  const handleRestoreArchived = (emailId: number) => {
    const emailToRestore = archivedEmails.find((email) => email.id === emailId)
    if (emailToRestore) {
      setEmails([...emails, emailToRestore])
      setArchivedEmails(archivedEmails.filter((email) => email.id !== emailId))
    }
  }

  const handlePermanentDelete = (emailId: number) => {
    setDeletedEmails(deletedEmails.filter((email) => email.id !== emailId))
  }

  const handlePermanentDeleteArchived = (emailId: number) => {
    setArchivedEmails(archivedEmails.filter((email) => email.id !== emailId))
  }

  return (
    <div className="h-screen bg-background">
      <div className="bg-card p-4 border-b border-border">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentView("inbox")}
              className={`px-4 py-2 rounded transition-colors ${
                currentView === "inbox"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              Bandeja de entrada ({emails.length})
            </button>
            <button
              onClick={() => setCurrentView("archived")}
              className={`px-4 py-2 rounded transition-colors ${
                currentView === "archived"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              Archivados ({archivedEmails.length})
            </button>
            <button
              onClick={() => setCurrentView("deleted")}
              className={`px-4 py-2 rounded transition-colors ${
                currentView === "deleted"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              Eliminados ({deletedEmails.length})
            </button>
          </div>
         
        </div>
      </div>

      {currentView === "inbox" ? (
        <InboxView emails={emails} onPin={handlePin} onArchive={handleArchive} onDelete={handleDelete} />
      ) : currentView === "archived" ? (
        <Archivados
          archivedEmails={archivedEmails}
          onRestore={handleRestoreArchived}
          onPermanentDelete={handlePermanentDeleteArchived}
        />
      ) : (
        <Eliminados deletedEmails={deletedEmails} onRestore={handleRestore} onPermanentDelete={handlePermanentDelete} />
      )}
    </div>
  )
}
