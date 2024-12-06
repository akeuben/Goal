"use client"
import { CompletionToColor } from "@/lib/completions";
import styles from "./GameCompletionCard.module.css";
import { GameCompletion, GameCompletionCategory } from "@/types/completion";
import { getGameAchievements, getUserAchievements, updateGameCompletionBuiltin, updateGameCompletionCustom } from "@/api/api";
import Link from "next/link";
import { Achievement } from "@/types/achievements";
import { useEffect, useState } from "react";

export function GameCompletionCard({gameCompletion, setCompletion, categories, detailsPage, showAchievements}: {detailsPage: string, gameCompletion: GameCompletion, setCompletion?: (game: string, status: GameCompletion['status'], customStatus: string | null) => void, categories: GameCompletionCategory[], showAchievements: boolean}) {
    const [userAchievements, setUserAchievements] = useState<Achievement[]>([]);
    const [achievements, setAchievements] = useState<Achievement[]>([]);

    useEffect(() => {
        getUserAchievements(gameCompletion.user, gameCompletion.game.identifier).then(result => {
            if(!result.success) return;
            setUserAchievements(result.value);
        })
        getGameAchievements(gameCompletion.game.identifier).then(result => {
            if(!result.success) return;
            setAchievements(result.value);
        })
    }, [setAchievements, setUserAchievements]);

    return <div className={styles.card}>
        <h1>{gameCompletion.game.name}</h1>
        <i>{gameCompletion.game.releaseYear} - {gameCompletion.game.developers.join(", ")}</i>
        <p>{gameCompletion.game.description}</p>
        <div className={styles.statusbar}>
            <div className={styles.status} style={{"--dot-color": CompletionToColor(gameCompletion.status, gameCompletion.status === "custom" && gameCompletion.customStatus ? gameCompletion.customStatus.name : null, categories) + "88", border: "none"} as React.CSSProperties}>
                <select disabled={!setCompletion} onChange={(e) => {
                    const selectElement = e.target;
                    const value = selectElement.selectedOptions[0].value as 'not_started' | 'in_progress' | 'complete';
                    if(value.startsWith("custom/")) {
                        const customCategory = value.split("/").splice(1).join("/");
                        updateGameCompletionCustom(gameCompletion.user, gameCompletion.game.identifier, customCategory).then(result => {
                            if(result.success && setCompletion) {
                                setCompletion(gameCompletion.game.identifier, 'custom', customCategory);
                            } else if(gameCompletion.status !== "custom"){
                                selectElement.selectedIndex = ([].slice.call(selectElement.options) as HTMLOptionElement[]).filter(a => a.value === gameCompletion.status)[0]?.index || 0;
                            } else {
                                selectElement.selectedIndex = ([].slice.call(selectElement.options) as HTMLOptionElement[]).filter(a => a.value === "custom/" + gameCompletion.customStatus)[0]?.index || 0;
                            }
                        })
                        return;
                    }
                    updateGameCompletionBuiltin(gameCompletion.user, gameCompletion.game.identifier, value).then(result => {
                        if(result.success && setCompletion) {
                            setCompletion(gameCompletion.game.identifier, value, null);
                        } else if(gameCompletion.status !== "custom"){
                            selectElement.selectedIndex = ([].slice.call(selectElement.options) as HTMLOptionElement[]).filter(a => a.value === gameCompletion.status)[0]?.index || 0;
                        } else {
                            selectElement.selectedIndex = ([].slice.call(selectElement.options) as HTMLOptionElement[]).filter(a => a.value === "custom/" + (gameCompletion.customStatus ? gameCompletion.customStatus.name : ""))[0]?.index || 0;
                        }
                    })
                }} defaultValue={gameCompletion.status === "custom" ? `custom/${gameCompletion.customStatus ? gameCompletion.customStatus.name : ""}` : gameCompletion.status}>
                    <optgroup label="Default Categories">
                        <option value="custom/" hidden>Limbo</option>
                        <option value="not_started">Not Started</option>
                        <option value="in_progress">In Progress</option>
                        <option value="complete">Complete</option>
                    </optgroup>
                    <optgroup label="Custom Categories">
                        {categories.toSorted((a, b) => a.order - b.order).map(c => (
                            <option key={c.name} value={`custom/${c.name}`}>{c.name}</option>
                        ))}
                    </optgroup>
                </select>
            </div>
            {showAchievements && <div className={styles.wrapper}>
                {achievements.length === 0 ? <p>This game has no achievements</p>
                    : <p>Achievements: {userAchievements.length}/{achievements.length}</p>}
                <progress value={userAchievements.length} max={achievements.length}/>
            </div>}
        </div>
        {detailsPage && <Link href={detailsPage + gameCompletion.game.identifier}><button className={styles.details}>More Details</button></Link>}
    </div>
}
