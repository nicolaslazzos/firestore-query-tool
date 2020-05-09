import React from 'react';
import PropTypes from 'prop-types';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox,
  Tooltip
} from '@material-ui/core';

function QueryResultHeader(props) {
  const { onSelectAllPress, order, orderBy, selectedCount, rowCount, onRequestSort } = props;

  const createSortHandler = property => event => onRequestSort(event, property);

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Tooltip title={selectedCount === rowCount ? 'Deselect All' : 'Select All'}>
            <Checkbox
              indeterminate={selectedCount > 0 && selectedCount < rowCount}
              checked={rowCount > 0 && selectedCount === rowCount}
              color='primary'
              onChange={onSelectAllPress}
            />
          </Tooltip>
        </TableCell>
        {props.headCells.map(headCell => (
          headCell.label !== 'id' ? (
            <TableCell
              key={headCell.id}
              // align={headCell.numeric ? 'right' : 'left'}
              style={{ paddingLeft: 0 }}
              // padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>) : null
        ))}
      </TableRow>
    </TableHead>
  );
}

QueryResultHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedCount: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllPress: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default QueryResultHeader;