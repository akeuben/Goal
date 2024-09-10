"use client"

import styles from "./page.module.css";
import { getGameCompletionCategories, updateGameCompletionCategoryName } from "@/api/api";
import { CompletionToColor } from "@/lib/completions";
import { GameCompletionCategory } from "@/types/completion";
import { useEffect, useState } from "react";

export default function Page() {
    const [customCompletionCategories, setCompletionCategories] = useState<GameCompletionCategory[]|null>(null);
    const [oldNames, setOldNames] = useState<string[]>([]);

    useEffect(() => {
        getGameCompletionCategories("test").then(value => {
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
            customCompletionCategories.map((c, i) => <p key={c.order}><input type="color" defaultValue={c.colour} /><input type="text" value={c.name} onChange={e => {
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
            }}/></p>)
        }
    </div>
}
