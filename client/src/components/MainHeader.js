import React from 'react';
import { Menu as MenuIcon } from '@material-ui/icons';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: theme.palette.background.paper
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: theme.palette.text.primary
  },
}));

const MainHeader = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} onClick={props.onMenuClick}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            FIRESTORE QUERY EXECUTER
          </Typography>
          <Button>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MainHeader;