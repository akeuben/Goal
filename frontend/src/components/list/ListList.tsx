"use client"

import { addUserTodoList, getUserTodoLists } from "@/api/api";
import { TodoList } from "@/types/todo";
import { useEffect, useRef, useState } from "react";
import { List } from "./List";
import styles from "./ListList.module.css";
import { Game } from "@/types/games";
import { User } from "@/types/user";

export const ListList = ({user, game, canEdit}: {user: User, game: Game, canEdit: boolean}) => {
    const [todoLists, setTodoLists] = useState<TodoList[]>([]);
    const newListNameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        getUserTodoLists(user.username, game.identifier).then(result => {
            if(result.success) {
                setTodoLists(result.value);
            }
        })
    }, [setTodoLists])

    return <div>
        {
            todoLists.map(list => <List key={list.name} initialList={list} canEdit={canEdit} onDelete={() => {
                const newLists = todoLists.filter(other => list.name !== other.name);
                setTodoLists(newLists);
            }}/>)
        }
        { canEdit && <div className={styles.new}>
            <p>Create New List:</p>
            <input type="text" placeholder="List Name" ref={newListNameInputRef} />
            <button onClick={() => {
                const text = newListNameInputRef.current?.value;
                addUserTodoList(user.username, game.identifier, text || "").then(result => {
                    if(result.success) {
                        const newLists: TodoList[] = [...todoLists, {
                            name: text || "",
                            user: user,
                            game: game,
                            entries: []
                        }]
                        setTodoLists(newLists);
                    }
                })
                if(newListNameInputRef.current) newListNameInputRef.current.value = "";
            }}>Create</button>
        </div>}
    </div>
}
