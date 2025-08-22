"use client"

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/form/login", { // ajusta puerto/URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Error al iniciar sesión");
        return;
      }

      // Guardar token para futuras peticiones
      localStorage.setItem("token", data.token);
      alert("Login exitoso!");

      // Redirigir a otra página
      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      alert("Error en el servidor");
    }
  };
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
