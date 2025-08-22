

import styles from "./page.module.css";

export default function Home() {
  return (
    
     <div className={styles.bodyy}>   
     <div className={styles.login}>
    <h2 className={styles.h2}>Login</h2>
    <form action="#" className={styles.form}>

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
