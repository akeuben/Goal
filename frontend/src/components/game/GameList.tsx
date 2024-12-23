import { getGameList } from "@/api/api";
import { Game, GameListFilter, GameListSearch, GameListSort } from "@/types/games";
import { DynamicServerError } from "next/dist/client/components/hooks-server-context";
import { GameCard } from "./GameCard";
import styles from "./GameList.module.css";
import { useEffect, useState } from "react";
import { Result } from "@/types/result";

export function GameList({sort, filter, search}: {sort: GameListSort, filter: GameListFilter, search: GameListSearch}) {
    const [games, setGames] = useState<Result<Game[], Error>|null>(null);

    useEffect(() => {
        getGameList(sort, filter, search).then(value => setGames(value));
    }, [setGames, sort, filter, search])

    if(!games) return <></>

    if(!games.success) throw new DynamicServerError(`Failed to load game list ${games.error}`);

    return <div className={styles.gamelist}>
        {games.value.map(game => <GameCard key={game.identifier} game={game} />)}
    </div>
}
