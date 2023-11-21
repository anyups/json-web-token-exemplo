'use client'

import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from '../main.module.css';
import { Suspense } from "react";

export default function Login() {

  const handlerLogin = async (e) => {
    e.preventDefault();
    toast.success("alteração concluída.");
  }
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
		<div className={styles.form}>
      <h1 className={styles.alter}>Alterar</h1>
			<form className={styles.content} onSubmit={handlerLogin}>
                <div className={styles.cardInput}>
					<input type="text" className={styles.input} placeholder="Username"/>
				</div>
				<div className={styles.cardInput}>
					<input type="email" className={styles.input} placeholder="Email"/>
				</div>
				<div className={styles.cardInput}>
					<input type="password" className={styles.input} placeholder="Password"/>
				</div>
				<button className={styles.botaoalter}>
					<span>Alterar</span>
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