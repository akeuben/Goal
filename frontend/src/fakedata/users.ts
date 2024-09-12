import { Achievement } from "@/types/achievements";
import { User } from "@/types/user";

export const fakedata_getUser = async (username: string) => {
    const result = await fetch("http://localhost:3000/users.json");
    const users = (await result.json()) as User[];

    return users.filter(user => user.username === username)[0];
}

export const fakedata_getUserScore = async (username: string) => {
    const result1 = await fetch("http://localhost:3000/user_achievements.json");
    const userAchievements = (await result1.json()) as {user: string, achievement: number}[];

    const userAchievementsIdentifiers = userAchievements.filter(a => a.user === username).map(a => a.achievement);

    const result2 = await fetch("http://localhost:3000/achievements.json");
    const achievements = (await result2.json()) as Achievement[];

    const userAchievementObjects = achievements.filter(a => userAchievementsIdentifiers.includes(a.identifier));

    return userAchievementObjects.reduce((prev, curr) => prev + curr.score, 0);
}
