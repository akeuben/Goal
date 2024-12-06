"use client"
import Link from "next/link";
import { ReactNode } from "react";
import styles from "./layout.module.css";
import { usePathname } from "next/navigation";
import { getUserSession } from "@/lib/session";

export default function Layout({children}: {children: ReactNode[]}) {
    const path = usePathname();
    const type = getUserSession()?.type || "player";

    return <div className={styles.main}>
        <nav className={styles.navigation}>
            {type === "player" && <>
                <Link href="/dashboard/games"><button className={path === "/dashboard/games" ? styles.active : undefined}>Your Games</button></Link>
                <Link href="/dashboard/categories"><button className={path === "/dashboard/categories" ? styles.active : undefined}>Categories</button></Link>
            </>}
            {type === "developer" && <>
                <Link href="/dashboard/developer"><button className={path === "/dashboard/developer" ? styles.active : undefined}>Developer</button></Link>
            </>}
        </nav>
        <div>
            {children}
        </div>
    </div>
}
