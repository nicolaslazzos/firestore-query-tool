import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  makeStyles,
  Table,
  TableBody,
  TableContainer,
  Paper,
  TablePagination,
  Typography,
  Grid
} from '@material-ui/core';
import QueryResultHeader from './QueryResultHeader';
import QueryResultToolbar from './QueryResultToolbar';
import TablePlaceholder from './TablePlaceholder';
import QueryRow from './QueryRow';
import { onDataDelete } from '../actions';

// function createData(_id, name, calories, fat, carbs, protein) {
//   return { _id, name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData(1, 'Cupcake', 305, 3.7, 67, 4.3),
//   createData(2, 'Donut', 452, 25.0, 51, 4.9),
//   createData(3, 'Eclair', 262, 16.0, 24, 6.0),
//   createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
//   createData(6, 'Honeycomb', 408, 3.2, 87, 6.5),
//   createData(7, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData(8, 'Jelly Bean', 375, 0.0, 94, 0.0),
//   createData(9, 'KitKat', 518, 26.0, 65, 7.0),
//   createData(10, 'Lollipop', 392, 0.2, 98, 0.0),
//   createData(11, 'Marshmallow', 318, 0, 81, 2.0),
//   createData(12, 'Nougat', 360, 19.0, 9, 37.0),
//   createData(13, 'Oreo', 437, 18.0, 63, 4.0),
// ];

const descendingComparator = (a, b, orderBy) => {
  if (orderBy) {
    if (b[orderBy].value < a[orderBy].value) return -1;
    if (b[orderBy].value > a[orderBy].value) return 1;
  }

  return 0;
}

const getComparator = (order, orderBy) => {
  return (a, b) => (order === 'desc' ? 1 : -1) * descendingComparator(a, b, orderBy);
}

const sortData = (array, comparator) => {
  const indexedData = array.map((object, index) => [object, index]);

  indexedData.sort((a, b) => {
    const order = comparator(a[0].fields, b[0].fields);
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
  }
}));

const QueryResult = props => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(null);
  const [selected, setSelected] = useState([]);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const classes = useStyles();

  useEffect(() => { setSelected([]) }, [props.data]);

  const getPropNames = data => {
    let props = [];

    if (data.length) {
      const fields = data[0].fields;
      for (let prop in fields) {
        props.push({ id: prop, type: fields[prop].type, numeric: false, disablePadding: true });
      }
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
      const newSelected = props.data.map(row => row.id);
      return setSelected(newSelected);
    }

    setSelected([]);
  };

  const onItemPress = path => {
    const selectedIndex = selected.indexOf(path);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, path);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const isSelected = path => selected.indexOf(path) !== -1;

  const onDeleteClick = () => {
    props.onDataDelete(selected);
  }

  const onChangePage = (event, page) => setPage(page);

  const onChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  if (!props.data.length || props.loading) return <TablePlaceholder loading={props.loading} />;

  const renderRows = () => {
    return sortData(props.data, getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map(row => {
        const isItemSelected = isSelected(row.path);
        return <QueryRow key={row.id} row={row} selected={isItemSelected} onItemPress={onItemPress} />
      });
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <QueryResultToolbar
          title='RESULTS'
          dense={dense}
          selectedCount={selected.length}
          onDenseToggle={() => setDense(!dense)}
          onDeleteClick={onDeleteClick}
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
              {renderRows()}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid
          container
          direction="row"
          alignItems="center"
        >
          <Typography className={classes.title} component="div">{props.data.length} ITEMS</Typography>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 20]}
            component="div"
            style={{ marginLeft: 'auto' }}
            count={props.data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
          />
        </Grid>
      </Paper>
    </div >
  );
}

const mapStateToProps = state => {
  const { data, loading, error } = state.queryResult;
  return { data, loading, error };
}

export default connect(mapStateToProps, { onDataDelete })(QueryResult);