import { getGame, getGameAchievements } from "@/api/api";
import { AchievementPane } from "@/components/developer/AchievementPane";
import { GameDetailPane } from "@/components/developer/GameDetailPane";
import { getUserSession } from "@/lib/session";
import { Achievement } from "@/types/achievements";
import { notFound } from "next/navigation";
import { use } from "react";
import { redirect } from "next/navigation";

export default function Page({params}: {params: {game: string}}) {
    const session = getUserSession();
    if(!session) redirect("/login");
    if(session.type !== 'developer') redirect("/dashboard");

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
        <h2>Game Details</h2>
        <GameDetailPane game={game.value} />
        <h2>Game Achievements</h2>
        <AchievementPane achievements={achievements} game={game.value}/>
    </>
}
