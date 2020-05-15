import { connect } from 'react-redux';
import { userActions } from '../actions';
import SignIn from './SignIn';

const mapDispatchToProps = dispatch => {
    return {
        onLoginClick: e => {
            e.preventDefault();
            return async (email, password) => {
                await dispatch(userActions.login(email, password));
                userActions.goHome();

            }
        }
    }
};

export default connect(null, mapDispatchToProps)(SignIn)