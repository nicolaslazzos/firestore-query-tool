import React from 'react';
import {
  makeStyles,
  TableCell,
  TableRow,
  Checkbox,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tableRow: {
    "&$selected, &$selected:hover": {
      backgroundColor: theme.palette.primary.dark,
    }
  },
  selected: {}
}));

const QueryRow = props => {
  const classes = useStyles();

  const { row, selected, onItemPress } = props;

  const renderTableCells = () => {
    const tableCells = [];

    tableCells.push(<TableCell key='id'>{row['id']}</TableCell>);

    for (const prop in row.fields) {
      tableCells.push(<TableCell key={prop}>{row.fields[prop].value}</TableCell>);
    }

    return tableCells;
  }

  return (
    <TableRow
      hover
      onClick={() => onItemPress(row.path)}
      role="checkbox"
      tabIndex={-1}
      selected={selected}
      classes={{ selected: classes.selected }}
      className={classes.tableRow}
    >
      <TableCell padding="checkbox"><Checkbox color='primary' checked={selected} /></TableCell>
      {renderTableCells(row)}
    </TableRow>
  );
}

export default QueryRow;