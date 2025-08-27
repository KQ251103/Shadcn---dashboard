"use client"

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import "dotenv/config";   // o import dotenv from "dotenv"; dotenv.config();

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:5000/api/usuario/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    if (!res.ok) {
      // Si el backend devuelve error (400, 404, 500)
      alert(data.msg || "Error en el login");
      return;
    }

    // ✅ Guardar token en localStorage
    localStorage.setItem("token", data.token);

    // ✅ Guardar datos básicos del usuario (opcional)
    localStorage.setItem("usuario", JSON.stringify(data.usuario));

    alert("✅ Login exitoso!");

    // ✅ Redirigir al dashboard
    window.location.href = "/dashboard";
  } catch (error) {
    console.error("Error en el login:", error);
    alert("❌ Error en el servidor");
  }
};

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token en localStorage:", token);
    if (token) {
      console.log("Token encontrado, redirigiendo al dashboard...");
      window.location.href = "/dashboard";
      return;
    }else{
      console.log("No se encontró token, permanecer en la página de login.");
    }
  }, []);
  return (
    
     <div className={styles.bodyy}>   
     <div className={styles.login}>
    <h2 className={styles.h2}>Login</h2>
    <form className={styles.form} onSubmit={handleSubmit} >

      <div className={styles.inputt}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
        placeholder=""  
        required minLength={3} maxLength={20} className={styles.inputField}/>
        <label className={styles.label}>Email</label>
        </div>

        <div className={styles.inputt}>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
        required minLength={3} maxLength={20}  placeholder=" " className={styles.inputField}/>
        <label  className={styles.label}>Password</label>
      </div>

        <button type="submit" className={styles.button}>Sign In</button>

    </form>
    </div> 
    
   </div>
  );
}
