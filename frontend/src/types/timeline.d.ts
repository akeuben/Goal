import { Achievement } from "./achievements";
import { GameCompletion } from "./completion";
import { Game } from "./games";
import { User } from "./user"

interface BaseTimelineEntry<T> {
    user: User;
    timestamp: number;
    type: T;
}

interface GameTimelineEntry extends BaseTimelineEntry<"game"> {
    completion: GameCompletion
}

interface AchievementTimelineEntry extends BaseTimelineEntry<"achievement"> {
    achievement: Achievement
}

export type TimelineEntry = GameTimelineEntry | AchievementTimelineEntry;
