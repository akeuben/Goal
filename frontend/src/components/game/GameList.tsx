import styles from "./GameList.module.css";
import { getGameList } from "@/api/api"
import { Game } from "@/types/games"
import { DynamicServerError } from "next/dist/client/components/hooks-server-context"
import { GameCard } from "./GameCard"

export type GameListProps = {
    sort: {
        by: 'name' | 'release'
        acending: boolean
    },
    filter: {
        release?: {
            from: number,
            to: number
        },
        hasAchievements?: boolean,
    },
    search?: string
}

export function GameList({sort, filter, search}: GameListProps) {
    const gameListResult = getGameList();

    const filterGames = (game: Game) => {
        if(filter.release) {
            if(game.releaseYear < filter.release.from) return false;
            if(game.releaseYear > filter.release.to) return false;
        }
        if(filter.hasAchievements) {
            // TODO
        }
        return true;
    }

    const sortGames = (a: Game, b: Game) => {
        switch(sort.by) {
            case 'name':
                if(sort.acending) return a.name.localeCompare(b.name);
                return a.name.localeCompare(b.name);
            case 'release':
                if(sort.acending) return a.releaseYear - b.releaseYear;
                return b.releaseYear - a.releaseYear;
            default:
                throw new Error("Sort method not implemented.");
        }
    }

    if(!gameListResult.success) throw new DynamicServerError("Failed to load game list");

    const games = gameListResult.value
        .filter(game => search ? game.name.includes(search) : true)
        .filter(filterGames)
        .toSorted(sortGames);

    return <div className={styles.gamelist}>
        {games.map(game => <GameCard game={game} />)}
    </div>
}
