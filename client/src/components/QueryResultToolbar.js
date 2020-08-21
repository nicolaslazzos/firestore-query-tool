import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Delete as DeleteIcon, FilterList as FilterListIcon } from '@material-ui/icons';
import {
  makeStyles,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  FormControlLabel,
  Switch,
  Grid
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight: {
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    flex: '1 1 100%',
  },
}));

const QueryResultToolbar  = props => {
  const classes = useStyles();
  
  const { selectedCount } = props;

  return (
    <Toolbar className={clsx(classes.root, { [classes.highlight]: selectedCount > 0 })}>
      {selectedCount > 0 ? (
        <Typography className={classes.title} component="div">
          {selectedCount} SELECTED
        </Typography>
      ) : (
          <Typography className={classes.title} component="div">
            {props.title}
          </Typography>
        )}

      {selectedCount > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={props.onDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
          <Grid style={{ justifyContent: 'flex-end' }} container>
            <FormControlLabel
              control={<Switch checked={props.dense} onChange={props.onDenseToggle} color='primary' />}
              style={{ margin: 0, marginRight: 20 }}
              label="Dense Padding"
            />
            <Tooltip title="Filter List">
              <IconButton>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        )}
    </Toolbar>
  );
};

QueryResultToolbar.propTypes = {
  selectedCount: PropTypes.number.isRequired,
};

export default QueryResultToolbar;