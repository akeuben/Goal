import { getGame, getGameAchievements, getGameCompletion, getGameCompletionCategories, getUser, getUserAchievements } from "@/api/api";
import { AchievementCompletionList } from "@/components/achievement/AchievementCompletionList";
import { GameReviewComponent } from "@/components/game/GameReview";
import { WrappedGameCompletionCard } from "@/components/game/WrappedGameCompletionCard";
import { Achievement } from "@/types/achievements";
import { notFound } from "next/navigation";
import { use } from "react";

export default function Page({params}: {params: {username: string, game: string}}) {
    const game = use(getGame(params.game));
    const user = use(getUser(params.username));

    if(!user.success) notFound();
    if(!game.success) notFound();

    const completion = use(getGameCompletion(user.value.username, game.value.identifier));
    const customCompletionCategories = use(getGameCompletionCategories(user.value.username));
    
    if(!completion.success) notFound();
    if(!customCompletionCategories.success) notFound();

    const achievements = use(getGameAchievements(game.value.identifier));
    const userAchievements = use(getUserAchievements("test", game.value.identifier));

    let unlocked: Achievement[] = [];
    let locked: Achievement[] = [];

    if(achievements.success && userAchievements.success) {
        const unlockedIdentifiers = userAchievements.value.map(a => a.identifier);
        unlocked = userAchievements.value;
        locked = achievements.value.filter(a => !unlockedIdentifiers.includes(a.identifier));
    } else if(achievements.success) {
        locked = achievements.value;
    }

    return <div>
        <WrappedGameCompletionCard initialCompletion={completion.value} categories={customCompletionCategories.value} canEdit={false}/>
        <AchievementCompletionList user={user.value} game={game.value} canEdit={false}/>
        <GameReviewComponent user={user.value} game={game.value} canEdit={false}/>
    </div>
}
