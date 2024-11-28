"use client"

import styles from "./page.module.css";
import { createGameCompletionCategory, getGameCompletionCategories, removeGameCompletionCategory, updateGameCompletionCategoryColour, updateGameCompletionCategoryName, updateGameCompletionCategoryOrder } from "@/api/api";
import { CompletionToColor } from "@/lib/completions";
import { GameCompletionCategory } from "@/types/completion";
import { useEffect, useState } from "react";

const trace = (a: any) => {
    console.log(a)
    return a;
}

export default function Page() {
    const [customCompletionCategories, setCompletionCategories] = useState<GameCompletionCategory[]|null>(null);
    const [oldNames, setOldNames] = useState<string[]>([]);

    useEffect(() => {
        getGameCompletionCategories("avery").then(value => {
            value.success ? setCompletionCategories(value.value) : null;
            setOldNames(value.success ? value.value.map(c => c.name) : []);
        })
    }, [setCompletionCategories])

    if(!customCompletionCategories) return <></>

    return <div className={styles.page}>
        <h2>Builtin Categories</h2>
        <p><input type="color" defaultValue={CompletionToColor('not_started', null, [])} disabled={true}/><input type="text" disabled={true} value="Not Started"/></p>
        <p><input type="color" defaultValue={CompletionToColor('in_progress', null, [])} disabled={true} /><input type="text" disabled={true} value="In Progress"/></p>
        <p><input type="color" defaultValue={CompletionToColor('complete', null, [])} disabled={true} /><input type="text" disabled={true} value="Complete"/></p>
        <h2>Your Categories</h2>
        {
            customCompletionCategories.toSorted((a, b) => a.order - b.order).map((c, i) => <p key={c.order}><input type="color" defaultValue={trace(c.colour)} onChange={(e) => {
                const value = "" + e.target.value;
                updateGameCompletionCategoryColour(c.user, c.name, value).then(result => {
                    if(!result.success) {
                        e.target.value = c.colour;
                    } else {
                        const newCategories = structuredClone(customCompletionCategories);
                        newCategories[i].colour = value;
                        
                        setCompletionCategories(newCategories);
                    }
                });
            }}/><input type="text" value={c.name} onChange={e => {
                const newCategories = structuredClone(customCompletionCategories);
                newCategories[i].name = e.target.value;
                setCompletionCategories(newCategories);
            }} onBlur={e => {
                updateGameCompletionCategoryName(c.user, oldNames[i], e.target.value).then(result => {
                    if(!result.success) {
                        const newCategories = structuredClone(customCompletionCategories);
                        newCategories[i].name = oldNames[i];
                        setCompletionCategories(newCategories);
                    } else {
                        const old = [...oldNames];
                        old[i] = e.target.value;
                        setOldNames(old);
                    }
                });
            }}/>
            <button onClick={() => {
                removeGameCompletionCategory(c.user, c.name).then(result => {
                    if(result.success) {
                        const newCategories = structuredClone(customCompletionCategories).filter(c2 => c.name != c2.name);
                        setCompletionCategories(newCategories);
                        const newOldNames = structuredClone(oldNames).filter(n => n !== c.name);
                        setOldNames(newOldNames);
                    }
                });
            }}>Delete</button>
            <button onClick={() => {
                updateGameCompletionCategoryOrder(c.user, c.name, "prev").then(result => {
                    if(result.success) {
                        setCompletionCategories(result.value);
                        setOldNames(result.value.map(a => a.name));
                    }
                });
            }}>Up</button>
            <button onClick={() => {
                updateGameCompletionCategoryOrder(c.user, c.name, "next").then(result => {
                    if(result.success) {
                        setCompletionCategories(result.value);
                        setOldNames(result.value.map(a => a.name));
                    }
                });
            }}>Down</button></p>)
        }
        <input type="text" placeholder="New Category" onBlur={e => {
            const target = e.currentTarget;
            createGameCompletionCategory("avery", e.currentTarget.value).then(result => {
                if(result.success) {
                    const old: GameCompletionCategory[] = [...customCompletionCategories, {
                        user: "avery",
                        name: target.value,
                        order: customCompletionCategories.length + 1,
                        colour: "#000000",
                    }];
                    setCompletionCategories(old);
                    const newOldNames = [...oldNames, target.value];
                    setOldNames(newOldNames);
                }
                target.value = "";
            })
        }}/>
    </div>
}
