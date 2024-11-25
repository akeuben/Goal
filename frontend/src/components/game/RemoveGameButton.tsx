"use client"
import { removeGameFromLibrary } from "@/api/api";

export const RemoveGameButton = ({username, game}: {username: string, game: string}) => {
    return <button onClick={() => {
        removeGameFromLibrary(username, game);
    }}>Remove from Library</button>
}
