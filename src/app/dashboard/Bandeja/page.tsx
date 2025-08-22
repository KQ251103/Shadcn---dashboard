
"use client"

import { Archivados } from "@/components/archivados"
import { Eliminados } from "@/components/eliminados"
import { InboxView } from "@/components/inboxView"
import { useEffect, useState } from "react"

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

export default function DashboardPage() {
  const [emails, setEmails] = useState<Email[]>([])
  const [deletedEmails, setDeletedEmails] = useState<Email[]>([])
  const [archivedEmails, setArchivedEmails] = useState<Email[]>([])
  
  const [currentView, setCurrentView] = useState<"inbox" | "deleted" | "archived">("inbox")
  

  const handlePin = async (emailId: string) => {
    try{
      const response = await fetch(`http://localhost:5000/api/email/${emailId}/pin`,{
        method:"PATCH",
      })
      if(!response.ok){
        throw new Error("Error al fijar correo electronico");
      }
      const updatedEmail = await response.json();
      setEmails(emails.map((email) => email._id === emailId ? updatedEmail.email : email));
    }catch(error){
      console.error("Error al fijar correo electronico: ", error);
      alert("No se pudo fijar el correo. Intenta de nuevo.")
    } 
  };
  

  const handleArchive = async (emailId: string) => {
  try {
    const response = await fetch(`http://localhost:5000/api/email/${emailId}/archive`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isArchived: true })
    });
    if (!response.ok) {
      throw new Error("Error al archivar correo electrónico");
    }
    const updatedEmail = await response.json();
    setArchivedEmails([...archivedEmails, updatedEmail.email]);
    setEmails(emails.filter((email) => email._id !== emailId));
  } catch (error) {
    console.error("Error al archivar correo electrónico:", error);
    alert("No se pudo archivar correctamente el correo electrónico. Por favor, inténtalo de nuevo.");
  }
};
useEffect(() => {
  const fetchArchivedEmails = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/email/archived`);
      const data = await res.json();
      setArchivedEmails(data);
    } catch (error) {
      console.error("Error al obtener correos archivados:", error);
    }
  };
  fetchArchivedEmails();
}, []);

  const handleDelete = async (emailId: string) => {
    try{
      const response = await fetch(`http://localhost:5000/api/email/${emailId}/trash`,{
        method:"PATCH",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({status:"trash"})
      });
      if(!response.ok){
        throw new Error("Error al mover correo electronico a eliminados");
      }
      const updatedEmail = await response.json();
      setDeletedEmails([...deletedEmails, updatedEmail.email])
      setEmails(emails.filter((email) => email._id !== emailId))
    }catch(error){
      console.error("Error al eliminar correo electronico:",error);
      alert("No se pudo eliminar correctamente el correo electronico. Por favor, intentelo de nuevo.")
    }

  }
  useEffect(() => {
  const fetchEliminatedEmails = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/email/deleted`);
      const data = await res.json();
      setDeletedEmails(data);
    } catch (error) {
      console.error("Error al obtener correos archivados:", error);
    }
  };
  fetchEliminatedEmails();
}, []);

  const handleRestore = async (emailId: string) => {
    try{
      const response=await fetch(`http://localhost:5000/api/email/${emailId}/restore`,{
        method:"PATCH",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({status:"inbox"})
      });
      if(!response.ok){
        throw new Error("Error al restaurar correo electronico");
      }
      const updatedEmail = await response.json();
      setEmails([...emails, updatedEmail.email])
      setDeletedEmails(deletedEmails.filter((email) => email._id !== emailId))
    }catch(error){
      console.error("Error al restaura correo electronico:",error);
      alert("No se pudo restaurar el correo electronico. Por favor, intentelo de nuevo.");
    }
  };

  const handleRestoreArchived = async (emailId: string) => {
    try{
      const response = await fetch(`http://localhost:5000/api/email/${emailId}/restore`,{
        method:"PATCH",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({status:"inbox"})
      })
      if(!response.ok){
        throw new Error("Error al restaurar correo");
      }
      const updatedEmail = await response.json();
      setEmails([...emails, updatedEmail.email || updatedEmail]);
      setArchivedEmails(archivedEmails.filter((email) => email._id !== emailId))
    }catch(error){
      console.error("Error al restaurar correo:",error);
      alert("No se pudo restaurar el correo. Por favor, inténtalo de nuevo.")
    }
  };

  const handlePermanentDelete = async (emailId: string) => {
    try{
      const response = await fetch(`http://localhost:5000/api/email/${emailId}`,{
        method:"DELETE"
      });
      if(!response.ok){
        throw new Error("Error al eliminar correo definitivamente");
      }
      setDeletedEmails(deletedEmails.filter((email) => email._id !== emailId));
    }catch(error){
      console.error("Error al eliminar correo:",error);
      alert("No se pudo eliminar el correo definitivamente. Por favor, intentalo de nuevo.");
    }
    
  }

  const handlePermanentDeleteArchived = async (emailId: string) => {
    try{
      const response = await fetch(`http://localhost:5000/api/email/${emailId}`,{
        method:"DELETE"
      });
      if(!response.ok){
        throw new Error("Error al eliminar correo electronico permanentemente");
      }
      setArchivedEmails(archivedEmails.filter((email) => email._id !== emailId));
    }catch(error){
      console.error("Error al eliminar correo electronico permanentemente", error);
      alert("No se pudo eliminar perminentemente el correo eletronico. Por favor, intentalo de nuevo.")
    }
    
  }
  
  useEffect(()=>{
    const fetchEmail = async () =>{
      const res  = await fetch("http://localhost:5000/api/email/inbox")
      const data = await res.json()
      setEmails(data)
      }
      fetchEmail()
  },[]);

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
