"use client"
import { getGamesByDeveloper } from "@/api/api"
import { CreateGamePane } from "@/components/developer/CreateGamePane";
import { Game } from "@/types/games";
import Link from "next/link";
import { use } from "react"

export default function DeveloperPage() {
    const games = use(getGamesByDeveloper("avery"));
    if(!games.success) {
        return <></>
    }
    return <>
        <GameList games={games.value} username={"avery"} />
    </>
}

const GameList = ({games, username}: {games: Game[], username: string}) => {
    return <>
        {games.map(game => <div>
            <b>{game.name}</b>
            <p>{game.releaseYear}</p>
            <p>{game.description}</p>
            <p>{game.publisher}</p>
            <Link href={`/dashboard/developer/g/${game.identifier}`}>Edit</Link>
        </div>)}
        <CreateGamePane username={username} />
    </>
}
