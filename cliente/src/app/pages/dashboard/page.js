
import { getUsers } from "@/app/functions/handlerAcessAPI";
import { Suspense } from "react";
import ListUsers from "@/app/componentes/ListUsers";
import styles from '../main.module.css';

export default async function Dashboard() {
   const users = await getUsers();
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
            }>
        <div className={styles.body}>
            <div className={styles.card}>
                <h1><ListUsers users={users}/></h1>
            </div>
        </div>
            </Suspense>
        </div>
    );
};