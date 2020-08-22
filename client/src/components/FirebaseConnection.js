import React, { useState } from 'react';
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
import { onAppAdd, onAppRemove, onLogIn } from '../actions';

const FirebaseConnection = props => {
  const [firebaseConfiguration, setFirebaseConfiguration] = useState('');
  const [auth, setAuth] = useState({ email: '', password: '' });

  const onAuthChange = e => setAuth({ ...auth, [e.target.name]: e.target.value });

  const onConnectFirebasePress = () => {
    if (props.connected) {
      props.onAppRemove();
    } else {
      props.onAppAdd(firebaseConfiguration);
    }
  }

  const onLoginPress = () => {
    props.onLogIn(auth);
  }

  return (
    <React.Fragment>
      <Alert
        variant='filled'
        elevation={6}
        size='small'
        severity={props.connected ? 'success' : 'error'}
        style={{ marginBottom: 15, alignItems: 'center' }}
      >
        {props.connected ? 'Connected' : 'Disconnected'}
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
                placeholder='Paste your firebase configuration object here'
                name="firebaseConfiguration"
                variant="outlined"
                value={firebaseConfiguration}
                onChange={e => setFirebaseConfiguration(e.target.value)}
                disabled={props.connected}
                rows={9}
                multiline
                fullWidth
              />
            </Grid>
            <Grid xs={12} item>
              <Button variant="contained" color="primary" onClick={onConnectFirebasePress}>
                {props.connected ? 'DISCONNECT' : 'CONNECT TO FIREBASE'}
              </Button>
            </Grid>
            {
              props.connected ?
                <React.Fragment>
                  <Grid xs={12} item>
                    <TextField
                      label="E-Mail"
                      name="email"
                      variant="outlined"
                      size="small"
                      value={auth.email}
                      onChange={onAuthChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid xs={12} item>
                    <TextField
                      label="Password"
                      name="password"
                      variant="outlined"
                      size="small"
                      value={auth.password}
                      onChange={onAuthChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid xs={12} item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={onLoginPress}
                    >
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

const mapStateToProps = state => {
  const { user, connected, loadingApp, loadingAuth } = state.auth;
  return { user, connected, loadingApp, loadingAuth };
}

export default connect(mapStateToProps, { onAppAdd, onAppRemove, onLogIn })(FirebaseConnection);