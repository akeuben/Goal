import { TimelineEntry } from "@/types/timeline";
import Link from "next/link";
import styles from "./TimelineEntry.module.css";
import { CSSProperties } from "react";
import { CompletionToColor } from "@/lib/completions";
import { User } from "@/types/user";
import { CustomGameCompletion, GameCompletionCategory } from "@/types/completion";

export const TimelineEntryComponent = ({entry, categories}: {entry: TimelineEntry, categories: GameCompletionCategory[]}) => {
    return <div className={styles.entry} style={{
        "--color": entry.type === "achievement" ? "#777777" : CompletionToColor(entry.completion.status, entry.completion.status === "custom" && entry.completion.customStatus ? entry.completion.customStatus.name : null, categories)
    } as CSSProperties}>
        <b>{new Date(entry.timestamp).toLocaleString()}</b>
        {
            entry.type === 'game' ? <GameTimelineEntryComponent entry={entry} /> : <AchievementTimelineEntryComponent entry={entry} />
        }
    </div>
}

const GameTimelineEntryComponent = ({entry}: {entry: TimelineEntry & {type: 'game'}}) => {
    return <div>
        <p>{entry.user.username} moved <Link href={`/g/${entry.completion.game.identifier}`}>{entry.completion.game.name}</Link> to the {entry.completion.status === 'custom' && entry.completion.customStatus ? entry.completion.customStatus.name : entry.completion.status} category</p>
    </div>
}

const AchievementTimelineEntryComponent = ({entry}: {entry: TimelineEntry & {type: 'achievement'}}) => {
    return <div>
        <p>{entry.user.username} completed the achievement <b>{entry.achievement.name}</b> for <Link href={`/g/${entry.achievement.game.identifier}`}>{entry.achievement.game.name}</Link> earning {entry.achievement.score} points!</p>
    </div>
}
