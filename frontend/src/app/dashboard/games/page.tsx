import { GameCompletionList } from "@/components/game/GameCompletionList";
import { getUserSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default function Page() {
    const session = getUserSession();
    if(!session) redirect("/login");
    if(session.type !== 'player') redirect("/dashboard");
    return <>
        <GameCompletionList username={session.username} sort={{by: 'name', acending: true}} filter={{}} search={undefined} canEdit={true} detailsPage="/dashboard/games/g/"/>
    </>
}
