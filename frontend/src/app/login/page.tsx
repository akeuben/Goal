"use client"
import { createSession } from "@/api/api";
import { useRef } from "react";
import styles from "./page.module.css";
import { setSession } from "@/lib/session";
import Link from "next/link";
import { log } from "util";

export default function Login() {
    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const status = useRef<HTMLElement>(null);
    const loginButton = useRef<HTMLButtonElement>(null);
    return (
        <div className={styles.page}>
            <h1>Login</h1>
            <i ref={status}>&nbsp;</i>
            <input type="text" placeholder="username" ref={username} onKeyUp={(e) => (e.key === "Enter" || e.key === "Return") && password.current ? password.current.focus() : {}}/>
            <input type="password" placeholder="password" ref={password} onKeyUp={(e) => (e.key === "Enter" || e.key === "Return") && loginButton.current ? loginButton.current.click() : {}}/>
            <button onClick={() => {
                if(!username.current || !password.current) return;
                createSession(username.current.value, password.current.value).then(res => {
                    if(status.current && !res.success) {
                        status.current.innerText = res.error.message;
                        return;
                    }

                    if(res.success) {
                        setSession(res.value);
                        window.location.href = window.location.protocol + "/dashboard";
                    }
                })
            }} ref={loginButton}>login</button>
            <p>Don't have an account yet? <Link href="/register">Register</Link></p>
        </div>
    );
}

