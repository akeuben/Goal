import { GameCompletion } from "@/types/completion";
import { TimelineEntry } from "@/types/timeline";
import { fakedata_getGame } from "./games";
import { fakedata_getUser } from "./users";
import { fakedata_getCompletion } from "./completion";
import { fakedata_getAchievement } from "./achievements";

type IncompleteTimelineEntry = {
    user: string,
    timestamp: number,
    type: "achievement",
    achievement: number
} | {
    user: string,
    timestamp: number,
    type: "game",
    game: string,
    status: GameCompletion["status"],
    customStatus: string | null, 
}

const toCorrectType = async (entry: IncompleteTimelineEntry): Promise<TimelineEntry> => {
    switch(entry.type) {
        case "game":
            return await toGameType(entry);
        case "achievement":
            return await toAchievementType(entry);
        default:
            throw Error("invalid type");
    }
}

const toGameType = async (entry: IncompleteTimelineEntry & {type: "game"}): Promise<TimelineEntry> => ({
    user: await fakedata_getUser(entry.user),
    timestamp: entry.timestamp,
    type: entry.type,
    completion: {
        user: entry.user,
        game: await fakedata_getGame(entry.game),
        status: entry.status,
        customStatus: entry.customStatus
    }
})

const toAchievementType = async (entry: IncompleteTimelineEntry & {type: "achievement"}): Promise<TimelineEntry> => ({
    user: await fakedata_getUser(entry.user),
    timestamp: entry.timestamp,
    type: entry.type,
    achievement: await fakedata_getAchievement(entry.achievement) || {
        identifier: -1,
        game: {
            identifier: "unknown",
            name: "unknown",
            developer: "unknown",
            publisher: "unknown",
            description: "unknown game",
            releaseYear: 0,
        },
        name: "unknown",
        description: "unknown achievement",
        score: 0,
        spoiler: false
    }
})

export const fakedata_getUserTimelineEntries = async (user: string) => {
    const result = await fetch("http://localhost:3000/timeline.json", {cache: "no-store"});
    const baseEntries = (await result.json()) as IncompleteTimelineEntry[];

    const userEntries = baseEntries.filter(e => e.user === user);

    console.log(baseEntries);

    const entries: TimelineEntry[] = await Promise.all(userEntries.map(toCorrectType)); 


    return entries.length > 0 ? entries : null
}
