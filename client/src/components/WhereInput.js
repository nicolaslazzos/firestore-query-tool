import React, { useEffect, useRef } from 'react';
import DeleteButton from './DeleteButton';
import {
  TextField,
  Grid,
  Select,
  InputLabel,
  FormControl
} from '@material-ui/core';
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value
  });
  return ref.current;
}

export default function WhereInput(props) {
  const prevFieldType = usePrevious(props.fieldType);

  const setDefaultFieldValue = () => {
    if (prevFieldType && prevFieldType !== props.fieldType) {
      let fieldValue;

      switch (props.fieldType) {
        case 'timestamp':
          fieldValue = new Date();
          break;
        case 'null':
          fieldValue = null;
          break;
        case 'boolean':
          fieldValue = true;
          break;
        default:
          fieldValue = '';
      }

      props.onFieldValueChange(fieldValue);
    }
  };

  useEffect(setDefaultFieldValue, [props.fieldType]);

  const fieldValueInputRenderer = () => {
    switch (props.fieldType) {
      case 'null':
      case '':
        return null;
      case 'timestamp':
        return (
          <Grid item xs={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                variant="inline"
                format="MM/dd/yyyy HH:mm"
                id="date-picker"
                label="Date"
                size='small'
                ampm={false}
                fullWidth
                KeyboardButtonProps={{ style: { marginBottom: 8 } }}
                value={props.fieldValue || new Date()}
                onChange={event => props.onFieldValueChange(event.target.value)}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        )
      case 'boolean':
        return (
          <Grid item xs={3}>
            <FormControl variant="outlined" size='small' fullWidth>
              <InputLabel htmlFor="outlined-field-value-native-simple">Field Value</InputLabel>
              <Select
                native
                value={!!props.fieldValue}
                onChange={event => props.onFieldValueChange(event.target.value)}
                label="Field Value"
                size='small'
                inputProps={{
                  name: 'field-value',
                  id: 'outlined-field-value-native-simple',
                }}
              >
                <option value={true}>{'true'}</option>
                <option value={false}>{'false'}</option>
              </Select>
            </FormControl>
          </Grid>
        )
      default:
        return (
          <Grid item xs={3}>
            <TextField
              label='Field Value'
              size='small'
              variant="outlined"
              type={props.fieldType}
              fullWidth
              value={props.fieldValue || ''}
              onChange={event => props.onFieldValueChange(event.target.value)}
            />
          </Grid>
        )
    }
  }

  return (
    <Grid spacing={1} alignItems='center' style={{ marginBottom: 15 }} container >
      <Grid item xs={3}>
        <TextField
          label='Field Name'
          size='small'
          variant="outlined"
          value={props.fieldName}
          onChange={props.onFieldNameChange}
          fullWidth
        />
      </Grid>
      <Grid item xs>
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
            <option value="" />
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
        <FormControl variant="outlined" size='small' fullWidth>
          <InputLabel htmlFor="outlined-field-type-native-simple">Field Type</InputLabel>
          <Select
            native
            value={props.fieldType}
            onChange={props.onFieldTypeChange}
            label="Field Type"
            size='small'
            inputProps={{
              name: 'field-type',
              id: 'outlined-field-type-native-simple',
            }}
          >
            <option value="" />
            <option value={'string'}>{'string'}</option>
            <option value={'number'}>{'number'}</option>
            <option value={'timestamp'}>{'timestamp'}</option>
            <option value={'boolean'}>{'boolean'}</option>
            <option value={'null'}>{'null'}</option>
          </Select>
        </FormControl>
      </Grid>
      {fieldValueInputRenderer()}
      <Grid item>
        <DeleteButton onClick={props.onDeleteClick} />
      </Grid>
    </Grid>
  )
}