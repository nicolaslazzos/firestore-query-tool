import React, { useState } from 'react';
import firebase from 'firebase';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Button,
  Grid,
  TextField
} from '@material-ui/core';
import {
  Alert
} from '@material-ui/lab'
import {
  ExpandMore as ExpandMoreIcon
} from '@material-ui/icons';

function createData(id, name, calories, fat, carbs, protein) {
  return { id, name, calories, fat, carbs, protein };
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

export default function QueryDrawer() {
  const [state, setState] = useState({ firebaseConfiguration: '', firebaseStatus: 'Disconnected' });

  const populate = () => {
    const db = firebase.firestore();

    rows.forEach(row => {
      const { name, calories, fat, carbs, protein } = row;
      console.log(row)
      db.collection('test').add({ name, calories, fat, carbs, protein, created: new Date() });
    });
  }

  const isConnected = () => state.firebaseStatus === 'Connected';

  const onConnectFirebasePress = () => {
    if (isConnected()) {
      firebase.app().delete().then(() => setState({ ...state, firebaseStatus: 'Disconnected' }));
    } else {
      if (!firebase.apps.length) {
        if (state.firebaseConfiguration) {
          firebase.initializeApp(state.firebaseConfiguration);
          setState({ ...state, firebaseStatus: 'Connected' });
        }
      } else {
        alert('Firebase app already exists!');
      }
    }
  }

  return (
    <div>
      <Alert
        variant='filled'
        elevation={6}
        size='small'
        severity={isConnected() ? 'success' : 'error'}
        style={{ marginBottom: 15, alignItems: 'center' }}
      >
        {state.firebaseStatus}
      </Alert>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>FIREBASE CONFIGURATION</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ alignItems: 'flex-start', padding: 15 }}>
          <Grid spacing={1} alignItems='center' container>
            <Grid xs={12} style={{ paddingBottom: 10 }} item>
              <TextField
                label="Firebase Configuration"
                placeholder='Paste your firebase configuration JSON here'
                variant="outlined"
                value={state.firebaseConfiguration}
                onChange={event => setState({ ...state, firebaseConfiguration: event.target.value })}
                disabled={isConnected()}
                rows={9}
                multiline
                fullWidth
              />
            </Grid>
            <Grid xs={12} item>
              <Button variant="contained" color="primary" onClick={populate}>
                {isConnected() ? 'DISCONNECT' : 'CONNECT TO FIREBASE'}
              </Button>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}