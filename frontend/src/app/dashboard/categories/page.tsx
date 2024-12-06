"use client"

import styles from "./page.module.css";
import { createGameCompletionCategory, getGameCompletionCategories, removeGameCompletionCategory, updateGameCompletionCategoryColour, updateGameCompletionCategoryName, updateGameCompletionCategoryOrder } from "@/api/api";
import { CompletionToColor } from "@/lib/completions";
import { getUserSession } from "@/lib/session";
import { GameCompletionCategory } from "@/types/completion";
import { ReactNode, useEffect, useState } from "react";

export default function Page() {
    const session = getUserSession();
    if(!session) {
        window.location.href = window.location.protocol + "/login";
        return <></>
    }
    if(session.type !== 'player') {
        window.location.href = window.location.protocol + "/dashboard";
        return <></>
    }

    const [customCompletionCategories, setCompletionCategories] = useState<GameCompletionCategory[]|null>(null);
    const [oldNames, setOldNames] = useState<string[]>([]);

    useEffect(() => {
        getGameCompletionCategories(session.username).then(value => {
            value.success ? setCompletionCategories(value.value) : null;
            setOldNames(value.success ? value.value.map(c => c.name) : []);
        })
    }, [setCompletionCategories])

    if(!customCompletionCategories) return <></>

    return <div className={styles.page}>
        <div className={styles.section}>
            <h2>Builtin Categories</h2>
            <div className={styles.category}><input type="color" defaultValue={CompletionToColor('not_started', null, [])} disabled={true}/><input type="text" disabled={true} value="Not Started"/></div>
            <div className={styles.category}><input type="color" defaultValue={CompletionToColor('in_progress', null, [])} disabled={true} /><input type="text" disabled={true} value="In Progress"/></div>
            <div className={styles.category}><input type="color" defaultValue={CompletionToColor('complete', null, [])} disabled={true} /><input type="text" disabled={true} value="Complete"/></div>
        </div>
        <div className={styles.section}>
            <h2>Your Categories</h2>
            {
                customCompletionCategories.map((c, i): [ReactNode, number] => [
                    <div className={styles.category} key={c.order}><input type="color" value={c.colour} onChange={(e) => {
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
                    }} onKeyUp={(e) => {
                        if(e.key === 'Enter' || e.key === "Return") {
                            e.currentTarget.blur();
                        }
                    }}/>
                    <span />
                    <a onClick={() => {
                        removeGameCompletionCategory(c.user, c.name).then(result => {
                            if(result.success) {
                                const newCategories = structuredClone(customCompletionCategories).filter(c2 => c.name != c2.name);
                                setCompletionCategories(newCategories);
                                const newOldNames = structuredClone(oldNames).filter(n => n !== c.name);
                                setOldNames(newOldNames);
                            }
                        });
                    }}>🗑</a>
                    <a onClick={() => {
                        updateGameCompletionCategoryOrder(c.user, c.name, "prev").then(result => {
                            if(result.success) {
                                setCompletionCategories(result.value);
                                setOldNames(result.value.map(a => a.name));
                            }
                        });
                    }}>⬆</a>
                    <a onClick={() => {
                        updateGameCompletionCategoryOrder(c.user, c.name, "next").then(result => {
                            if(result.success) {
                                setCompletionCategories(result.value);
                                setOldNames(result.value.map(a => a.name));
                            }
                        });
                    }}>⬇</a></div>, 
                    c.order
                ]).sort((a, b) => (a[1]-b[1])).map(a => a[0])
            }
            <input type="text" className={styles.new} placeholder="New Category" onBlur={e => {
                const target = e.currentTarget;
                createGameCompletionCategory(session.username, e.currentTarget.value).then(result => {
                    if(result.success) {
                        const old: GameCompletionCategory[] = [...customCompletionCategories, {
                            user: session.username,
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
            }} onKeyUp={(e) => {
                if(e.key === 'Enter' || e.key === "Return") {
                    e.currentTarget.blur();
                }
            }}/>
        </div>
    </div>
}
