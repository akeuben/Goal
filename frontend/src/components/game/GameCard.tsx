import styles from "./GameCard.module.css";
import { Game } from "@/types/games";

export function GameCard({game}: {game: Game}) {
    return <div className={styles.gamecard}>
        <div className={styles.details}>
            <h1>{game.name}</h1>
            <i>{game.releaseYear}</i>
        </div>
        <button>Details</button>
        <button>Track Progress</button>
    </div>
}
