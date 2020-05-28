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

const mapStateToProps = state => {
    return {
        isSignUp: true,
        error: state.authentication.error
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)