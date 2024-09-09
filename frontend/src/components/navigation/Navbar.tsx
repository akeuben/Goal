"use client"
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import Link from "next/link";

const links: Record<string, string> = {
    "Home": "/",
    "Games": "/games",
    "Dashboard": "/dashboard",
    "Profile": "/u/test"
}

export default function Navbar() {
    const currentPath = usePathname();

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
        </div>
    </nav>
}
