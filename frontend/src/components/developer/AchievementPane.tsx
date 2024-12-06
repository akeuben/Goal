"use client"
import { addAchievement, removeAchievement, updateAchievement } from "@/api/api";
import { Achievement } from "@/types/achievements";
import { Game } from "@/types/games";
import { useRef } from "react";
import styles from "./Developer.module.css";

export const AchievementPane = ({game, achievements}: {game: Game, achievements: Achievement[]}) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const spoilerRef = useRef<HTMLSelectElement>(null);
    const scoreRef = useRef<HTMLInputElement>(null);

    return <div>
        {
            achievements.map(achievement => <AchievementCard key={achievement.identifier} achievement={achievement} />)
        }
        <h2>Create New Achievement</h2>
        <div className={styles.pane + " " + styles["two-col"]}>
            <b>Achievement Name</b>
            <input type="text" ref={nameRef} />
            <b>Achievement Description</b>
            <input type="text" ref={descriptionRef} />
            <b>Achievement Spoiler</b>
            <select ref={spoilerRef}>
                <option value="true">Spoiler</option>
                <option value="false">Non-Spoiler</option>
            </select>
            <b>Achievement Score</b>
            <input type="number" ref={scoreRef} />
            <button onClick={() => {
                if(!nameRef.current || !descriptionRef.current || !spoilerRef.current || !scoreRef.current) return;
                addAchievement(game.identifier, nameRef.current.value, descriptionRef.current.value, parseInt(scoreRef.current.value), spoilerRef.current.value === "true").then(() => {
                    window.location = window.location;
                });
            }}>Save</button>
        </div>
    </div>
}

const AchievementCard = ({achievement}: {achievement: Achievement}) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const spoilerRef = useRef<HTMLSelectElement>(null);
    const scoreRef = useRef<HTMLInputElement>(null);

    console.log(achievement);

    return <div className={styles.pane + " " + styles["two-col"]}>
        <b>Achievement Name</b>
        <input type="text" ref={nameRef} defaultValue={achievement.name} />
        <b>Achievement Description</b>
        <input type="text" ref={descriptionRef} defaultValue={achievement.description} />
        <b>Achievement Spoiler</b>
        <select defaultValue={achievement.spoiler + ""} ref={spoilerRef}>
            <option value="true">Spoiler</option>
            <option value="false">Non-Spoiler</option>
        </select>
        <b>Achievement Score</b>
        <input type="number" ref={scoreRef} defaultValue={achievement.score} />
        <button onClick={() => {
            if(!nameRef.current || !descriptionRef.current || !spoilerRef.current || !scoreRef.current) return;
            updateAchievement(achievement.identifier + "", achievement.game.identifier, nameRef.current.value, descriptionRef.current.value, parseInt(scoreRef.current.value), spoilerRef.current.value === "true").then(() => {
                window.location = window.location;
            });
        }}>Save</button>
        <span />
        <button onClick={() => {
            removeAchievement(achievement.identifier + "").then(() => {
                window.location = window.location;
            });
        }}>
            Delete
        </button>
    </div>
}
