"use client"

import { GameList } from "@/components/game/GameList";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();

    let sortBy = searchParams.get("sortBy") as 'name' | 'release';
    if(sortBy !== 'name' && sortBy !== 'release') sortBy = 'name';

    return <GameList search="" sort={{by: sortBy, acending: true}} filter={{}} />
}
