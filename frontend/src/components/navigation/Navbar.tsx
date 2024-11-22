"use client"
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

const links: Record<string, string> = {
    "Home": "/",
    "Games": "/games",
    "Dashboard": "/dashboard",
    "Profile": "/u/test"
}

export default function Navbar() {
    const currentPath = usePathname();
    const [user, setUser] = useState<string|null>(null);

    useEffect(() => {
        const cookies = document.cookie.split('; ').reduce((prev: Record<string, string>, current) => {
            const [name, ...value] = current.split('=');
            prev[name] = value.join('=');
            return prev;
        }, {});
        setUser(cookies.username || null);
    }, [setUser]);

    return <nav className={styles.navbar}>
        <h1>Project Name</h1>
        <div className={styles.links}>
            {Object.keys(links).map(key => (
                <Link key={key} 
                      className={currentPath === links[key] ? styles.active : undefined} 
                      href={links[key]}>
                    {key}
                </Link>
            ))}
            { user ?
                <>
                    <Link className={currentPath === `/u/${user}` ? styles.active : undefined} 
                          href={`/u/${user}`}>
                          Profile
                    </Link>
                    <Link href={`/logout`}>
                          Logout
                    </Link>
                </>
                : 
                <>
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
