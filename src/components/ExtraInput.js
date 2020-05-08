import React from 'react';
import DeleteButton from './DeleteButton';
import {
  TextField,
  Grid,
  Select,
  InputLabel,
  FormControl
} from '@material-ui/core';

export default function ExtraInput(props) {
  return (
    <Grid spacing={1} alignItems='center' style={{ marginBottom: 15 }} container >
      <Grid item xs>
        <FormControl variant="outlined" size='small' fullWidth>
          <InputLabel htmlFor="outlined-type-native-simple">Type</InputLabel>
          <Select
            native
            value={props.extraType}
            onChange={props.onExtraTypeChange}
            label="Type"
            size='small'
            inputProps={{
              name: 'type',
              id: 'outlined-type-native-simple',
            }}
          >
            <option aria-label="None" value="" />
            <option value={'orderByAsc'}>{'orderBy (asc)'}</option>
            <option value={'orderByDesc'}>{'orderBy (desc)'}</option>
            <option value={'limit'}>{'limit'}</option>
            <option value={'startAt'}>{'startAt'}</option>
            <option value={'startAfter'}>{'startAfter'}</option>
            <option value={'endBefore'}>{'endBefore'}</option>
            <option value={'endAt'}>{'endAt'}</option>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs>
        <TextField
          variant="outlined"
          label='Value'
          size='small'
          fullWidth
          value={props.extraValue}
          onChange={props.onExtraValueChange}
        />
      </Grid>
      <Grid item>
        <DeleteButton onClick={props.onDeleteClick} />
      </Grid>
    </Grid>
  )
}