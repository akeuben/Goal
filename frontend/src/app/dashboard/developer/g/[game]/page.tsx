import { getGame, getGameAchievements } from "@/api/api";
import { AchievementPane } from "@/components/developer/AchievementPane";
import { GameDetailPane } from "@/components/developer/GameDetailPane";
import { Achievement } from "@/types/achievements";
import { notFound } from "next/navigation";
import { use } from "react";

export default function Page({params}: {params: {game: string}}) {
    const game = use(getGame(params.game));
    if(!game.success) {
        return notFound();
    }
    const achievementsResult = use(getGameAchievements(game.value.identifier));
    let achievements: Achievement[] = [];
    if(achievementsResult.success) {
        achievements = achievementsResult.value;
    }

    return <>
        <GameDetailPane game={game.value} />
        <AchievementPane achievements={achievements} game={game.value}/>
    </>
}
