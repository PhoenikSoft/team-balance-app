import React from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { appActions } from '../actions';

export default connect(mapStateToProps, mapDispatchToProps)(CustomizedSnackbars);

function mapDispatchToProps(dispatch) {
  return {
    closeSnackBar: () => {
      dispatch(appActions.closeSnackbar());
    }
  };

};

function mapStateToProps(state, ownProps) {
  return {
    open: state.actions.showSnackbar,
    text: state.actions.text,
    success: state.actions.success
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

function CustomizedSnackbars({ open, success, text, closeSnackBar }) {
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
          {text}
        </Alert>
      </Snackbar>
      }
    </div>
  );
}
