import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';


export default connect(mapStateToProps, null)(CircularIndeterminate);


    function mapStateToProps(state) {
        return {
            show: state.alerts.loading
        }
    };

function CircularIndeterminate({ show }) {
    const classes = makeStyles((theme) => ({
        root: {
            marginLeft: theme.spacing(2),
            display: show ? 'flex' : 'none',
            justifyContent: 'center'
        }
    }))();

    return (
        <div className={classes.root} >
            <CircularProgress />
        </div>
    );
}