import { TodoList } from "@/types/todo";
import { ListEntry } from "./ListEntry";

export const List = ({list}: {list: TodoList}) => {
    return <div>
        <input type="text" defaultValue={list.name} />
        {
            list.entries.map(entry => <ListEntry entry={entry} />)
        }
    </div>
}
