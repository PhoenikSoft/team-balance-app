import {connect} from 'react-redux';
import {userActions} from '../actions';
import ForgotPassword from './ForgotPassword';

const mapDispatchToProps = dispatch => {
    return {
        onSubmitClick: e => {
            e.preventDefault();
            return email => {
                dispatch(userActions.requestForgotPassword(email));
            }
        }
    }
};

const mapStateToProps = state => {
    return {
        error: state.authentication.error,
        successMessage: state.authentication.message,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
