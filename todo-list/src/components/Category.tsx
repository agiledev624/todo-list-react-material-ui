import React, { FC, MouseEventHandler, useState } from 'react'
import { Category } from "../model/Task";
import styled from "styled-components";
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import { Box, IconButton } from "@material-ui/core";
import Icon from '@material-ui/core/Icon';
import Icons from "../constants/Icons";
import { MenuItem } from '@material-ui/core';
import {Grid} from '@material-ui/core';
const StyledCategoryItem = styled.div`
&.task {
    width: 250px;
    min-height: 25px;
    display: flex;
    color: black;
    margin: 15px;
    cursor: pointer;
    &:hover {
        cursor: pointer;
    }
    .content {
      flex: 80%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        filter: brightness(90%);
        
      }

      .task-row-column {
        margin-right: 4px;
        display: grid;
        padding: 16px;
        place-items: center;
        // width: 100%;
        height: 100%;
        font-size: 18px;
        background-color: #ddd;

        &.task-name {
          word-break: break-word;
          .toggle-text-button {
            color: #3f50b5;
            cursor: pointer;

            &:hover {
              text-decoration: underline;
            }
          }
        }

        &.task-days {
          text-wrap: none;
          max-width: 100px;
        }
      }
    }

    button {
      flex: 20%;
      height: 100%;
      border: none;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      color: white;
      cursor: pointer;

      &:hover {
        filter: brightness(120%);
      }

    }
}
`;

const MAX_TASK_NAME_DISPLAY_LENGTH = 200;

const getTaskNamePreview = (taskName: string): string => taskName.substr(0, MAX_TASK_NAME_DISPLAY_LENGTH); // take the first 200 characters of the task name.

interface Props {
    task: Category;
    completeTask: (taskNameToDelete: string) => void;
}

export const CategoryItem: FC<Props> = (props) => {
    const { task, completeTask } = props;

    const [showMore, setShowMore] = useState<boolean>(false);

    const isTextShortened = task.taskName.length > MAX_TASK_NAME_DISPLAY_LENGTH;
    const onChangeTaskName = (event: React.MouseEvent<HTMLDivElement>): void => {
        // setTaskName(event.target.value);
      };
    return (
        <div onClick={onChangeTaskName} className="task">
            <Grid container spacing={8}
            direction="row"
            justifyContent="center"
            alignItems="center"
            >
                <Grid item xs={2}>
        <Icon>{Icons[task.deadline]}</Icon>
        </Grid>
        <Grid item xs={4}>
        <div className="content">
                <div className="task-row-column task-name">
                    {isTextShortened
                        ? (showMore ? task.taskName : getTaskNamePreview(task.taskName))
                        : task.taskName
                    }
                    {isTextShortened && (
                        <Box className="toggle-text-button"
                            onClick={() => setShowMore(!showMore)}>
                            show {showMore ? 'less' : 'more'}
                        </Box>
                    )}
                </div>

            </div>
        </Grid>
        <Grid item xs={2}>
         
            <IconButton
                onClick={() => completeTask(task.taskName)}
                className="custom-color"
            >
                <CancelIcon />
            </IconButton>
        </Grid>
            </Grid>
            
            
        </div>
    );
};