import { notFound } from 'next/navigation';

const doesGameExist = (name: string) => {
    return name.startsWith("a");
}

export default function GamePage({params}: {params: {game: string}}) {
    if(!doesGameExist(params.game)) notFound();

    return <h1>Game: {params.game}</h1>
}
