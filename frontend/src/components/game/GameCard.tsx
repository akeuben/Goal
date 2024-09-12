import Link from "next/link";
import styles from "./GameCard.module.css";
import { Game } from "@/types/games";
import { useEffect, useState } from "react";
import { getGameCompletion, getGameCompletions } from "@/api/api";
import { GameCompletion } from "@/types/completion";

export function GameCard({game}: {game: Game}) {
    const [gameCompletion, setGameCompletion] = useState<GameCompletion|null>(null);

    useEffect(() => {
        getGameCompletion("test", game.identifier).then(value => value.success ? setGameCompletion(value.value) : null);
    }, [setGameCompletion])

    return <div className={styles.gamecard}>
        <div className={styles.coverart} style={{backgroundImage: `url(/assets/gameart/${game.identifier}.jpg)`}} />
        <div className={styles.details}>
            <h1>{game.name}</h1>
            <i>{game.releaseYear}</i>
            <p>{game.description}</p>
        </div>
        <Link href={`/g/${game.identifier}`}><button>Details</button></Link>
        <button>{gameCompletion === null ? `Add to Library` : `View in Library`}</button>
    </div>
}
