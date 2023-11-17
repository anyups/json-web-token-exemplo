'use client'

import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from '../main.module.css';
import { Suspense, useState } from "react";
import { postUser } from "@/app/functions/handlerAcessAPI";
import { useRouter } from "next/navigation";
import handlerAcessUser from "@/app/functions/handlerAcess";

export default async function Login() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { push } = useRouter();

  const handlerFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await postUser(user);
      return push("/pages/dashboard");
    } catch {
      return toast.error("Erro");
    }
  };

  return (
    <div>
        <Suspense fallback={
                <div className={styles.loading}>
                <div className={styles.animacao}>
                    <div className={styles.circulo}></div>
                    <div className={styles.circulo}></div>
                    <div className={styles.circulo}></div>
                    <div className={styles.sombra}></div>
                    <div className={styles.sombra}></div>
                    <div className={styles.sombra}></div>
                    <span>Carregando</span>
                </div>
                </div>
            }></Suspense>
    <div className={styles.body}>
    <div className={styles.container}>
	<div className={styles.screen}>
		<div className={styles.form} onSubmit={handlerAcessUser}>
      <h1 className={styles.h1}>cadastro</h1>
			<form className={styles.content} onSubmit={handlerLogin}>
                <div className={styles.cardInput}>
					<input type="text" className={styles.input} placeholder="Username" value={user.name} onChange={(e) => {setUser({ ...user, name: e.target.value});}}/>
				</div>
				<div className={styles.cardInput}>
					<input type="email" className={styles.input} placeholder="Email" value={user.email} onChange={(e) => {setUser({ ...user, email: e.target.value});}}/>
				</div>
				<div className={styles.cardInput}>
					<input type="password" className={styles.input} placeholder="Password" value={user.password} onChange={(e) => {setUser({ ...user, password: e.target.value});}}/>
				</div>
				<button className={styles.botao}>
					<span>Cadastrar</span>
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
</div>
  )
}