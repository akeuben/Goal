"use client"
import { removeGameFromLibrary } from "@/api/api";

export const RemoveGameButton = ({username, game}: {username: string, game: string}) => {
    return <button onClick={() => {
        removeGameFromLibrary(username, game).then(result => {
            if(result.success) {
                window.location.href = window.location.protocol + "/dashboard/games";
            }
        })
    }}>Remove from Library</button>
}
