import { removeUserTodoListEntry, updateUserTodoListEntryComplete, updateUserTodoListEntryDescription, updateUserTodoListEntryName } from "@/api/api"
import { TodoList, TodoListEntry } from "@/types/todo"
import { useState } from "react"
import styles from "./ListEntry.module.css"

export const ListEntry = ({initialEntry, list, onDelete, canEdit}: {initialEntry: TodoListEntry, list: TodoList, onDelete: () => void, canEdit: boolean}) => {
    const [entry, setEntry] = useState(initialEntry);

    console.log(entry);

    return <div className={styles.entry}>
        <div>
            <input type="text" disabled={!canEdit} defaultValue={entry.name} onBlur={(e) => {
                const text = e.currentTarget.value;
                updateUserTodoListEntryName(list.user.username, list.game.identifier, list.name, entry.name, text).then(result =>{
                    if(result.success) {
                        const newEntry = structuredClone(entry);
                        newEntry.name = text;
                        setEntry(newEntry);
                    } else {
                        e.target.value = entry.name;
                    }
                })
            }}/>
            <input type="text" disabled={!canEdit} defaultValue={entry.description} onBlur={(e) => {
                const text = e.currentTarget.value;
                updateUserTodoListEntryDescription(list.user.username, list.game.identifier, list.name, entry.name, text).then(result =>{
                    if(result.success) {
                        const newEntry = structuredClone(entry);
                        newEntry.description = text;
                        setEntry(newEntry);
                    } else {
                        e.target.value = entry.description;
                    }
                })
            }}/>
        </div>
        <input type="checkbox" disabled={!canEdit} checked={entry.complete === "1"} onClick={(e) => {
            const checked = e.currentTarget.checked;
            updateUserTodoListEntryComplete(list.user.username, list.game.identifier, list.name, entry.name, checked).then(result => {
                if(result.success) {
                    const newEntry = structuredClone(entry);
                    newEntry.complete = checked ? "1" : "0";
                    setEntry(newEntry);
                }
            })
        }}/>
        {canEdit && <button onClick={() => {
            removeUserTodoListEntry(list.user.username, list.game.identifier, list.name, entry.name).then(result => {
                if(result.success) onDelete();
            })
        }}>Delete</button>}
    </div>
}
