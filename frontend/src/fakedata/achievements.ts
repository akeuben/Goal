import { Achievement } from "@/types/achievements";
import { fakedata_getGame } from "./games";

type IncompleteAchievement = {
    identifier: number,
    game: string
    name: string
    description: string
    spoiler: boolean
    score: number
}

export const fakedata_getGameAcheivements = async (game: string): Promise<Achievement[] | null> => {
    const result = await fetch("http://localhost:3000/achievements.json", {cache: "no-store"});
    const achievements = (await result.json()) as IncompleteAchievement[];

    const gameAchievementsIncomplete = achievements.filter(achievement => achievement.game === game);

    const gameAchievements: Achievement[] = await Promise.all(gameAchievementsIncomplete.map(async (a): Promise<Achievement> => {
        const game = await fakedata_getGame(a.game);
        return {
            identifier: a.identifier,
            game: game,
            name: a.name,
            description: a.description,
            spoiler: a.spoiler,
            score: a.score
        }
    }));

    return gameAchievements.length > 0 ? gameAchievements : null;
}

export const fakedata_getAchievement = async (identifier: number): Promise<Achievement | null> => {
    const result = await fetch("http://localhost:3000/achievements.json", {cache: "no-store"});
    const achievements = (await result.json()) as IncompleteAchievement[];

    const validAchievements = achievements.filter(a => a.identifier === identifier);

    const gameAchievements: Achievement[] = await Promise.all(validAchievements.map(async (a): Promise<Achievement> => {
        const game = await fakedata_getGame(a.game);
        return {
            identifier: a.identifier,
            game: game,
            name: a.name,
            description: a.description,
            spoiler: a.spoiler,
            score: a.score
        }
    }));

    return gameAchievements.length > 0 ? gameAchievements[0] : null;
}

export const fakedata_getUserAcheivements = async (user: string, game: string) => {
    const achievements = await fakedata_getGameAcheivements(game);
    const result = await fetch("http://localhost:3000/user_achievements.json", {cache: "no-store"});
    const allUserAchievements = (await result.json()) as {user: string, achievement: number}[];
    const userAchievements = allUserAchievements.filter(a => a.user === user).map(a => a.achievement);

    const userAchievementObjects = (achievements || []).filter(achievement => userAchievements.includes(achievement.identifier));

    return userAchievementObjects.length > 0 ? userAchievementObjects : null;
}

export const fakedata_updateUserAchievementState = async (user: string, achievement: number, unlocked: boolean) => {
    const result = await fetch("http://localhost:3000/user_achievements.json", {cache: "no-store"});
    const allUserAchievements = (await result.json()) as {user: string, achievement: number}[];

    const newAllUserAchievements = allUserAchievements.filter(a => a.user !== user || a.achievement !== achievement);

    if(unlocked) newAllUserAchievements.push({
        user: user,
        achievement: achievement
    })

    console.log(newAllUserAchievements);
}
