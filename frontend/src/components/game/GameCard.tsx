import { addGameToLibrary, getGameCompletion } from "@/api/api";
import { GameCompletion } from "@/types/completion";
import { Game } from "@/types/games";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./GameCard.module.css";

export function GameCard({game}: {game: Game}) {
    const [gameCompletion, setGameCompletion] = useState<GameCompletion|null>(null);

    useEffect(() => {
        getGameCompletion("avery", game.identifier).then(value => value.success ? setGameCompletion(value.value) : null);
    }, [setGameCompletion])

    return <div className={styles.gamecard}>
        <div className={styles.coverart} style={{backgroundImage: `url(/assets/gameart/${game.identifier}.jpg)`}} />
        <div className={styles.details}>
            <h1>{game.name}</h1>
            <i>{game.releaseYear}</i>
            <p>{game.description}</p>
        </div>
        <Link href={`/g/${game.identifier}`}><button>Details</button></Link>
        <Link href={gameCompletion === null ? window.location : `/dashboard/games/g/${game.identifier}`}><button onClick={() => {
            if(gameCompletion === null) {
                addGameToLibrary("avery", game.identifier).then(r => {
                    if(r.success) {
                        window.location.href = `/dashboard/games/g/${game.identifier}`;
                    }
                })
            }
        }}>{gameCompletion === null ? `Add to Library` : `View in Library`}</button></Link>
    </div>
}
