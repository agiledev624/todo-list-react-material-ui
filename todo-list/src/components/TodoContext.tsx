import React, { FC, useEffect, useState } from "react";
import { Todo } from "../model/Task";
import { Category } from "../model/Category";
import {
  loadCategoryList,
  loadTodoList,
  saveCategoryList,
  saveTodoList,
} from "../localstorage";

interface TodoContextState {
  todoList: Todo[];
  setTodoList: (todoList: Todo[]) => void;
  categoryList: Category[];
  setCategoryList: (categoryList: Category[]) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  current: string;
  setCurrent: (current: string) => void;
}

export const TodoContext = React.createContext({} as TodoContextState);

export const TodoContextProvider: FC = (props) => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [current, setCurrent] = useState<string>("nothing");

  // when component loads, read todo list from local storage.
  useEffect(() => {
    setCategoryList(loadCategoryList());
    setTodoList(loadTodoList());
  }, []);

  // a single place to handle saving todo list to local storage.
  // this is easier than remembering to do it in both Header.addTask() and TodoTask.completeTask()
  useEffect(() => {
    saveCategoryList(categoryList);
  }, [categoryList]);

  useEffect(() => {
    saveTodoList(todoList);
  }, [todoList]);

  return (
    <TodoContext.Provider
      value={{
        todoList,
        setTodoList,
        open,
        setOpen,
        current,
        setCurrent,
        categoryList,
        setCategoryList,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};
