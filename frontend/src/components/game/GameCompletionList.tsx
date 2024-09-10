"use client"

import { getGameCompletionCategories, getGameCompletions } from "@/api/api";
import { GameListFilter, GameListSearch, GameListSort } from "@/types/games";
import styles from "./GameCompletionList.module.css";
import { useEffect, useState } from "react";
import { GameCompletion, GameCompletionCategory } from "@/types/completion";
import { GameCompletionCard } from "./GameCompletionCard";

export function GameCompletionList({username, sort, filter, search, canEdit}: {username: string, sort: GameListSort, filter: GameListFilter, search: GameListSearch, canEdit: boolean}) {
    const [gameCompletions, setGameCompletions] = useState<GameCompletion[]|null>(null);
    const [customCompletionCategories, setCompletionCategories] = useState<GameCompletionCategory[]|null>(null);

    const updateCompletion = (game: string, status: GameCompletion["status"], customStatus: string | null) => {
        const newCompletions = structuredClone(gameCompletions);
        if(!newCompletions) return;

        for(const c of newCompletions) {
            if(c.game.identifier === game) {
                c.status = status;
                c.customStatus = customStatus;
            }
        }

        setGameCompletions(newCompletions);
    }

    useEffect(() => {
        getGameCompletions(username, sort, filter, search).then(value => value.success ? setGameCompletions(value.value) : null);
        getGameCompletionCategories(username).then(value => value.success ? setCompletionCategories(value.value) : null);
    }, [setGameCompletions])

    if(!gameCompletions || !customCompletionCategories) return <></>

    return <div className={styles.gamelist}>
        {gameCompletions.map(completion => <GameCompletionCard gameCompletion={completion} setCompletion={canEdit ? updateCompletion : undefined} categories={customCompletionCategories}/>)}
    </div>
}
