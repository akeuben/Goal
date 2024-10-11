import { TodoListEntry } from "@/types/todo"

export const ListEntry = ({entry}: {entry: TodoListEntry}) => {
    return <div>
        <div>
            <input type="text" defaultValue={entry.name} />
            <input type="text" defaultValue={entry.description} />
        </div>
        <input type="checkbox" defaultChecked={entry.complete} />
        <button>Delete</button>
    </div>
}
