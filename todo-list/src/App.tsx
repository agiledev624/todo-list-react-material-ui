import React, {FC, useContext} from 'react';
import './App.scss';
import {Header} from "./components/Header";
import {TodoContextProvider} from "./components/TodoContext";
import {TodoList} from "./components/TodoList";
import styled, {ThemeProvider} from "styled-components";
import {createTheme} from "@material-ui/core";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Toolbar, List, ListItem, Divider, ListItemText } from '@material-ui/core';
import {TodoContext} from "./components/TodoContext";
import { CategoryList } from './components/CategoryList';

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
      display: 'flex',
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
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);
export const App: FC = () => {
    const theme = createTheme({
        palette: {
            primary: {
                light: '#268bb7',
                main: '#3f50b5',
                dark: '#002884',
                contrastText: '#fff',
            },
            secondary: {
                light: '#000',
                main: '#f44336',
                dark: '#ba000d',
                contrastText: '#fff',
            },
        },
    });
    // const {todoList, setTodoList} = useContext(TodoContext);
    const classes = useStyles();
    console.log('home re-rendering');
    return (
        <ThemeProvider theme={theme}>
            <TodoContextProvider>
                <StyledApp className="app">
                    <Header classNames={classes.appBar}/>
        <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
            Drawer
          <CategoryList/>
        </div>
      </Drawer>
                    <TodoList/>
                </StyledApp>
            </TodoContextProvider>
        </ThemeProvider>
    );
}