import { removeUserTodoListEntry, updateUserTodoListEntryComplete, updateUserTodoListEntryDescription, updateUserTodoListEntryName } from "@/api/api"
import { TodoList, TodoListEntry } from "@/types/todo"
import { useState } from "react"
import styles from "./ListEntry.module.css"

export const ListEntry = ({initialEntry, list, onDelete, canEdit}: {initialEntry: TodoListEntry, list: TodoList, onDelete: () => void, canEdit: boolean}) => {
    const [entry, setEntry] = useState(initialEntry);

    return <div className={styles.entry}>
        <div>
            <div>
                {canEdit && <span>✏️</span>}
                <input type="text" className={styles.title} disabled={!canEdit} defaultValue={entry.name} onBlur={(e) => {
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
                }} onKeyUp={(e) => e.key === "Enter" || e.key === "Return" ? e.currentTarget.blur() : {}}/>
            </div>
            <div>
                {canEdit && <span>✏️</span>}
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
                }} onKeyUp={(e) => e.key === "Enter" || e.key === "Return" ? e.currentTarget.blur() : {}}/>
            </div>
        </div>
        <input type="checkbox" disabled={!canEdit} defaultChecked={entry.complete === "1"} onClick={(e) => {
            const checked = e.currentTarget.checked;
            updateUserTodoListEntryComplete(list.user.username, list.game.identifier, list.name, entry.name, checked).then(result => {
                if(result.success) {
                    const newEntry = structuredClone(entry);
                    newEntry.complete = checked ? "1" : "0";
                    setEntry(newEntry);
                }
            })
        }}/>
        {canEdit && <a onClick={() => {
            removeUserTodoListEntry(list.user.username, list.game.identifier, list.name, entry.name).then(result => {
                if(result.success) onDelete();
            })
        }}>🗑️</a>}
    </div>
}
