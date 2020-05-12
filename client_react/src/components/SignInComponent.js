import { connect } from 'react-redux';
import { userActions, groupActions } from '../actions';
import { history } from '../_helpers';
import SignIn from './SignIn';

const mapDispatchToProps = dispatch => {
    return {
        onLoginClick: e => {
            e.preventDefault();
            return async (email, password) => {
                await dispatch(userActions.login(email, password));
                await dispatch(groupActions.getGroups());
                history.push('/home');

            }
        }
    }
};

export default connect(null, mapDispatchToProps)(SignIn)