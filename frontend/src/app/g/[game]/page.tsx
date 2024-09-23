import { getGame, getGameAchievements } from '@/api/api';
import { AchievementCard } from '@/components/achievement/AchievementCard';
import { notFound } from 'next/navigation';
import { use } from 'react';
import styles from "./page.module.css";

export default function GamePage({params}: {params: {game: string}}) {
    const game = use(getGame(params.game));
    
    if(!game.success) notFound();

    const achievements = use(getGameAchievements(game.value.identifier));

    return <>
        <div className={styles.twoCol}>
            <div className={styles.coverart} style={{backgroundImage: `url(/assets/gameart/${game.value.identifier}.jpg)`}}/>
            <div className={styles.details}>
                <h1>{game.value.name}</h1>
                <p>Release Date: <i>{game.value.releaseYear}</i></p>
                <p>Developer: <i>{game.value.developer}</i></p>
                <p>Publisher: <i>{game.value.publisher}</i></p>
                <p>{game.value.description}</p>
            </div>
        </div>
        <h1 style={{marginLeft: "50px"}}>Achievements:</h1>
        {achievements.success && achievements.value.length > 0 ? achievements.value.map(achievement => (
            <AchievementCard achievement={achievement} />
        )) : <p>This game does not have any achievements!</p>}
    </>
}
