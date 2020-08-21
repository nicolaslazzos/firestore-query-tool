import React, { useState } from 'react';
import firebase from 'firebase/app';
import { connect } from 'react-redux';
import { Alert } from '@material-ui/lab';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Grid,
  TextField
} from '@material-ui/core';
import { setAlert } from '../actions';

const FirebaseConnection = props => {
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
        props.setAlert('There is already a firebase app added', 'error');
      }
    }
  }

  return (
    <React.Fragment>
      <Alert
        variant='filled'
        elevation={6}
        size='small'
        severity={isConnected() ? 'success' : 'error'}
        style={{ marginBottom: 15, alignItems: 'center' }}
      >
        {connectionStatus}
      </Alert>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>FIREBASE CONFIGURATION</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ alignItems: 'flex-start', padding: 15 }}>
          <Grid spacing={2} style={{ display: 'flex', flexDirection: 'column' }} container>
            <Grid xs={12} item>
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
            {
              isConnected() ?
              <React.Fragment>
                <Grid xs={12} item>
                  <TextField label="E-Mail" variant="outlined" size="small" fullWidth />
                </Grid>
                <Grid xs={12} item>
                  <TextField label="Password" variant="outlined" size="small" fullWidth />
                </Grid>
                <Grid xs={12} item>
                  <Button variant="contained" color="primary" onClick={() => console.log('hola')}>
                    LOG IN
                </Button>
                </Grid>
              </React.Fragment> : null
            }
          </Grid>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  )
}

export default connect(null, { setAlert })(FirebaseConnection);