import React, { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { Todo } from "../model/Task";
import { Category } from "../model/Category";
import styled from "styled-components";
import { TodoTask } from "./TodoTask";
import { TodoContext } from "./TodoContext";
import AddIcon from "@material-ui/icons/Add";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Button, TextField, Paper } from "@material-ui/core";

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const StyledTodoList = styled.div`
  &.todo-list {
    flex: 80%;
    width: 100%;
    display: flex;
    align-items: center;
    padding-top: 15px;
    flex-direction: column;
  }
  .input-container {
    display: flex;
    flex-flow: row nowrap;

    input {
      background-color: white;
      font-size: 17px;
      border: 1px solid grey;
    }

    .task-name-input {
      .MuiInputBase-root {
        height: 25px;
        background-color: white;
      }

      textarea {
      }
    }

    .deadline-input {
      input {
        max-width: 120px;
      }
    }
  }
  h2 {
    text-align: center;
  }
`;

export const TodoList: FC = (props) => {
  const { todoList, setTodoList, open, setOpen, current, categoryList } =
    useContext(TodoContext);
  const [visibleList, setVisibleList] = useState<Todo[]>(todoList);
  const [taskName, setTaskName] = useState<string>("");
  useEffect(() => {
    // if (categoryList.find((e) => e.text === current) !== undefined)
    filterList(current);
    // else filterList(categoryList.length > 0 ? categoryList[0].text : "nothing");
  }, [current, todoList]);
  const onChangeTaskName = (event: ChangeEvent<HTMLInputElement>): void => {
    setTaskName(event.target.value);
  };
  const filterList = (current: string): void => {
    setVisibleList(
      todoList.filter((task) => {
        return task.category === current;
      })
    );
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName !== taskNameToDelete;
      })
    );
  };

  const validateTask = (task: Todo): boolean => {
    if (!task.taskName || task.taskName.trim().length === 0) {
      setOpen(true);
      return false;
    }
    return true;
  };

  const addTask = (): void => {
    const task: Todo = {
      taskName: taskName,
      category: current,
    };

    if (!validateTask(task)) {
      return;
    }

    // prepend task to todo list
    setTodoList([task].concat(todoList));

    setTaskName("");
  };

  return (
    <StyledTodoList className="todo-list">
      {categoryList.length > 0 && (
        <Paper>
          <h2>Add To {current}</h2>
          <div className="input-container">
            <Box p="10px">
              <label htmlFor="task">
                <TextField
                  id="outlined-basic"
                  className="task-name-input"
                  multiline
                  name="task"
                  onChange={onChangeTaskName}
                  type="text"
                  placeholder="Input Todo"
                  value={taskName}
                  variant="outlined"
                />
              </label>
            </Box>

            <Box p="10px">
              <Button variant="contained" color="primary" onClick={addTask}>
                Add
              </Button>
            </Box>
          </div>
        </Paper>
      )}
      {visibleList.map((task: Todo, key: number) => {
        return <TodoTask key={key} task={task} completeTask={completeTask} />;
      })}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Wrong operation
        </Alert>
      </Snackbar>
    </StyledTodoList>
  );
};
