import {Todo} from "./model/Task";
import {Category} from "./model/Category";

const SAVE_KEY = "categoryList";
const TODO_SAVE_KEY = "todoList";

export const loadCategoryList = (): Category[] => {
    const categoryListJson = localStorage.getItem(SAVE_KEY);
    if (!categoryListJson) {
        return [];
    }
    return JSON.parse(categoryListJson) as Category[];
}

export const saveCategoryList = (categoryList: Category[]) => {
    return localStorage.setItem(SAVE_KEY, JSON.stringify(categoryList));
}

export const loadTodoList = (): Todo[] => {
    const todoListJson = localStorage.getItem(TODO_SAVE_KEY);
    if (!todoListJson) {
        return [];
    }
    return JSON.parse(todoListJson) as Todo[];
}

export const saveTodoList = (todoList: Todo[]) => {
    return localStorage.setItem(TODO_SAVE_KEY, JSON.stringify(todoList));
}
