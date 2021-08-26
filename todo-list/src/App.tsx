import React, { FC } from "react";
import { createTheme, Toolbar } from "@material-ui/core";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import styled, { ThemeProvider } from "styled-components";
import Drawer from "@material-ui/core/Drawer";
import { Header } from "./components/Header";
import { TodoContextProvider } from "./components/TodoContext";
import { TodoList } from "./components/TodoList";
import { CategoryList } from "./components/CategoryList";
import "./App.scss";

const StyledApp = styled.div`
  &.app {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      paddingTop: "20px",
      overflow: "auto",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

export const App: FC = () => {
  const theme = createTheme({
    palette: {
      primary: {
        light: "#268bb7",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        light: "#000",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#fff",
      },
    },
  });
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <TodoContextProvider>
        <StyledApp className="app">
          <Header classNames={classes.appBar} />
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Toolbar />
            <div className={classes.drawerContainer}>
              <CategoryList />
            </div>
          </Drawer>
          <TodoList />
        </StyledApp>
      </TodoContextProvider>
    </ThemeProvider>
  );
};
