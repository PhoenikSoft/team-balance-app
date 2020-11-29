import {connect} from 'react-redux';
import {userActions} from '../actions';
import ResetPassword from './ResetPassword';

const mapDispatchToProps = dispatch => {
    return {
        onSubmitClick: e => {
            e.preventDefault();
            return (password, token) => {
                dispatch(userActions.resetPassword(password, token));
            }
        }
    }
};

const mapStateToProps = state => {
    return {
        error: state.authentication.error,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
