import React from 'react';
import { makeStyles, Snackbar } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  toastStyles: {
    color: '#ffffff'
  },
  success: {
    color: '#000000',
    backgroundColor: theme.primary
  },
  neutral: {
    color: '#000000',
    backgroundColor: '#ffffff'
  },
  buttonStyle: {
    cursor: 'pointer',
    padding: theme.spacing(1)
  }
}));

export const Toast = (props) => {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    props.toggleToast(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={props.showToast || false}
      autoHideDuration={6500}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id',
        className: `classes.toastStyles, ${classes[props.variant || 'neutral']}`
      }}
      message={<span id="message-id">{props.toastMessage || 'Placeholder text'}</span>}
      action={(
        <div className={classes.buttonStyle} onClick={handleClose}>
          {props.buttonText || 'CLOSE'}
        </div>
      )}
    />
  );
};

Toast.propTypes = {
  toastMessage: PropTypes.string,
  buttonText: PropTypes.string,
  toggleToast: PropTypes.func.isRequired,
  showToast: PropTypes.bool
};

export default Toast;
