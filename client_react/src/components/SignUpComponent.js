import { connect } from 'react-redux';

import { userActions } from '../actions';
import SignUp from './SignUp';


const mapDispatchToProps = dispatch => {
    return {
        onRegisterClick: e => {
            e.preventDefault();
            return (inputs) => {
                dispatch(userActions.register(inputs));
            };
        }
    }
};

export default connect(null, mapDispatchToProps)(SignUp)