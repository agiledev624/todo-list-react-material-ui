import React, {FC, useContext} from 'react'
import {Category} from "../model/Task";
import styled from "styled-components";
import {TodoTask} from "./TodoTask";
import {TodoContext} from "./TodoContext";

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const StyledTodoList = styled.div`
    &.todo-list {
        flex: 80%;
        width: 100%;
        display: flex;
        align-items: center;
        padding-top: 15px;
        flex-direction: column;
    }
`;



export const TodoList: FC = (props) => {
const { todoList, setTodoList, open, setOpen } = useContext(TodoContext);

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const completeTask = (taskNameToDelete: string): void => {
        setTodoList(todoList.filter((task) => {
            return task.taskName !== taskNameToDelete
        }));
    };

    return (
        <StyledTodoList className="todo-list">
            {todoList.map((task: Category, key: number) => {
                return <TodoTask key={key} task={task} completeTask={completeTask}/>;
            })}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning">
                Please input the value.
                </Alert>
            </Snackbar>
        </StyledTodoList>
    );
};
