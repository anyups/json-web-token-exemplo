'use client'

import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from '../main.module.css';
import { Suspense, useState } from "react";
import { postUser } from "@/app/functions/handlerAcessAPI";
import { useRouter } from "next/navigation";
import handlerAcessUser from "@/app/functions/handlerAcess";

export default function Login() {
  const [user, setUser] = useState({
    nome: '',
    senha: '',
    confirmar: ''
  });
  const { push } = useRouter();

  const handlerLogin = async (event) => {
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
					<input type="text" className={styles.input} placeholder="Username" name="nome" value={user.nome} onChange={(e) => {setUser({ ...user, nome: e.target.value});}}/>
				</div>
				<div className={styles.cardInput}>
					<input type="password" className={styles.input} placeholder="Password" name="senha" value={user.senha} onChange={(e) => {setUser({ ...user, senha: e.target.value});}}/>
				</div>
        <div className={styles.cardInput}>
					<input type="password" className={styles.input} placeholder="Password" name="confirmar" value={user.confirmar} onChange={(e) => {setUser({ ...user, confirmar: e.target.value});}}/>
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