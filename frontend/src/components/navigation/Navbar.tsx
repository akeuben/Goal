"use client"
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserSession } from "@/lib/session";
import { Session } from "@/types/session";

export default function Navbar() {
    const currentPath = usePathname();
    const [session, setSession] = useState<Session>(null);

    useEffect(() => {
        setSession(getUserSession());
    }, [setSession, currentPath]);

    return <nav className={styles.navbar}>
        <h1>GOAL</h1>
        <div className={styles.links}>
            { session ?
                <>
                    <Link className={currentPath.startsWith(`/dashboard`) ? styles.active : undefined} 
                          href={`/dashboard`}>
                          Dashboard
                    </Link>
                    <Link className={currentPath === `/games` ? styles.active : undefined} 
                          href={`/games`}>
                          Games
                    </Link>
                    <Link className={currentPath === `/u/${session.username}` ? styles.active : undefined} 
                          href={`/u/${session.username}`}>
                          Profile
                    </Link>
                    <Link href={`/logout`}>
                          Logout
                    </Link>
                </>
                : 
                <>
                    <Link className={currentPath === `/` ? styles.active : undefined} 
                          href={`/`}>
                          Home
                    </Link>
                    <Link className={currentPath.startsWith(`/games`) ? styles.active : undefined} 
                          href={`/games`}>
                          Games
                    </Link>
                    <Link className={currentPath === `/register` ? styles.active : undefined} 
                          href={`/register`}>
                          Register
                    </Link>
                    <Link className={currentPath === `/login` ? styles.active : undefined} 
                          href={`/login`}>
                          Login
                    </Link>
                </>
            }
        </div>
    </nav>
}
