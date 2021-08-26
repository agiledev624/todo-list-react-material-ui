import React, { FC } from "react";
import CancelIcon from "@material-ui/icons/CancelOutlined";
import { IconButton, Grid } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { Category } from "../model/Category";
import Icons from "../constants/Icons";

interface Props {
  task: Category;
  completeTask: (taskNameToDelete: string) => void;
}

export const CategoryItem: FC<Props> = (props) => {
  const { task, completeTask } = props;
  const onChangeTaskName = (event: React.MouseEvent<HTMLDivElement>): void => {
    // setTaskName(event.target.value);
  };
  return (
    <div onClick={onChangeTaskName} className="task">
      <Grid
        container
        spacing={8}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={2}>
          <Icon>{Icons[task.iconIndex]}</Icon>
        </Grid>
        <Grid item xs={4}>
          <div className="content">
            <div className="task-row-column task-name">{task.text}</div>
          </div>
        </Grid>
        <Grid item xs={2}>
          <IconButton
            onClick={() => completeTask(task.text)}
            className="custom-color"
          >
            <CancelIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};
