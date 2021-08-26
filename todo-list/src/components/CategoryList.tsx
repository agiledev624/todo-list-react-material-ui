import React, { FC, useContext } from "react";
import styled from "styled-components";
import { TodoContext } from "./TodoContext";
import {
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import Icons from "../constants/Icons";
import CancelIcon from "@material-ui/icons/CancelOutlined";
import { Category } from "../model/Category";

const StyledTodoList = styled.div`
  .selected {
    background-color: red;
  }
`;

export const CategoryList: FC = (props) => {
  const {
    categoryList,
    setCategoryList,
    current,
    setCurrent,
    todoList,
    setTodoList,
  } = useContext(TodoContext);

  const removeCategory = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    categoryToDelete: string
  ): void => {
    event.stopPropagation();
    setCategoryList(
      categoryList.filter((category) => {
        return category.text !== categoryToDelete;
      })
    );

    if (categoryList.length > 0 && categoryList[0].text !== categoryToDelete) {
      setCurrent(categoryList[0].text);
    } else if (categoryList.length > 0) {
      setCurrent(categoryList[1].text);
    }

    setTodoList(
      todoList.filter((task) => {
        return task.category !== categoryToDelete;
      })
    );
  };

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    text: string
  ) => {
    setCurrent(text);
  };

  return (
    <StyledTodoList className="todo-list">
      <List component="nav" aria-label="main mailbox folders">
        {categoryList.map((category: Category, key: number) => {
          return (
            <ListItem
              button
              selected={current === category.text}
              onClick={(event) =>
                handleListItemClick(event, key, category.text)
              }
            >
              <ListItemIcon>
                <Icon>{Icons[category.iconIndex]}</Icon>
              </ListItemIcon>
              <ListItemText primary={category.text} />
              <IconButton
                onClick={(event) => removeCategory(event, category.text)}
                className="custom-color"
              >
                <CancelIcon />
              </IconButton>
            </ListItem>
          );
        })}
      </List>
    </StyledTodoList>
  );
};
