"use client";

import { AppSidebar } from "@/components/app-sidebar"

import {
  SidebarInset,
  SidebarProvider,

} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Page({children}: {children: React.ReactNode}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/"); // redirige al login
      return;
    }

    // opcional: validar el token en el backend
    fetch("http://localhost:5000/api/usuario/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Token inválido");
        return res.json();
      })
      .then((data) => {
        if (data.message !== "Acceso concedido al dashboard") {
          localStorage.removeItem("token");
          router.replace("/");
        }
      })
      .catch(() => {
        router.replace("/");
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return <p className="p-4">Cargando...</p>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
