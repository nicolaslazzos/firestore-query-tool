import React from 'react';
import DeleteButton from './DeleteButton';
import {
  TextField,
  Grid,
  Select,
  InputLabel,
  FormControl
} from '@material-ui/core';

const ExtraInput = props => {
  return (
    <Grid spacing={1} alignItems='center' style={{ marginBottom: 15 }} container >
      <Grid item xs>
        <FormControl variant="outlined" size='small' fullWidth>
          <InputLabel htmlFor="outlined-type-native-simple">Type</InputLabel>
          <Select
            native
            label="Type"
            name="extraType"
            size='small'
            value={props.value.extraType}
            onChange={props.onChange}
          >
            <option aria-label="None" value="" />
            <option value='orderByAsc'>orderBy (asc)</option>
            <option value='orderByDesc'>orderBy (desc)</option>
            <option value='limit'>limit</option>
            <option value='startAt'>startAt</option>
            <option value='startAfter'>startAfter</option>
            <option value='endBefore'>endBefore</option>
            <option value='endAt'>endAt</option>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs>
        <TextField
          variant="outlined"
          label='Value'
          name="extraValue"
          size='small'
          fullWidth
          value={props.value.extraValue}
          onChange={props.onChange}
        />
      </Grid>
      <Grid item>
        <DeleteButton onClick={props.onDeleteClick} />
      </Grid>
    </Grid>
  )
}

export default ExtraInput;