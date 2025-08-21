"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface SeguridadComponentProps {
  onBack: () => void
}

export default function SeguridadComponent({ onBack }: SeguridadComponentProps) {
  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto">
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

        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <p className="text-lg text-card-foreground">Estás aquí - Seguridad y Privacidad</p>
        </div>
      </div>
    </div>
  )
}
