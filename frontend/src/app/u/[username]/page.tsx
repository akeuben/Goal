import { getUser, getUserScore } from "@/api/api"
import { GameCompletionList } from "@/components/game/GameCompletionList"
import { notFound } from "next/navigation";
import { use } from "react"

export default function ProfilePage({params}: {params: {username: string}}) {
    const user = use(getUser(params.username));

    if(!user.success) notFound();

    const score = use(getUserScore(params.username));
    let realScore = 0;
    if(score.success) realScore = score.value;

    return <div>
        <h1>{params.username}</h1>
        <p>Score: {realScore}</p>

        <h2>Game Progress</h2>
        <GameCompletionList username={params.username} sort={{by: 'name', acending: true}} filter={{}} search="" canEdit={false} detailsPage={`/u/${user.value.username}/g/`}/>

        <h2>Timeline</h2>
        <p>TODO</p>
    </div>
}
