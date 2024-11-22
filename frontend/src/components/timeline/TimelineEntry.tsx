import { GameCompletion } from "@/types/completion";
import { TimelineEntry } from "@/types/timeline";
import Link from "next/link";

export const TimelineEntryComponent = ({entry}: {entry: TimelineEntry}) => {
    return <div>
        <p>{new Date(entry.timestamp).toLocaleString()}</p>
        {
            entry.type === 'game' ? <GameTimelineEntryComponent entry={entry} /> : <AchievementTimelineEntryComponent entry={entry} />
        }
    </div>
}

const GameTimelineEntryComponent = ({entry}: {entry: TimelineEntry & {type: 'game'}}) => {
    console.log("ENTRY:");
    console.dir(entry.completion.game.name);
    return <div>
        <p>{entry.user.username} moved <Link href={`/g/${entry.completion.game.identifier}`}>{entry.completion.game.name}</Link> to the {entry.completion.status === 'custom' ? entry.completion.customStatus.name : entry.completion.status} category</p>
    </div>
}

const AchievementTimelineEntryComponent = ({entry}: {entry: TimelineEntry & {type: 'achievement'}}) => {
    return <div>
        <p>{entry.user.username} completed the achievement <b>{entry.achievement.name}</b> for <Link href={`/g/${entry.achievement.game.identifier}`}>{entry.achievement.game.name}</Link> earning {entry.achievement.score} points!</p>
    </div>
}
