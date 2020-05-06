import React from 'react';
import {
  makeStyles,
  TextField,
  IconButton
} from '@material-ui/core';
import {
  Close as DeleteIcon
} from '@material-ui/icons';

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    position: 'relative',
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
}));

export default function CollectionInput() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <TextField variant="outlined" label='Collection Name' size='small' />
      <TextField variant="outlined" label='Document ID' size='small' style={{ marginLeft: 10, marginRight: 10 }} />
      <IconButton aria-label="delete" size='small'>
        <DeleteIcon />
      </IconButton>
    </React.Fragment>
  )
}