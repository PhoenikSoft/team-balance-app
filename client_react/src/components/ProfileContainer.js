import { connect } from 'react-redux';

import { userActions } from '../actions';
import SignUp from './SignUp';


const mapDispatchToProps = dispatch => {
    return {
        onRegisterClick: e => {
            e.preventDefault();
            return (inputs) => {
                dispatch(userActions.update(inputs));
            };
        },
        fetchUser: async () => await dispatch(userActions.getCurrentUser()),

    }
};

const mapStateToProps = state => {
    return {
        isSignUp: false
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)