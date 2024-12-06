"use client"
import { createGame } from "@/api/api";
import { useRef } from "react";
import styles from "./Developer.module.css";

export const CreateGamePane = ({username}: {username: string}) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const publisherRef = useRef<HTMLInputElement>(null);
    const releaseYearRef = useRef<HTMLInputElement>(null);

    return <div className={styles.pane + " " + styles["two-col"]}>
        <b>Game Name</b>
        <input type="text" ref={nameRef} />
        <b>Game Description</b>
        <textarea ref={descriptionRef} />
        <b>Game Publisher</b>
        <input ref={publisherRef} type="text" />
        <b>Release Year</b>
        <input ref={releaseYearRef} type="number" min={1970} max={4000} />
        <button onClick={() => {
            if(!nameRef.current || !releaseYearRef.current || !descriptionRef.current || !publisherRef.current) return;
            createGame(username, nameRef.current.value, descriptionRef.current.value, parseInt(releaseYearRef.current.value), publisherRef.current.value).then(() => {
                window.location = window.location;
            })
        }}>Create</button>
    </div>
} 
