import { TodoList } from "@/types/todo";

const todoLists: TodoList[] = [
    {
        name: "Test list 1",
        user: {
            username: "test",
            email: "test@example.com",
            passwordHash: "asdkjhr"
        },
        game: {
            name: "Starcraft 2",
            identifier: "aleksIsSadTheyKilledIt",
            description: "Overwatch was a 2016 team-based multiplayer first-person shooter game by Blizzard Entertainment.",
            developer: "Iron Galaxy",
            publisher: "Blizzard Entertainment",
            releaseYear: 2016
        },
        entries: [
            {
                name: "Entry 1",
                description: "Entry 1 description",
                complete: false
            },
            {
                name: "Entry 2",
                description: "Entry 2 description",
                complete: false
            }
        ]
    },{
        name: "Test list 2",
        user: {
            username: "test",
            email: "test@example.com",
            passwordHash: "asdkjhr"
        },
        game: {
            name: "Starcraft 2",
            identifier: "aleksIsSadTheyKilledIt",
            description: "Overwatch was a 2016 team-based multiplayer first-person shooter game by Blizzard Entertainment.",
            developer: "Iron Galaxy",
            publisher: "Blizzard Entertainment",
            releaseYear: 2016
        },
        entries: [
            {
                name: "Entry 3",
                description: "Entry 3 description",
                complete: true
            }
        ]
    }

]

export const fakedata_getUserTodoLists = async (_user: string, _game: string) => {
    return todoLists;
}
