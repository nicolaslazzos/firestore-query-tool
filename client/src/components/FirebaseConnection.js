import React, { useState } from 'react';
import firebase from 'firebase';
import { Alert } from '@material-ui/lab';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Button,
  Grid,
  TextField
} from '@material-ui/core';

const FirebaseConnection = () => {
  const [firebaseConfiguration, setFirebaseConfiguration] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');

  const isConnected = () => connectionStatus === 'Connected';

  const onConnectFirebasePress = () => {
    if (isConnected()) {
      firebase.app().delete().then(() => setConnectionStatus('Disconnected'));
    } else {
      if (!firebase.apps.length) {
        if (firebaseConfiguration) {
          firebase.initializeApp(firebaseConfiguration);
          setConnectionStatus('Connected');
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
        {connectionStatus}
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
                name="firebaseConfiguration"
                variant="outlined"
                value={firebaseConfiguration}
                onChange={e => setFirebaseConfiguration(e.target.value)}
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

export default FirebaseConnection;