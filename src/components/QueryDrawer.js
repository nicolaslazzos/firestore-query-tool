import React from 'react';
import {
  makeStyles,
  Drawer,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Button
} from '@material-ui/core';
import {
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon
} from '@material-ui/icons';
import CollectionInput from './CollectionInput';

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

export default function QueryDrawer() {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerContainer}>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>FROM</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <CollectionInput />
            {/*<Button variant="contained" color="primary">ADD PATH</Button>*/}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </Drawer>
  )
}