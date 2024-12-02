"use client"
import Link from "next/link";
import { ReactNode } from "react";
import styles from "./layout.module.css";
import { usePathname } from "next/navigation";

export default function Layout({children}: {children: ReactNode[]}) {
    const path = usePathname();

    return <div className={styles.main}>
        <nav className={styles.sidebar}>
            <h1>Dashboard</h1>
            <Link className={path === "/dashboard/games" ? styles.active : undefined} href="/dashboard/games"><button>Your Games</button></Link>
            <Link className={path === "/dashboard/categories" ? styles.active : undefined} href="/dashboard/categories"><button>Categories</button></Link>
            <Link className={path === "/dashboard/developer" ? styles.active : undefined} href="/dashboard/developer"><button>Developer</button></Link>
        </nav>
        <div>
            <h1>{path.split("/").findLast(() => true)}</h1>
            <main>
                {children}
            </main>
        </div>
    </div>
}
