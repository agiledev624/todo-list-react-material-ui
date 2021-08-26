import React, { FC, useContext } from "react";
import { Todo } from "../model/Task";
import styled from "styled-components";
import { TodoContext } from "./TodoContext";
import {
  Divider,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from "@material-ui/core";
import Check from "@material-ui/icons/Check";
import Icons from "../constants/Icons";
import CancelIcon from "@material-ui/icons/CancelOutlined";
import { Category } from "../model/Category";
// &.todo-list {
//     flex: 80%;
//     width: 100%;
//     display: flex;
//     align-items: center;
//     padding-top: 15px;
//     flex-direction: column;
//     }
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
  // const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    text: string
  ) => {
    setCurrent(text);
  };
  return (
    <StyledTodoList className="todo-list">
      {/* <MenuList> */}
      {/* <MenuItem className="selected">Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem>Logout</MenuItem> */}

      {/* </MenuList> */}
      <List component="nav" aria-label="main mailbox folders">
        {categoryList.map((category: Category, key: number) => {
          // return <CategoryItem key={key} task={task} completeTask={completeTask}/>;
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
              {/* <ListItemIcon>
                <Icon>{Icons[task.deadline]}</Icon>
                </ListItemIcon> */}

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

// <ListItem
// button
// selected={selectedIndex === 1}
// onClick={(event) => handleListItemClick(event, 1)}
// >
// <ListItemIcon>
//   <Check />
// </ListItemIcon>
// <ListItemText primary="Drafts" />
// </ListItem>
// </List>
// <Divider />
// <List component="nav" aria-label="secondary mailbox folder">
// <ListItem
// button
// selected={selectedIndex === 2}
// onClick={(event) => handleListItemClick(event, 2)}
// >
// <ListItemText primary="Trash" />
// </ListItem>
// <ListItem
// button
// selected={selectedIndex === 3}
// onClick={(event) => handleListItemClick(event, 3)}
// >
// <ListItemText primary="Spam" />
// </ListItem>
