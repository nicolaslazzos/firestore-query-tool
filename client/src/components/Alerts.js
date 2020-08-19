
import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar, Slide } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { connect } from 'react-redux';
import { removeAlert } from '../actions';

const Alerts = props => {
  const { alerts, removeAlert } = props;

  const onClose = (id, reason) => {
    if (reason === 'clickaway') return;
    removeAlert(id);
  }

  return (
    alerts.map(alert => (
      <Snackbar
        key={alert.id}
        open={true}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        TransitionComponent={Slide}
      >
        <Alert
          elevation={6}
          variant="filled"
          severity={alert.alertType}
          style={{ alignItems: 'center' }}
          onClose={(e, reason) => onClose(alert.id, reason)}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    ))
  )
}

Alerts.propTypes = {
  alerts: PropTypes.array.isRequired,
  removeAlert: PropTypes.func.isRequired
}

const mapStateToProps = ({ alerts }) => ({ alerts });

export default connect(mapStateToProps, { removeAlert })(Alerts);