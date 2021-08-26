import {Category} from "./model/Task";

const SAVE_KEY = "categoryList";

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