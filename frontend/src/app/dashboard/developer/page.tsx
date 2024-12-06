import { getGamesByDeveloper } from "@/api/api"
import { CreateGamePane } from "@/components/developer/CreateGamePane";
import { getUserSession } from "@/lib/session";
import { Game } from "@/types/games";
import Link from "next/link";
import { use } from "react"
import { redirect } from "next/navigation";
import styles from "./page.module.css";

export default function DeveloperPage() {
    const session = getUserSession();
    if(!session) redirect("/login");
    if(session.type !== 'developer') redirect("/dashboard");

    const games = use(getGamesByDeveloper(session.username));
    if(!games.success) {
        return <></>
    }
    return <>
        <GameList games={games.value} username={session.username} />
    </>
}

const GameList = ({games, username}: {games: Game[], username: string}) => {
    return <>
        {games.map(game => <div key={game.identifier} className={styles.gamecard}>
            <h1>{game.name}</h1>
            <i>{game.releaseYear} - {game.publisher}</i>
            <p>{game.description}</p>
            <Link href={`/dashboard/developer/g/${game.identifier}`}><button>Edit</button></Link>
        </div>)}
        <h2>Create New Game</h2>
        <CreateGamePane username={username} />
    </>
}
