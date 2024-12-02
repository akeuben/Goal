"use client"

import { updateGameDescription, updateGameName, updateGamePublisher, updateGameReleaseYear } from "@/api/api";
import { Game } from "@/types/games"
import { useRef } from "react"

export const GameDetailPane = ({game}: {game: Game}) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const publisherRef = useRef<HTMLInputElement>(null);
    const releaseYearRef = useRef<HTMLInputElement>(null);

    return <div>
        <div>
            <b>Game Name</b>
            <input type="text" ref={nameRef} defaultValue={game.name} />
            <button onClick={() => {
                if(!nameRef.current) return;
                updateGameName(game.identifier, nameRef.current.value).then(() => {
                    window.location = window.location;
                });
            }}>Save</button>
        </div>
        <div>
            <b>Game Description</b>
            <textarea ref={descriptionRef} defaultValue={game.description} />
            <button onClick={() => {
                if(!descriptionRef.current) return;
                updateGameDescription(game.identifier, descriptionRef.current.value).then(() => {
                    window.location = window.location;
                });
            }}>Save</button>
        </div>
        <div>
            <b>Game Publisher</b>
            <input ref={publisherRef} type="text" defaultValue={game.publisher} />
            <button onClick={() => {
                if(!publisherRef.current) return;
                updateGamePublisher(game.identifier, publisherRef.current.value).then(() => {
                    window.location = window.location;
                });
            }}>Save</button>
        </div>
        <div>
            <b>Release Year</b>
            <input ref={releaseYearRef} type="number" min={1970} max={4000} defaultValue={game.releaseYear} />
            <button onClick={() => {
                if(!releaseYearRef.current) return;
                updateGameReleaseYear(game.identifier, releaseYearRef.current.value).then(() => {
                    window.location = window.location;
                })
            }}>Save</button>
        </div>
    </div>
} 
