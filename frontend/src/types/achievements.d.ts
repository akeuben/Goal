import { Game } from "./games";

export type Achievement = {
    identifier: number,
    game: Game,
    name: string,
    description: string,
    spoiler: boolean,
    score: number,
}
