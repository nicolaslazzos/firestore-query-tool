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

export default function QueryDrawer() {
  const [state, setState] = useState({ firebaseConfiguration: '', firebaseStatus: 'Disconnected' });

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
              <Button variant="contained" color="primary" onClick={onConnectFirebasePress}>
                {isConnected() ? 'DISCONNECT' : 'CONNECT TO FIREBASE'}
              </Button>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}