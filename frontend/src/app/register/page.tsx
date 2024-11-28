"use client"
import { sendLoginRequest } from "@/api/api";
import { useRef } from "react";
import styles from "./page.module.css";

export default function Login() {
    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const status = useRef<HTMLElement>(null);
    return (
        <div className={styles.page}>
            <h1>Login</h1>
            <i ref={status}></i>
            <input type="text" placeholder="username" ref={username} />
            <input type="password" placeholder="password" ref={password}/>
            <button onClick={() => {
                if(!username.current || !password.current) return;
                sendLoginRequest(username.current.value, password.current.value).then(res => {
                    if(status.current && !res.success) {
                        status.current.innerText = res.error.message;
                        return;
                    }
                })
            }}>login</button>
        </div>
    );
}

