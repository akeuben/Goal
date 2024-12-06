import { getGame, getGameAchievements, getGameCompletion, getGameCompletionCategories, getUser, getUserAchievements, getUserTodoLists, removeGameFromLibrary } from "@/api/api";
import { AchievementCompletionList } from "@/components/achievement/AchievementCompletionList";
import { GameReviewComponent } from "@/components/game/GameReview";
import { RemoveGameButton } from "@/components/game/RemoveGameButton";
import { WrappedGameCompletionCard } from "@/components/game/WrappedGameCompletionCard";
import { ListList } from "@/components/list/ListList";
import { getUserSession } from "@/lib/session";
import { Achievement } from "@/types/achievements";
import { GameCompletionCategory } from "@/types/completion";
import { notFound, redirect } from "next/navigation";
import { use } from "react";

export default function Page({params}: {params: {game: string}}) {
    const session = getUserSession();

    if(!session) {
        redirect("/login");
    }
    if(session.type !== 'player') redirect("/dashboard");

    const game = use(getGame(params.game));
    const user = use(getUser(session.username));
    
    if(!user.success) notFound();
    if(!game.success) notFound();

    const completion = use(getGameCompletion(session.username, game.value.identifier));
    const customCompletionCategoriesRaw = use(getGameCompletionCategories(user.value.username));
    let customCompletionCategories: GameCompletionCategory[] = [];
    if(customCompletionCategoriesRaw.success) customCompletionCategories = customCompletionCategoriesRaw.value;
    
    if(!completion.success) notFound();

    const achievements = use(getGameAchievements(game.value.identifier));
    const userAchievements = use(getUserAchievements(session.username, game.value.identifier));

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
        <WrappedGameCompletionCard initialCompletion={completion.value} categories={customCompletionCategories} />
        <h2>Achievements</h2>
        <AchievementCompletionList user={user.value} game={game.value}/>
        <h2>Todo Lists</h2>
        <ListList user={user.value} game={game.value} canEdit={true} />
        <h2>Review</h2>
        <GameReviewComponent user={user.value} game={game.value} canEdit={true}/>
        <h2>Manage</h2>
        <RemoveGameButton username={user.value.username} game={game.value.identifier} />
    </div>
}
