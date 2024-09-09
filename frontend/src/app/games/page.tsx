import { getGameList } from "@/api/api";
import { GameList } from "@/components/game/GameList";

export default function Page() {
    const gameList = getGameList();
    if(!gameList.success) throw new Error("Failed to load list of games");


    return <GameList search="" sort={{by: 'release', acending: true}} filter={{}} />
}
