import React from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { appActions } from '../actions';
import { withTranslation } from 'react-i18next';


export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(CustomizedSnackbars));

function mapDispatchToProps(dispatch) {
  return {
    closeSnackBar: () => {
      dispatch(appActions.closeSnackbar());
    }
  };

};

function mapStateToProps(state, ownProps) {
  return {
    open: state.alerts.showSnackbar,
    text: state.alerts.text,
    success: state.alerts.success
  }
};


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function CustomizedSnackbars({ t, open, success, text, closeSnackBar }) {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    };
    closeSnackBar();
  };

  return (
    <div className={classes.root}>
      { open && <Snackbar open={open} autoHideDuration={2000} onClose={closeSnackBar}>
        <Alert onClose={handleClose} severity={success ? 'success' : 'error'}>
          {t(getErrorCodeByErrorText(text))}
        </Alert>
      </Snackbar>
      }
    </div>
  );
}

//TODO remove this after sends error codes instead of strings
function getErrorCodeByErrorText(errorText) {

  const textToCodeMap = {
    'Not enough players to balance. Should be minimum 4': 'E_001',
    'Not enough players to balance. Should be minimum 6': 'E_002',
    'Not enough players to balance. Should be minimum 8': 'E_003',
  };

  return textToCodeMap[errorText] ? textToCodeMap[errorText] : errorText;
};
