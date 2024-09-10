"use client"
import { CompletionToColor } from "@/lib/completions";
import styles from "./GameCompletionCard.module.css";
import { GameCompletion, GameCompletionCategory } from "@/types/completion";
import { updateGameCompletionBuiltin } from "@/api/api";

export function GameCompletionCard({gameCompletion, setCompletion, categories}: {gameCompletion: GameCompletion, setCompletion?: (game: string, status: GameCompletion['status'], customStatus: string | null) => void, categories: GameCompletionCategory[]}) {
    return <div>
        <div className={styles.coverart} style={{backgroundImage: `url(/assets/gameart/${gameCompletion.game.identifier}.jpg)`}} />
        <h1>{gameCompletion.game.name}</h1>
        <i>{gameCompletion.game.releaseYear}</i>
        <div className={styles.status} style={{"--dot-color": CompletionToColor(gameCompletion, categories), border: "none"} as React.CSSProperties}>
            <select disabled={!setCompletion} onChange={(e) => {
                const selectElement = e.target;
                const value = selectElement.selectedOptions[0].value as 'not_started' | 'in_progress' | 'complete';
                if(value.startsWith("custom/")) {
                    const customCategory = value.split("/").splice(1).join("/");
                    // todo: update custom
                    return;
                }
                console.log("test");
                updateGameCompletionBuiltin(gameCompletion.user, gameCompletion.game.identifier, value).then(result => {
                    console.log("Result: " + result.success);
                    if(result.success && setCompletion) {
                        setCompletion(gameCompletion.game.identifier, value, null);
                    } else {
                        selectElement.selectedIndex = ([].slice.call(selectElement.options) as HTMLOptionElement[]).filter(a => a.value === gameCompletion.status)[0].index || 0;
                    }
                })
            }}>
                <optgroup label="Default Categories">
                    <option selected={gameCompletion.status === "not_started"} value="not_started">Not Started</option>
                    <option selected={gameCompletion.status === "in_progress"} value="in_progress">In Progress</option>
                    <option selected={gameCompletion.status === "complete"} value="complete">Complete</option>
                </optgroup>
                <optgroup label="Custom Categories">
                    {categories.map(c => (
                        <option selected={gameCompletion.status === "custom" && gameCompletion.customStatus === c.name} value={`custom/${c.name}>`}>{c.name}</option>
                    ))}
                </optgroup>
            </select>
        </div>
    </div>
}
