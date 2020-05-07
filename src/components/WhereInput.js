import React from 'react';
import DeleteButton from './DeleteButton';
import {
  TextField,
  Grid,
  Select,
  InputLabel,
  FormControl
} from '@material-ui/core';

export default function WhereInput(props) {
  return (
    <Grid spacing={1} alignItems='center' style={{ marginBottom: 15 }} container >
      <Grid item xs>
        <TextField
          variant="outlined"
          label='Field Name'
          size='small'
          value={props.fieldName}
          onChange={props.onFieldNameChange}
        />
      </Grid>
      <Grid item xs={3}>
        <FormControl variant="outlined" size='small' fullWidth>
          <InputLabel htmlFor="outlined-condition-native-simple">Condition</InputLabel>
          <Select
            native
            value={props.condition}
            onChange={props.onConditionChange}
            label="Condition"
            size='small'
            inputProps={{
              name: 'condition',
              id: 'outlined-condition-native-simple',
            }}
          >
            <option aria-label="None" value="" />
            <option value={'<'}>{'<'}</option>
            <option value={'<='}>{'<='}</option>
            <option value={'=='}>{'=='}</option>
            <option value={'>'}>{'>'}</option>
            <option value={'>='}>{'>='}</option>
            <option value={'array-contains'}>{'array-contains'}</option>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs>
        <TextField
          variant="outlined"
          label='Field Value'
          size='small'
          value={props.fieldValue}
          onChange={props.onFieldValueChange}
        />
      </Grid>
      <Grid item xs={1}>
        <DeleteButton onClick={props.onDeleteClick} />
      </Grid>
    </Grid>
  )
}