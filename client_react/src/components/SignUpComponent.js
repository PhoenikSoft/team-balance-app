import { connect } from 'react-redux';

import { userActions } from '../actions';
import SignUp from './SignUp';


const mapDispatchToProps = dispatch => {
    return {
        onRegisterClick: e => {
            e.preventDefault();
            return (email, password) => {
                dispatch(userActions.login(email, password));
            };
        }
    }
};

export default connect(null, mapDispatchToProps)(SignUp)