import { getUserTimelineEntries, getGameCompletionCategories } from "@/api/api";
import { User } from "@/types/user";
import { use } from "react"
import { TimelineEntryComponent } from "./TimelineEntry";

export const Timeline = ({user}: {user: User}) => {
    const entries = use(getUserTimelineEntries(user.username));
    const categories = use(getGameCompletionCategories(user.username));

    if(!entries.success) return <p>No timeline entries yet!</p>

    return entries.value.toSorted((a,b) => {
        console.log(a);
        console.log(b);
        return b.timestamp - a.timestamp
    }).map(entry => <TimelineEntryComponent key={entry.timestamp} entry={entry} categories={categories.success ? categories.value : []} />);
}
