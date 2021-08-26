import React, { FC, useState } from "react";
import { Todo } from "../model/Task";
import styled from "styled-components";
import DeleteOutlineOutlined from "@material-ui/icons/DeleteOutlineOutlined";
import { Box, IconButton } from "@material-ui/core";

const StyledTodoTask = styled.div`
  &.task {
    width: 500px;
    min-height: 35px;
    display: flex;
    color: black;
    margin: 5px;

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
        padding: 8px;
        place-items: center;
        width: 100%;
        height: 100%;
        font-size: 18px;
        background-color: #bad1e6;
        border-radius: 5px;

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
      height: 100%;
      border: none;

      color: white;
      cursor: pointer;

      &:hover {
        filter: brightness(120%);
      }
    }
  }
  .custom-color {
    color: grey !important;
  }
`;

const MAX_TASK_NAME_DISPLAY_LENGTH = 200;

const getTaskNamePreview = (taskName: string): string =>
  taskName.substr(0, MAX_TASK_NAME_DISPLAY_LENGTH); // take the first 200 characters of the task name.

interface Props {
  task: Todo;
  completeTask: (taskNameToDelete: string) => void;
}

export const TodoTask: FC<Props> = (props) => {
  const { task, completeTask } = props;

  const [showMore, setShowMore] = useState<boolean>(false);

  const isTextShortened = task.taskName.length > MAX_TASK_NAME_DISPLAY_LENGTH;

  return (
    <StyledTodoTask className="task">
      <div className="content">
        <div className="task-row-column task-name">
          {isTextShortened
            ? showMore
              ? task.taskName
              : getTaskNamePreview(task.taskName)
            : task.taskName}
          {isTextShortened && (
            <Box
              className="toggle-text-button"
              onClick={() => setShowMore(!showMore)}
            >
              show {showMore ? "less" : "more"}
            </Box>
          )}
        </div>
      </div>

      <IconButton
        onClick={() => completeTask(task.taskName)}
        className="custom-color"
      >
        <DeleteOutlineOutlined />
      </IconButton>
    </StyledTodoTask>
  );
};
