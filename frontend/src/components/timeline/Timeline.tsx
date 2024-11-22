import { getUserTimelineEntries } from "@/api/api";
import { User } from "@/types/user";
import { use } from "react"
import { TimelineEntryComponent } from "./TimelineEntry";

export const Timeline = ({user}: {user: User}) => {
    const entries = use(getUserTimelineEntries(user.username));

    if(!entries.success) return <p>No timeline entries yet!</p>

    return entries.value.toSorted((a,b) => b.timestamp - a.timestamp).map(entry => <TimelineEntryComponent key={btoa(JSON.stringify(entry))} entry={entry} />);
}
