"use client"
import React from "react";
import {useState } from "react";
import styles from "./page.module.css";

export default function Home() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try{
    const response = await fetch("http://localhost:5000/api/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      console.error("Error:", data);
      return;
    }
    localStorage.setItem("token", data.token);
    alert("Login successful");
    window.location.href = "./dashboard";
  }catch{
    alert("Login failed");
  }
    
};

return (
    
      <div className={styles.bodyy}>   
     <div className={styles.login}>
    <h2 className={styles.h2}>Login</h2>
    <form action="#" className={styles.form} onSubmit={handleSubmit} >

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
