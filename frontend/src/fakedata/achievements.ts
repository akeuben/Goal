import { Achievement } from "@/types/achievements";

export const fakedata_getGameAcheivements = async (game: string) => {
    const result = await fetch("http://localhost:3000/achievements.json", {cache: "no-store"});
    const achievements = (await result.json()) as Achievement[];

    const gameAchievements = achievements.filter(achievement => achievement.game === game);

    return gameAchievements.length > 0 ? gameAchievements : null;
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
