import React from 'react';
import DeleteButton from './DeleteButton';
import { TextField, Grid } from '@material-ui/core';

const PathInput = props => {
  return (
    <Grid spacing={1} style={{ marginBottom: 12 }} alignItems='center' container>
      <Grid item xs>
        <TextField
          variant="outlined"
          label='Collection Name'
          name='collectionName'
          size='small'
          fullWidth
          value={props.value.collectionName}
          onChange={props.onChange}
        />
      </Grid>
      <Grid item xs>
        <TextField
          variant="outlined"
          label='Document ID'
          name='documentId'
          size='small'
          fullWidth
          value={props.value.documentId}
          onChange={props.onChange}
        />
      </Grid>
      <Grid item>
        <DeleteButton onClick={props.onDeleteClick} />
      </Grid>
    </Grid>
  )
}

export default PathInput;