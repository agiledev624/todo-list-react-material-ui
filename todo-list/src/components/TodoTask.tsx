import React, { FC } from "react";
import { Todo } from "../model/Task";
import styled from "styled-components";
import DeleteOutlineOutlined from "@material-ui/icons/DeleteOutlineOutlined";
import { IconButton } from "@material-ui/core";

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

interface Props {
  task: Todo;
  completeTask: (taskNameToDelete: string) => void;
}

export const TodoTask: FC<Props> = (props) => {
  const { task, completeTask } = props;
  return (
    <StyledTodoTask className="task">
      <div className="content">
        <div className="task-row-column task-name">{task.taskName}</div>
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
