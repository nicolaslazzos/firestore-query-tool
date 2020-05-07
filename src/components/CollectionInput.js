import React from 'react';
import DeleteButton from './DeleteButton';
import {
  TextField,
  Grid
} from '@material-ui/core';

export default function CollectionInput(props) {
  return (
    <Grid spacing={1} alignItems='center' style={{ marginBottom: 15 }} container>
      <Grid item xs>
        <TextField
          variant="outlined"
          label='Collection Name'
          size='small'
          fullWidth
          value={props.collectionName}
          onChange={props.onCollectionNameChange}
        />
      </Grid>
      <Grid item xs>
        <TextField
          variant="outlined"
          label='Document ID'
          size='small'
          fullWidth
          value={props.documentId}
          onChange={props.onDocumentIdChange}
        />
      </Grid>
      <Grid xs={1} item>
        <DeleteButton onClick={props.onDeleteClick} />
      </Grid>
    </Grid>
  )
}