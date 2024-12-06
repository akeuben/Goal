"use client"
import { useRef } from "react";
import styles from "./page.module.css";
import { register } from "@/api/api";
import Link from "next/link";

export default function Login() {
    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const type = useRef<HTMLSelectElement>(null);
    const status = useRef<HTMLElement>(null);
    return (
        <div className={styles.page}>
            <h1>Register</h1>
            <i ref={status}>&nbsp;</i>
            <input type="text" placeholder="username" ref={username} onKeyUp={(e) => (e.key === "Enter" || e.key === "Return") && password.current ? password.current.focus() : {}} />
            <input type="password" placeholder="password" ref={password} onKeyUp={(e) => (e.key === "Enter" || e.key === "Return") && email.current ? email.current.focus() : {}}/>
            <input type="email" placeholder="email" ref={email} onKeyUp={(e) => (e.key === "Enter" || e.key === "Return") && type.current ? type.current.focus() : {}}/>
            <div>
                <select ref={type}>
                    <option value="player">Player</option>
                    <option value="developer">Developer</option>
                </select>
                <button className="important" onClick={() => {
                    if(!username.current || !password.current || !email.current || !type.current) return;
                    register(username.current.value, password.current.value, email.current.value, type.current.value as 'player' | 'developer').then((res: any) => {
                        if(status.current && !res.success) {
                            status.current.innerText = res.error.message;
                            return;
                        }

                        if(res.success) {
                            window.location.href = window.location.protocol + "/login";
                        }
                    })
                }}>register</button>
            </div>
            <p>Already have an account? <Link href="/login">Login</Link></p>
        </div>
    );
}

