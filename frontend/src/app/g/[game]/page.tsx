import { getGame, getGameAchievements } from '@/api/api';
import { AchievementCard } from '@/components/achievement/AchievementCard';
import { notFound } from 'next/navigation';
import { use } from 'react';
import styles from "./page.module.css";
import { GameCard } from '@/components/game/GameCard';

export default function GamePage({params}: {params: {game: string}}) {
    const game = use(getGame(params.game + ""));

    if(!game.success) notFound();

    const achievements = use(getGameAchievements(game.value.identifier));

    return <>
        <GameCard game={game.value} hideDetails />
        <h1 style={{marginLeft: "50px"}}>Achievements:</h1>
        {achievements.success && achievements.value.length > 0 ? achievements.value.map(achievement => (
            <AchievementCard achievement={achievement} />
        )) : <p>This game does not have any achievements!</p>}
    </>
}
