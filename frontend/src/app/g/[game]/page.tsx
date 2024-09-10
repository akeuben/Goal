import { getGameList } from '@/api/api';
import { Game } from '@/types/games';
import { notFound } from 'next/navigation';
import { use } from 'react';
import styles from "./page.module.css";

const getGames = async () => {
    const games = await getGameList({by: 'name', acending: true}, {}, undefined)
    if(games.success) return games.value;

    return [];
}

export default function GamePage({params}: {params: {game: string}}) {
    const game = use<Game[]>(getGames()).filter(g => g.identifier === params.game)[0];

    if(!game) notFound();

    return <>
        <div className={styles.twoCol}>
            <div className={styles.coverart} style={{backgroundImage: `url(/assets/gameart/${game.identifier}.jpg)`}}/>
            <div>
                <h1>{game.name}</h1>
                <p>Release Date: <i>{game.releaseYear}</i></p>
                <p>Developer: <i>{game.developer}</i></p>
                <p>Publisher: <i>{game.publisher}</i></p>
            </div>
        </div>
        <p>{game.description}</p>
    </>
}
