import React, { useEffect, useRef } from 'react';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
  TextField,
  Grid,
  Select,
  InputLabel,
  FormControl
} from '@material-ui/core';
import DeleteButton from './DeleteButton';

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value
  });

  return ref.current;
}

const WhereInput = props => {
  const prevFieldType = usePrevious(props.value.fieldType);

  const setDefaultFieldValue = () => {
    if (prevFieldType && prevFieldType !== props.value.fieldType) {
      let fieldValue;

      switch (props.value.fieldType) {
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

      props.onChange({ target: { name: 'fieldValue', value: fieldValue } });
    }
  };

  useEffect(setDefaultFieldValue, [props.value.fieldType]);

  const fieldValueInputRenderer = () => {
    switch (props.value.fieldType) {
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
                name="fieldValue"
                size='small'
                ampm={false}
                fullWidth
                KeyboardButtonProps={{ style: { marginBottom: 8 } }}
                value={props.value.fieldValue || new Date()}
                onChange={value => props.onChange({ target: { name: 'fieldValue', value } })}
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
                value={props.value.fieldValue}
                label="Field Value"
                name="fieldValue"
                size='small'
                onChange={props.onChange}
              >
                <option value={true}>true</option>
                <option value={false}>false</option>
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
              name="fieldValue"
              variant="outlined"
              type={props.value.fieldType}
              value={props.value.fieldValue}
              onChange={props.onChange}
              fullWidth
            />
          </Grid>
        )
    }
  }

  return (
    <Grid spacing={1} style={{ marginBottom: 12 }} alignItems='center' container>
      <Grid item xs={3}>
        <TextField
          label='Field Name'
          size='small'
          name="fieldName"
          variant="outlined"
          value={props.value.fieldName}
          onChange={props.onChange}
          fullWidth
        />
      </Grid>
      <Grid item xs>
        <FormControl variant="outlined" size='small' fullWidth>
          <InputLabel htmlFor="outlined-condition-native-simple">Condition</InputLabel>
          <Select
            native
            name="condition"
            value={props.value.condition}
            onChange={props.onChange}
            label="Condition"
            size='small'
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
            name="fieldType"
            value={props.value.fieldType}
            onChange={props.onChange}
            label="Field Type"
            size='small'
          >
            <option value="" />
            <option value='string'>string</option>
            <option value='number'>number</option>
            <option value='timestamp'>timestamp</option>
            <option value='boolean'>boolean</option>
            <option value='null'>null</option>
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

export default WhereInput;