import React, {FC, useEffect, useState} from 'react';
import {Category} from "../model/Task";
import {loadCategoryList, saveCategoryList} from "../localstorage";

interface TodoContextState {
    todoList: Category[];
    setTodoList: (todoList: Category[]) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const TodoContext = React.createContext({} as TodoContextState);

export const TodoContextProvider: FC = (props) => {
    const [todoList, setTodoList] = useState<Category[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    // when component loads, read todo list from local storage.
    useEffect(() => {
        setTodoList(loadCategoryList());
    }, []);

    // a single place to handle saving todo list to local storage.
    // this is easier than remembering to do it in both Header.addTask() and TodoTask.completeTask()
    useEffect(() => {
        saveCategoryList(todoList);
    }, [todoList]);

    return (
        <TodoContext.Provider
            value={{
                todoList, setTodoList, open, setOpen
            }}
        >
            {props.children}
        </TodoContext.Provider>
    );
};