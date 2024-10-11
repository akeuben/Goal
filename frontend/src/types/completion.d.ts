import { Game } from "./games"

export type GameCompletion = {
    game: Game,
    user: string,
    status: 'not_started' | 'in_progress' | 'complete' | 'custom'
    customStatus: GameCompletionCategory | null
}

export type GameCompletionCategory = {
    user: string,
    name: string,
    colour: string,
    order: number,
}
