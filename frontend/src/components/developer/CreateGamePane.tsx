import { createGame } from "@/api/api";
import { useRef } from "react";

export const CreateGamePane = ({username}: {username: string}) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const publisherRef = useRef<HTMLInputElement>(null);
    const releaseYearRef = useRef<HTMLInputElement>(null);

    return <div>
        <div>
            <b>Game Name</b>
            <input type="text" ref={nameRef} />
        </div>
        <div>
            <b>Game Description</b>
            <textarea ref={descriptionRef} />
        </div>
        <div>
            <b>Game Publisher</b>
            <input ref={publisherRef} type="text" />
        </div>
        <div>
            <b>Release Year</b>
            <input ref={releaseYearRef} type="number" min={1970} max={4000} />
        </div>
        <button onClick={() => {
            if(!nameRef.current || !releaseYearRef.current || !descriptionRef.current || !publisherRef.current) return;
            createGame(username, nameRef.current.value, descriptionRef.current.value, parseInt(releaseYearRef.current.value), publisherRef.current.value).then(() => {
                window.location = window.location;
            })
        }}>Create</button>
    </div>
} 
