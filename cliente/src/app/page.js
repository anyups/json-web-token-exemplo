'use client'
import { useState } from "react";
import handlerAcessUser from "./functions/handlerAcess"
import { useRouter } from "next/navigation";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.css';


export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { push, refresh } = useRouter();

  const handlerLogin = async (e) => {
    e.preventDefault();
    try {
      const userAuth = await handlerAcessUser(user);
      if(userAuth.token === undefined){
        toast.error("erro no e-mail ou senha!");
      }
      push('/pages/dashboard');
    } catch {
      toast.error("erro na aplicação");
    }
  }
  return (
    <div className={styles.body}>
    <div className={styles.container}>
	<div className={styles.screen}>
		<div className={styles.form}>
      <h1 className={styles.h1}>login</h1>
			<form className={styles.login} onSubmit={handlerLogin}>
				<div className={styles.cardInput}>
					<input type="email" className={styles.input} placeholder="Email" onChange={(e) => { setUser({ ...user, email: e.target.value }) }}/>
				</div>
				<div className={styles.cardInput}>
					<input type="password" className={styles.input} placeholder="Password" onChange={(e) => { setUser({ ...user, password: e.target.value }) }}/>
				</div>
				<button className={styles.botao}>
					<span>Log In</span>
				</button>				
			</form>
      <ToastContainer/>
		</div>
		<div className={styles.bg}>
			<span className={styles.desenho4}></span>
			<span className={styles.desenho3}></span>		
			<span className={styles.desenho2}></span>
			<span className={styles.desenho1}></span>
		</div>		
	</div>
</div>
</div>
  )
}
