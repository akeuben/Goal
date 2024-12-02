"use client"
import { addAchievement, removeAchievement, updateAchievement } from "@/api/api";
import { Achievement } from "@/types/achievements";
import { Game } from "@/types/games";
import { useRef } from "react";

export const AchievementPane = ({game, achievements}: {game: Game, achievements: Achievement[]}) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const spoilerRef = useRef<HTMLInputElement>(null);
    const scoreRef = useRef<HTMLInputElement>(null);

    return <>
    {
        achievements.map(achievement => <AchievementCard achievement={achievement} />)
    }
    <div>
        <b>Achievement Name</b>
        <input type="text" ref={nameRef} />
    </div>
    <div>
        <b>Achievement Description</b>
        <input type="text" ref={descriptionRef} />
    </div>
    <div>
        <b>Achievement Spoiler</b>
        <input type="checkbox" ref={spoilerRef} />
    </div>
    <div>
        <b>Achievement Score</b>
        <input type="number" ref={scoreRef} />
    </div>
    <button onClick={() => {
        if(!nameRef.current || !descriptionRef.current || !spoilerRef.current || !scoreRef.current) return;
        addAchievement(game.identifier, nameRef.current.value, descriptionRef.current.value, parseInt(scoreRef.current.value), spoilerRef.current.checked).then(() => {
            window.location = window.location;
        });
    }}>Save</button>
    </>
}

const AchievementCard = ({achievement}: {achievement: Achievement}) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const spoilerRef = useRef<HTMLInputElement>(null);
    const scoreRef = useRef<HTMLInputElement>(null);

    return <div>
        <div>
            <b>Achievement Name</b>
            <input type="text" ref={nameRef} defaultValue={achievement.name} />
        </div>
        <div>
            <b>Achievement Description</b>
            <input type="text" ref={descriptionRef} defaultValue={achievement.description} />
        </div>
        <div>
            <b>Achievement Spoiler</b>
            <input type="checkbox" ref={spoilerRef} defaultChecked={achievement.spoiler} />
        </div>
        <div>
            <b>Achievement Score</b>
            <input type="number" ref={scoreRef} defaultValue={achievement.score} />
        </div>
        <button onClick={() => {
            if(!nameRef.current || !descriptionRef.current || !spoilerRef.current || !scoreRef.current) return;
            updateAchievement(achievement.identifier + "", achievement.game.identifier, nameRef.current.value, descriptionRef.current.value, parseInt(scoreRef.current.value), spoilerRef.current.checked).then(() => {
                window.location = window.location;
            });
        }}>Save</button>
        <button onClick={() => {
            removeAchievement(achievement.identifier + "").then(() => {
                window.location = window.location;
            });
        }}>
            Delete
        </button>
    </div>
}
