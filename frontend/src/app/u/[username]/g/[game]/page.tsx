import { getGame, getGameAchievements, getGameCompletion, getGameCompletionCategories, getUser, getUserAchievements } from "@/api/api"
import { AchievementCompletionList } from "@/components/achievement/AchievementCompletionList";
import { WrappedGameCompletionCard } from "@/components/game/WrappedGameCompletionCard";
import { Achievement } from "@/types/achievements";
import { GameCompletionCategory } from "@/types/completion";
import { notFound } from "next/navigation";
import { use } from "react";

export default function Page({params}: {params: {username: string, game: string}}) {
    const game = use(getGame(params.game));
    const user = use(getUser("test"));
    
    if(!user.success) notFound();
    if(!game.success) notFound();

    console.log("a");

    const completion = use(getGameCompletion("test", game.value.identifier));
    const customCompletionCategoriesRaw = use(getGameCompletionCategories(user.value.username));
    let customCompletionCategories: GameCompletionCategory[] = [];
    if(customCompletionCategoriesRaw.success) customCompletionCategories = customCompletionCategoriesRaw.value;
    
    if(!completion.success) notFound();

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
        <WrappedGameCompletionCard initialCompletion={completion.value} categories={customCompletionCategories} canEdit={false}/>
        <AchievementCompletionList user={user.value} game={game.value} canEdit={false}/>
    </div>
}
