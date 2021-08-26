import React, {FC, useContext} from 'react'
import {Category} from "../model/Task";
import styled from "styled-components";
import {CategoryItem} from "./Category";
import {TodoContext} from "./TodoContext";
import { Divider, Icon, IconButton, List, ListItem, ListItemIcon, ListItemText, MenuItem, MenuList } from '@material-ui/core';
import Check from "@material-ui/icons/Check";
import Icons from "../constants/Icons";
import CancelIcon from '@material-ui/icons/CancelOutlined';
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
const { todoList, setTodoList } = useContext(TodoContext);

    const completeTask = (taskNameToDelete: string): void => {
        setTodoList(todoList.filter((task) => {
            return task.taskName !== taskNameToDelete
        }));
    };
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
      index: number,
    ) => {
      setSelectedIndex(index);
    };
    return (
        <StyledTodoList className="todo-list">
            {/* <MenuList> */}
          {/* <MenuItem className="selected">Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem>Logout</MenuItem> */}
        
            
            {/* </MenuList> */}
            <List component="nav" aria-label="main mailbox folders">
            {todoList.map((task: Category, key: number) => {
                // return <CategoryItem key={key} task={task} completeTask={completeTask}/>;
                return <ListItem
                button
                selected={selectedIndex === key}
                onClick={(event) => handleListItemClick(event, key)}
              >
                <ListItemIcon>
                <Icon>{Icons[task.deadline]}</Icon>
                </ListItemIcon>
                <ListItemText primary={task.taskName} />
                {/* <ListItemIcon>
                <Icon>{Icons[task.deadline]}</Icon>
                </ListItemIcon> */}
                
            <IconButton
                onClick={() => completeTask(task.taskName)}
                className="custom-color"
            >
                <CancelIcon />
            </IconButton>
              </ListItem>;
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