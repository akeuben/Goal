import { TodoList, TodoListEntry } from "@/types/todo";
import { ListEntry } from "./ListEntry";
import styles from "./List.module.css";
import { useRef, useState } from "react";
import { addUserTodoListEntry, removeUserTodoList, updateUserTodoListName } from "@/api/api";

export const List = ({initialList, onDelete, canEdit}: {initialList: TodoList, onDelete: () => void, canEdit: boolean}) => {
    const [list, setList] = useState<TodoList>(initialList);
    const newListEntryNameInputRef = useRef<HTMLInputElement>(null);
    const newListEntryDescriptionInputRef = useRef<HTMLInputElement>(null);

    return <div className={styles.list}>
        <div>
            <input type="text" disabled={!canEdit} defaultValue={list.name} onBlur={(e) => {
                const text = e.currentTarget.value;
                updateUserTodoListName(list.user.username, list.game.identifier, list.name, text).then(result =>{
                    if(result.success) {
                        const newList = structuredClone(list);
                        newList.name = text;
                        setList(newList);
                    } else {
                        e.target.value = list.name;
                    }
                })
            }}/>
            {canEdit && <button onClick={() => {
                removeUserTodoList(list.user.username, list.game.identifier, list.name).then(result => {
                    if(result.success) onDelete();
                })
            }}>Delete</button>}
        </div>
        {
            list.entries.map((entry) => <ListEntry key={entry.name} initialEntry={entry} list={list} canEdit={canEdit} onDelete={() => {
                const newList = structuredClone(list);
                newList.entries = newList.entries.filter((other) => {
                    console.log("Clicked: " + entry.name);
                    console.log("Testing: " + other.name);
                    console.log(entry.name !== other.name)
                    return entry.name !== other.name
                });
                console.log(newList);
                setList(newList);
            }}/>)
        }
        { canEdit && <div className={styles.new}>
            <p>Create New Element:</p>
            <input type="text" placeholder="List Name" ref={newListEntryNameInputRef} />
            <input type="text" placeholder="List Description" ref={newListEntryDescriptionInputRef} />
            <button onClick={() => {
                const name = newListEntryNameInputRef.current?.value;
                const description = newListEntryDescriptionInputRef.current?.value;
                addUserTodoListEntry(list.user.username, list.game.identifier, list.name, name || "", description || "").then(result => {
                    if(result.success) {
                        const newList = structuredClone(list);
                        newList.entries = [...newList.entries, {
                            name: name || "",
                            description: description || "",
                            complete: false
                        }]
                        setList(newList);
                        console.log("NEW");
                    } else {
                        console.log(result);
                    }
                })
                if(newListEntryNameInputRef.current) newListEntryNameInputRef.current.value = "";
                if(newListEntryDescriptionInputRef.current) newListEntryDescriptionInputRef.current.value = "";
            }}>Create</button>
        </div>}
    </div>
}
