import React, {FC, useState, ChangeEvent, useContext} from 'react';
import {Category} from '../model/Task'
import {TodoContext} from "./TodoContext";
import styled from "styled-components";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import {Box, TextField, MenuItem, Select, Icon, InputLabel} from "@material-ui/core";
import Icons from "../constants/Icons";


const StyledHeader = styled.div`
  &.header {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: #1976d2;
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
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
          height: 58px;
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

    button {
      width: 70px;
      height: 59px;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }

    .MuiSvgIcon-root {
      display: flex;
      justify-items: center;
      padding-left: 16px;
    }

  }
  .header-title {
      position: absolute;
      margin: auto;
      left: 40px;
      top: 20px;
      color: white;
  }
`;



export const Header: FC<{classNames: string}> = ({classNames}) => {
    const {todoList, setTodoList, setOpen} = useContext(TodoContext);
    const [taskName, setTaskName] = useState<string>("");
    const [deadline, setDeadline] = useState<number | string>(""); // allow number | string because setting state for number input to undefined, does not clear the input.

    const onChangeTaskName = (event: ChangeEvent<HTMLInputElement>): void => {
        setTaskName(event.target.value);
    };

    const onChangeDeadline = (event: React.ChangeEvent<{ value: unknown }>): void => {
        const deadLine = Number(event.target.value);
        if (deadLine >= 0) {
            setDeadline(deadLine);
        } else {
            setDeadline("");
        }
    };
    const validateTask = (task: Category): boolean => {
        if (!task.taskName || task.taskName.trim().length === 0) {
            // alert("Must provide task name.");
            setOpen(true);
            return false;
        }
    
        // deadline not required, but validate if present.
        if (task.deadline != null && task.deadline < 0) {
            // alert("Deadline must be greater than zero.");
            setOpen(true);
            return false;
        }
    
        return true;
    }
    const addTask = (): void => {
        const task: Category = {
            taskName: taskName,
            deadline: Number(deadline)
        }

        if (!validateTask(task)) {
            return;
        }

        // prepend task to todo list
        setTodoList([task].concat(todoList));

        setTaskName("");
        setDeadline("");
    };

    

    return (
        <StyledHeader className={`header ${classNames}`}>
            <Box>
                <h1 className="header-title">TodoList</h1>
            </Box>
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
                            placeholder="Input Category"
                            value={taskName}
                            variant="outlined"
                        />
                    </label>
                </Box>

                <Box p="10px">
                    <label htmlFor="deadline">
                        {/* <TextField
                            id="outlined-basic"
                            className="deadline-input"
                            name="deadline"
                            onChange={onChangeDeadline}
                            placeholder="days"
                            type="number"
                            value={deadline}
                            variant="outlined"
                        /> */}
                        <InputLabel id="demo-simple-select-label" color="secondary">Icon</InputLabel>
                        <Select
                            color="secondary"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={deadline}
                            onChange={onChangeDeadline}
                        >
                            {Icons.map((name: string, index: number) => {
                                return <MenuItem value={index}><Icon>{name}</Icon></MenuItem>;
                            })}
                            {/* <MenuItem value={10}><Icon>{Icons[task.deadline]}</Icon></MenuItem> */}
                            
                            {/* <MenuItem value={30}>Thirty</MenuItem> */}
                        </Select>
                    </label>
                </Box>

                <Box p="10px">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addTask}
                        startIcon={<AddIcon style={{fontSize: '60px'}}/>}>
                    </Button>
                </Box>
            </div>
            
        </StyledHeader>
    );
}

