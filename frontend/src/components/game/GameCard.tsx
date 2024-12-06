"use client"
import { addGameToLibrary, getGameCompletion } from "@/api/api";
import { GameCompletion } from "@/types/completion";
import { Game } from "@/types/games";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./GameCard.module.css";
import { getUserSession } from "@/lib/session";

export function GameCard({game, hideDetails}: {game: Game, hideDetails: boolean}) {
    const session = getUserSession();
    const [gameCompletion, setGameCompletion] = useState<GameCompletion|null>(null);

    useEffect(() => {
        if(session) getGameCompletion(session.username, game.identifier).then(value => value.success ? setGameCompletion(value.value) : null);
    }, [setGameCompletion])

    return <div className={styles.gamecard}>
        <h1>{game.name}</h1>
        <i>{game.releaseYear}</i>
        <p>{game.description}</p>
        <div className={styles.actions}>
            {!hideDetails && <Link href={`/g/${game.identifier}`}><button>Details</button></Link>}
            { session && session.type === "player" && 
            <Link href={gameCompletion === null ? window.location : `/dashboard/games/g/${game.identifier}`}><button onClick={() => {
                if(gameCompletion === null && session) {
                    addGameToLibrary(session.username, game.identifier).then(r => {
                        if(r.success) {
                            window.location.href = `/dashboard/games/g/${game.identifier}`;
                        }
                    })
                }
            }}>{gameCompletion === null ? `Add to Library` : `View in Library`}</button></Link>}
        </div>
    </div>
}
