import { connect } from 'react-redux';
import { userActions } from '../actions';
import SignIn from './SignIn';

const mapDispatchToProps = dispatch => {
    return {
        onLoginClick: e => {
            e.preventDefault();
            return (email, password) => {
                dispatch(userActions.login(email, password));
            }
        }
    }
};

const mapStateToProps = state => {
    return {
        error: state.authentication.error
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)