import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Checkbox,
  Typography
} from '@material-ui/core';
import QueryResultHeader from './QueryResultHeader';
import QueryResultToolbar from './QueryResultToolbar';

function createData(_id, name, calories, fat, carbs, protein) {
  return { _id, name, calories, fat, carbs, protein };
}

const rows = [
  createData(1, 'Cupcake', 305, 3.7, 67, 4.3),
  createData(2, 'Donut', 452, 25.0, 51, 4.9),
  createData(3, 'Eclair', 262, 16.0, 24, 6.0),
  createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
  createData(6, 'Honeycomb', 408, 3.2, 87, 6.5),
  createData(7, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData(8, 'Jelly Bean', 375, 0.0, 94, 0.0),
  createData(9, 'KitKat', 518, 26.0, 65, 7.0),
  createData(10, 'Lollipop', 392, 0.2, 98, 0.0),
  createData(11, 'Marshmallow', 318, 0, 81, 2.0),
  createData(12, 'Nougat', 360, 19.0, 9, 37.0),
  createData(13, 'Oreo', 437, 18.0, 63, 4.0),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return (a, b) => (order === 'desc' ? 1 : -1) * descendingComparator(a, b, orderBy);
}

function sortData(array, comparator) {
  const indexedData = array.map((object, index) => [object, index]);

  indexedData.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return indexedData.map(item => item[0]);
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '100vh',
    padding: 20,
    paddingTop: theme.mixins.toolbar.minHeight + 30,
    backgroundColor: theme.palette.background.default
  },
  paper: {
    width: '100%'
  },
  table: {
    width: '100%'
  },
  title: {
    padding: 20,
    paddingLeft: 15,
    paddingRight: 15
  },
  tableRow: {
    "&$selected, &$selected:hover": {
      backgroundColor: theme.palette.primary.dark,
    }
  },
  selected: {}
}));

function QueryResult(props) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('_id');
  const [selected, setSelected] = useState([]);
  const [dense, setDense] = useState(false);

  const classes = useStyles();

  function getPropNames(data) {
    let props = [];

    if (data.length) {
      props = Object.keys(data[0]).map(prop => ({ id: prop, numeric: false, disablePadding: true, label: prop }));
    };

    return props;
  }

  const onSortPress = (event, prop) => {
    const isAsc = orderBy === prop && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(prop);
  };

  const onSelectAllPress = event => {
    if (event.target.checked) {
      const newSelected = props.data.map(row => row._id);
      return setSelected(newSelected);
    }

    setSelected([]);
  };

  const onItemPress = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const isSelected = _id => selected.indexOf(_id) !== -1;

  const tableCellRenderer = row => {
    const tableCells = [];
    const props = Object.keys(row);

    for (const prop of props) {
      tableCells.push(<TableCell key={prop}>{row[prop]}</TableCell>);
    }

    return tableCells;
  }

  return (
    <div className={classes.root}>
      < Paper className={classes.paper} elevation={3}>
        <QueryResultToolbar
          title='RESULTS'
          dense={dense}
          selectedCount={selected.length}
          onDenseToggle={() => setDense(!dense)}
        />
        <TableContainer>
          <Table
            className={classes.table}
            size={dense ? 'small' : 'medium'}
          >
            <QueryResultHeader
              classes={classes}
              selectedCount={selected.length}
              order={order}
              orderBy={orderBy}
              headCells={getPropNames(props.data)}
              onSelectAllPress={onSelectAllPress}
              onRequestSort={onSortPress}
              rowCount={props.data.length}
            />
            <TableBody>
              {sortData(props.data, getComparator(order, orderBy)).map(row => {
                const isItemSelected = isSelected(row._id);

                return (
                  <TableRow
                    hover
                    onClick={event => onItemPress(event, row._id)}
                    role="checkbox"
                    tabIndex={-1}
                    key={row._id.toString()}
                    selected={isItemSelected}
                    classes={{ selected: classes.selected }}
                    className={classes.tableRow}
                  >
                    <TableCell padding="checkbox"><Checkbox color='primary' checked={isItemSelected} /></TableCell>
                    {tableCellRenderer(row)}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography className={classes.title} component="div">
          {`${props.data.length} ITEMS`}
        </Typography>
      </Paper>
    </div >
  );
}

const mapStateToProps = state => {
  const { data, loading, error } = state.queryResult;
  return { data, loading, error };
}

export default connect(mapStateToProps, null)(QueryResult);