"use client"

import styles from "./page.module.css";
import { GameList } from "@/components/game/GameList";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

function getParamOrDefault<T extends string>(searchParams: ReadonlyURLSearchParams, key: string, allowedValues: T[], defaultValue: string) {
    let value = searchParams.get(key);
    if(!value || !(allowedValues as string[]).includes(value)) value = defaultValue;
    return value as typeof allowedValues[number];
}

export default function Page() {
    const searchParams = useSearchParams();

    const sortBy = getParamOrDefault(searchParams, "sortBy", ['name', 'release'], 'name')
    const sortAcending = getParamOrDefault(searchParams, "sortAcending", ['true', 'false'], 'true') === "true"
    const search = searchParams.get("q") || "";

    const updateParam = (e: ChangeEvent<HTMLSelectElement|HTMLInputElement>) => {
        const nativeParams = new URLSearchParams(searchParams.toString());
        nativeParams.set(e.target.name, e.target.value);
        window.history.pushState(null, '', `?${nativeParams.toString()}`);
    };

    return <div className={styles.page}>
        <div className={styles.controls}>
            <div>
                <label htmlFor="q">Search</label>
                <input type="text" placeholder="Search..." name="q" onChange={updateParam}/>
            </div>
            <div>
                <label htmlFor="sortBy" defaultValue={sortBy}>Sort By</label>
                <select name="sortBy" onChange={updateParam} defaultValue={sortBy}>
                    <option value="name">Name</option>
                    <option value="release">Release Year</option>
                </select>
                <select name="sortAcending" onChange={updateParam} defaultValue={sortAcending + ""}>
                    <option value="true">Acending</option>
                    <option value="false">Decending</option>
                </select>
            </div>
        </div>
        <GameList search={search} sort={{by: sortBy, acending: sortAcending}} filter={{}} />
    </div>
}
