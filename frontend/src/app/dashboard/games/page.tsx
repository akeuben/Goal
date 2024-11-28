import { GameCompletionList } from "@/components/game/GameCompletionList";

export default function Page() {
    return <>
        <GameCompletionList username="avery" sort={{by: 'name', acending: true}} filter={{}} search={undefined} canEdit={true} detailsPage="/dashboard/games/g/"/>
    </>
}
