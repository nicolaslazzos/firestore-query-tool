import React from 'react';
import { makeStyles, IconButton } from '@material-ui/core';
import { Close as DeleteIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: theme.palette.error.dark
    }
  }
}));

export default function DeleteButton(props) {
  const classes = useStyles();

  return (
    <IconButton
      {...props}
      size='small'
      className={classes.button}
    >
      <DeleteIcon />
    </IconButton>
  )
}