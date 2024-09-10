import { GameCompletionList } from "@/components/game/GameCompletionList";

export default function Page() {
    return <>
        <GameCompletionList username="test" sort={{by: 'name', acending: true}} filter={{}} search={undefined} canEdit={true}/>
    </>
}
