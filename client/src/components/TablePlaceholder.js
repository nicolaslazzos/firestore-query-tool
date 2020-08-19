import React from 'react';
import {
  makeStyles,
  Paper,
  Typography,
  CircularProgress,
  Grid
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: "100vh",
    padding: 20,
    paddingTop: theme.mixins.toolbar.minHeight + 30,
    backgroundColor: theme.palette.background.default
  },
  paper: {
    width: '100%',
    height: '100%',
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

const TablePlaceholder = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        {
          props.loading ? <CircularProgress /> : (
            <Grid container>
              <Grid item xs={12} className={classes.gridItem}>
                <img src={require('../img/empty.png')} width="80px" />
              </Grid>
              <Grid item xs={12} className={classes.gridItem}>
                <Typography component="div">NO DATA WAS FOUND</Typography>
              </Grid>
            </Grid>
          )}
      </Paper>
    </div >
  );
}

export default TablePlaceholder;