import { Game } from "./games"

interface BaseGameCompletion<T> {
    game: Game,
    user: string,
    status: T
}

interface BuiltinGameCompletion extends BaseGameCompletion<'not_started' | 'in_progress' | 'complete'> {
}

interface CustomGameCompletion extends BaseGameCompletion<'custom'> {
    customStatus: GameCompletionCategory
}

export type GameCompletion = BuiltinGameCompletion | CustomGameCompletion;

export type GameCompletionCategory = {
    user: string,
    name: string,
    colour: string,
    order: number,
}
