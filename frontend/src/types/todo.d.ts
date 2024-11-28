import { Game } from "./games";
import { User } from "./user";

export type TodoList = {
    name: string,
    user: User,
    game: Game,
    entries: TodoListEntry[],
}

export type TodoListEntry = {
    name: string,
    description: string,
    complete: string
};
